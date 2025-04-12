import Joi from "joi";

const PHONE_PATTERN = /^\(\d{3}\)\s\d{3}-\d{4}$/;
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;

export const phoneSchema = Joi.string()
  .pattern(PHONE_PATTERN)
  .required()
  .messages({
    "string.empty": "Phone number cannot be empty",
    "string.pattern.base": "Phone number must be in format (xxx) xxx-xxxx",
    "any.required": "Phone number is required",
  });

export const emailSchema = Joi.string()
  .pattern(EMAIL_PATTERN)
  .lowercase()
  .required()
  .messages({
    "string.empty": "Email address cannot be empty",
    "string.pattern.base": "Please provide a valid email address",
    "any.required": "Email address is required",
  });
