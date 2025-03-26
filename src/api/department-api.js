import Joi from "joi";
import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const departmentApi = {
  create: {
    auth: false,
    handler: async function (request, h) {
      const hospital = await db.hospitalStore.findById(request.params.id);
      if (!hospital) {
        return Boom.notFound("Hospital not found");
      }
      const department = await db.departmentStore.addDepartment(hospital._id, request.payload);
      return h.response(department).code(201);
    },
    description: "Create a department in a hospital",
    notes: "Creates a new department inside a specified hospital",
    tags: ["api"],
    validate: {
      params: Joi.object({
        id: Joi.string().required()
      }),
      payload: Joi.object({
        title: Joi.string().required(),
        deptLocation: Joi.string().required()
      })
    }
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      const department = await db.departmentStore.getDepartmentById(request.params.id);
      if (!department) {
        return Boom.notFound("Department not found");
      }
      return department;
    },
    description: "Get a department by ID",
    notes: "Returns a department by its unique ID",
    tags: ["api"],
    validate: {
      params: Joi.object({
        id: Joi.string().required()
      })
    }
  },

  getDepartmentsByHospitalId: {
    auth: false,
    handler: async function (request, h) {
      const hospital = await db.hospitalStore.findById(request.params.id);
      if (!hospital) {
        return Boom.notFound("Hospital not found");
      }
      const departments = await db.departmentStore.getDepartmentsByHospitalId(request.params.id);
      return departments;
    },
    description: "Get all departments for a hospital",
    notes: "Returns all departments associated with the given hospital ID",
    tags: ["api"],
    validate: {
      params: Joi.object({
        id: Joi.string().required()
      })
    }
  },

  update: {
    auth: false,
    handler:
