const ApiError = require('../utils/ApiError');
const env = require('../config/env');

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';
  let errors = err.errors || [];

  if (err.code === 'ER_DUP_ENTRY') {
    statusCode = 409;
    message = 'Duplicate entry. Resource already exists';

    if (err.message.includes('uk_users_email')) {
      message = 'Email is already registered';
    } else if (err.message.includes('uk_users_username')) {
      message = 'Username is already taken';
    } else if (err.message.includes('uk_users_phone')) {
      message = 'Phone number is already registered';
    }
  }

  if (env.nodeEnv === 'development' && statusCode === 500 && !err.isOperational) {
    console.error('Unhandled error:', err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors.length > 0 && { errors }),
  });
};

module.exports = errorHandler;
