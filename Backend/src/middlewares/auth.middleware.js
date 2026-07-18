const ApiError = require('../utils/ApiError');
const { verifyAccessToken } = require('../utils/jwt.utils');
const userRepository = require('../modules/users/user.repository');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw ApiError.unauthorized('Access token is required');
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);

    const user = await userRepository.findById(decoded.id);

    if (!user) {
      throw ApiError.unauthorized('User not found');
    }

    if (user.deleted_at) {
      throw ApiError.unauthorized('Account has been deleted');
    }

    if (user.status === 'BANNED') {
      throw ApiError.forbidden('Your account has been banned');
    }

    if (user.status === 'SUSPENDED') {
      throw ApiError.forbidden('Your account has been suspended');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(ApiError.unauthorized('Invalid or expired access token'));
    }
    return next(error);
  }
};

module.exports = authenticate;
