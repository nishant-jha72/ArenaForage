const express = require('express');
const adminController = require('./admin.controller');
const authenticate = require('../../middlewares/auth.middleware');
const authorize = require('../../middlewares/authorize.middleware');
const validate = require('../../middlewares/validate.middleware');
const { adminListUsersSchema, userIdParamSchema } = require('./user.validation');

const router = express.Router();

router.use(authenticate, authorize('ADMIN', 'SUPER_ADMIN'));

router.get(
  '/',
  validate(adminListUsersSchema, 'query'),
  adminController.getAllUsers
);

router.get(
  '/:id',
  validate(userIdParamSchema, 'params'),
  adminController.getUserById
);

router.patch(
  '/:id/ban',
  validate(userIdParamSchema, 'params'),
  adminController.banUser
);

router.patch(
  '/:id/suspend',
  validate(userIdParamSchema, 'params'),
  adminController.suspendUser
);

router.patch(
  '/:id/activate',
  validate(userIdParamSchema, 'params'),
  adminController.activateUser
);

router.delete(
  '/:id',
  validate(userIdParamSchema, 'params'),
  adminController.deleteUser
);

module.exports = router;
