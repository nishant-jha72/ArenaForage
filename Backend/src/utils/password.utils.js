const bcrypt = require('bcryptjs');
const env = require('../config/env');

async function hashPassword(plainPassword) {
  const saltRounds = 12;
  return bcrypt.hash(plainPassword, saltRounds);
}

async function comparePassword(plainPassword, passwordHash) {
  return bcrypt.compare(plainPassword, passwordHash);
}

async function hashToken(token) {
  return bcrypt.hash(token, 10);
}

async function compareToken(plainToken, tokenHash) {
  return bcrypt.compare(plainToken, tokenHash);
}

module.exports = {
  hashPassword,
  comparePassword,
  hashToken,
  compareToken,
};
