import Joi from "joi";

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required and cannot be empty",
    "any.required": "Name field is required",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required and cannot be empty",
    "string.email": "Please provide a valid email address",
    "any.required": "Email field is required",
  }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)
    .required()
    .messages({
      "string.empty": "Phone number is required and cannot be empty",
      "string.pattern.base": "Phone must be in format (XXX) XXX-XXXX",
      "any.required": "Phone field is required",
    }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().messages({
    "string.empty": "Name cannot be empty",
  }),
  email: Joi.string().email().messages({
    "string.empty": "Email cannot be empty",
    "string.email": "Email must be a valid email",
  }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)
    .messages({
      "string.empty": "Phone cannot be empty",
      "string.pattern.base": "Phone must be in format (XXX) XXX-XXXX",
    }),
})
  .min(1)
  .messages({
    "object.min": "At least one field is required",
  });
