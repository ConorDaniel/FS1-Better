import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5)
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().min(5),
};

export const StaffSpec = {
  role: Joi.string().required(),
  name: Joi.string().required(),
  vignette: Joi.string().required(),
};

export const DepartmentSpec = {
  title: Joi.string().required(),
  deptLocation: Joi.string().min(1).required()
};

export const HospitalSpec = {
  name: Joi.string().min(1).required(),
  type: Joi.string().min(1).required(),
  location: Joi.string().required(),
  latitude: Joi.number().required().min(-90).max(90),
  longitude: Joi.number().required().min(-180).max(180)
};

