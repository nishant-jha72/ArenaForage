const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const userService = require('./user.service');

const getAllUsers = asyncHandler(async (req, res) => {
  const result = await userService.getAllUsers(req.query);
  return ApiResponse.success(res, 'Users fetched successfully', result);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(parseInt(req.params.id, 10));
  return ApiResponse.success(res, 'User fetched successfully', user);
});

const banUser = asyncHandler(async (req, res) => {
  const user = await userService.banUser(parseInt(req.params.id, 10), req.user.id);
  return ApiResponse.success(res, 'User banned successfully', user);
});

const suspendUser = asyncHandler(async (req, res) => {
  const user = await userService.suspendUser(parseInt(req.params.id, 10), req.user.id);
  return ApiResponse.success(res, 'User suspended successfully', user);
});

const activateUser = asyncHandler(async (req, res) => {
  const user = await userService.activateUser(parseInt(req.params.id, 10));
  return ApiResponse.success(res, 'User activated successfully', user);
});

const deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(parseInt(req.params.id, 10), req.user.id);
  return ApiResponse.success(res, 'User deleted successfully');
});

module.exports = {
  getAllUsers,
  getUserById,
  banUser,
  suspendUser,
  activateUser,
  deleteUser,
};
