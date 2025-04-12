import Joi from "joi";
import { phoneSchema, emailSchema } from "../constants/contacts.js";

export const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: emailSchema,
  phone: phoneSchema,
  favorite: Joi.boolean(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: emailSchema.optional(),
  phone: phoneSchema.optional(),
  favorite: Joi.boolean(),
});

export const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "Missing field favorite",
    "boolean.base": "Field favorite must be a boolean",
  }),
});
