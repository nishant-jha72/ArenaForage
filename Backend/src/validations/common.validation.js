const Joi = require('joi');

const passwordSchema = Joi.string()
  .min(8)
  .max(128)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>/?])/)
  .messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.pattern.base':
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  });

const usernameSchema = Joi.string()
  .min(3)
  .max(50)
  .pattern(/^[a-zA-Z0-9_]+$/)
  .messages({
    'string.min': 'Username must be at least 3 characters long',
    'string.max': 'Username must not exceed 50 characters',
    'string.pattern.base': 'Username can only contain alphanumeric characters and underscores',
  });

const emailSchema = Joi.string().email().max(255).messages({
  'string.email': 'Please provide a valid email address',
});

const phoneSchema = Joi.string()
  .pattern(/^\+?[1-9]\d{6,14}$/)
  .messages({
    'string.pattern.base': 'Please provide a valid international phone number',
  });

module.exports = {
  passwordSchema,
  usernameSchema,
  emailSchema,
  phoneSchema,
};
