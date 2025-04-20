import Joi from "joi";

export const PHONE_PATTERN =
  /^(?:\+?[0-9]{0,3}[-. ]?)?(?:\(?[0-9]{0,3}\)?[-. ]?)?(?:[0-9][-. ]?){9}[0-9]$/;

export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const phoneSchema = Joi.string()
  .pattern(PHONE_PATTERN)
  .required()
  .messages({
    "string.empty": "Phone number cannot be empty",
    "string.pattern.base":
      "Please enter a valid phone number. Examples: (044) 123-4567, +380 44 123 4567, 0501234567",
    "any.required": "Phone number is required",
  });

export const emailSchema = Joi.string()
  .pattern(EMAIL_PATTERN)
  .lowercase()
  .required()
  .messages({
    "string.empty": "Email address cannot be empty",
    "string.pattern.base":
      "Please enter a valid email address (example: user@example.com)",
    "any.required": "Email address is required",
  });
