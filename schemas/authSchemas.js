import Joi from "joi";

import { emailRegexp } from "../constants/auth.js";

export const authRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const authLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const authVerifySchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "missing required field email",
    "string.empty": "missing required field email",
    "string.pattern.base": "email must be valid",
  }),
});
