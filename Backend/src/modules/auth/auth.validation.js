const Joi = require('joi');
const {
  usernameSchema,
  emailSchema,
  passwordSchema,
  phoneSchema,
} = require('../../validations/common.validation');

const registerSchema = Joi.object({
  username: usernameSchema.required().messages({
    'any.required': 'Username is required',
  }),
  email: emailSchema.required().messages({
    'any.required': 'Email is required',
  }),
  phone: phoneSchema.optional().allow(null, ''),
  password: passwordSchema.required().messages({
    'any.required': 'Password is required',
  }),
});

const loginSchema = Joi.object({
  email: emailSchema.required().messages({
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
  }),
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    'any.required': 'Refresh token is required',
  }),
});

const forgotPasswordSchema = Joi.object({
  email: emailSchema.required().messages({
    'any.required': 'Email is required',
  }),
});

const resetPasswordSchema = Joi.object({
  token: Joi.string().required().messages({
    'any.required': 'Reset token is required',
  }),
  password: passwordSchema.required().messages({
    'any.required': 'New password is required',
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
