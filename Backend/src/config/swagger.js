const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Arena Forage API',
      version: '1.0.0',
      description: 'Free Fire Tournament Platform - User Management & Authentication API',
      contact: {
        name: 'Arena Forage Team',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Operation successful' },
            data: { type: 'object' },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Validation failed' },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: { type: 'string' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        RegisterRequest: {
          type: 'object',
          required: ['username', 'email', 'password'],
          properties: {
            username: { type: 'string', example: 'nishant' },
            email: { type: 'string', format: 'email', example: 'nishant@gmail.com' },
            phone: { type: 'string', example: '9876543210' },
            password: { type: 'string', format: 'password', example: 'Password@123' },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'nishant@gmail.com' },
            password: { type: 'string', format: 'password', example: 'Password@123' },
          },
        },
        RefreshTokenRequest: {
          type: 'object',
          required: ['refreshToken'],
          properties: {
            refreshToken: { type: 'string' },
          },
        },
        ForgotPasswordRequest: {
          type: 'object',
          required: ['email'],
          properties: {
            email: { type: 'string', format: 'email' },
          },
        },
        ResetPasswordRequest: {
          type: 'object',
          required: ['token', 'password'],
          properties: {
            token: { type: 'string' },
            password: { type: 'string', format: 'password' },
          },
        },
        UpdateProfileRequest: {
          type: 'object',
          properties: {
            full_name: { type: 'string', example: 'Nishant Jha' },
            phone: { type: 'string', example: '+919876543210' },
            profile_picture_url: { type: 'string', format: 'uri' },
          },
        },
        ChangePasswordRequest: {
          type: 'object',
          required: ['old_password', 'new_password'],
          properties: {
            old_password: { type: 'string', format: 'password' },
            new_password: { type: 'string', format: 'password' },
          },
        },
      },
    },
    tags: [
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Users', description: 'User profile endpoints' },
      { name: 'Admin', description: 'Admin user management endpoints' },
    ],
  },
  apis: ['./src/modules/**/*.routes.js', './src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);
