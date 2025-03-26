// server-instance.js
import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Inert from "@hapi/inert";
import HapiSwagger from "hapi-swagger";
import Cookie from "@hapi/cookie";
import Joi from "joi";
import Handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";
import { apiRoutes } from "./api/api-routes.js";
import { webRoutes } from "./web-routes.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const Package = require("../package.json");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createServer() {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
  });

  await server.register([
    Inert,
    Vision,
    Cookie,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: "OurHospital API Documentation",
          version: Package.version,
        },
      },
    },
  ]);

  server.validator(Joi);

  server.views({
    engines: { hbs: Handlebars },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.COOKIE_NAME,
      password: process.env.COOKIE_PASSWORD,
      isSecure: false,
    },
    redirectTo: "/",
    validate: accountsController.validate,
  });

  server.auth.default("session");

  server.route(apiRoutes);
  server.route(webRoutes);

  server.route({
    method: 'GET',
    path: '/images/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, '../Public/images'),
        listing: false,
        index: false
      }
    },
    options: {
      auth: false
    }
  });

  return server;
}
