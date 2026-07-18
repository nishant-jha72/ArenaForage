const Joi = require('joi');
const { passwordSchema, phoneSchema } = require('../../validations/common.validation');

const updateProfileSchema = Joi.object({
  full_name: Joi.string().max(100).allow(null, '').optional(),
  phone: phoneSchema.optional().allow(null, ''),
  profile_picture_url: Joi.string().uri().max(500).allow(null, '').optional(),
});

const changePasswordSchema = Joi.object({
  old_password: passwordSchema.required().messages({
    'any.required': 'Current password is required',
  }),
  new_password: passwordSchema.required().messages({
    'any.required': 'New password is required',
  }),
});

const checkUsernameSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z0-9_]+$/)
    .required()
    .messages({
      'any.required': 'Username is required',
    }),
});

const adminListUsersSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().max(100).allow('').optional(),
  sortBy: Joi.string()
    .valid('id', 'username', 'email', 'role', 'status', 'created_at', 'last_login')
    .default('created_at'),
  sortOrder: Joi.string().valid('ASC', 'DESC').default('DESC'),
  role: Joi.string().valid('SUPER_ADMIN', 'ADMIN', 'USER').optional(),
  status: Joi.string().valid('ACTIVE', 'SUSPENDED', 'BANNED').optional(),
});

const userIdParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

module.exports = {
  updateProfileSchema,
  changePasswordSchema,
  checkUsernameSchema,
  adminListUsersSchema,
  userIdParamSchema,
};
