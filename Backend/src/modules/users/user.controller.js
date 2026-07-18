const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const userService = require('./user.service');

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await userService.getCurrentUser(req.user.id);
  return ApiResponse.success(res, 'Profile fetched successfully', user);
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await userService.updateProfile(req.user.id, req.body);
  return ApiResponse.success(res, 'Profile updated successfully', user);
});

const changePassword = asyncHandler(async (req, res) => {
  await userService.changePassword(
    req.user.id,
    req.body.old_password,
    req.body.new_password
  );
  return ApiResponse.success(res, 'Password changed successfully');
});

const checkUsername = asyncHandler(async (req, res) => {
  const result = await userService.checkUsernameAvailability(req.query.username);
  return ApiResponse.success(res, 'Username availability checked', result);
});

module.exports = {
  getCurrentUser,
  updateProfile,
  changePassword,
  checkUsername,
};
