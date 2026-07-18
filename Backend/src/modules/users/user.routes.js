const express = require('express');
const userController = require('./user.controller');
const authenticate = require('../../middlewares/auth.middleware');
const validate = require('../../middlewares/validate.middleware');
const {
  updateProfileSchema,
  changePasswordSchema,
  checkUsernameSchema,
} = require('./user.validation');

const router = express.Router();

router.get(
  '/check-username',
  validate(checkUsernameSchema, 'query'),
  userController.checkUsername
);

router.get('/me', authenticate, userController.getCurrentUser);

router.put(
  '/me',
  authenticate,
  validate(updateProfileSchema),
  userController.updateProfile
);

router.put(
  '/me/change-password',
  authenticate,
  validate(changePasswordSchema),
  userController.changePassword
);

module.exports = router;
