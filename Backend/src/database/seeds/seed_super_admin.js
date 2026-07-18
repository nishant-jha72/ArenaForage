const pool = require('../../config/db');
const env = require('../config/env');
const { hashPassword } = require('../utils/password.utils');

async function seedSuperAdmin() {
  const connection = await pool.getConnection();

  try {
    const [existing] = await connection.query(
      'SELECT id FROM users WHERE email = ? OR username = ? LIMIT 1',
      [env.superAdmin.email, env.superAdmin.username]
    );

    if (existing.length > 0) {
      console.log('Super admin already exists. Skipping seed.');
      return;
    }

    const passwordHash = await hashPassword(env.superAdmin.password);

    await connection.query(
      `INSERT INTO users (username, email, password_hash, full_name, role, status, is_email_verified)
       VALUES (?, ?, ?, ?, 'SUPER_ADMIN', 'ACTIVE', TRUE)`,
      [
        env.superAdmin.username,
        env.superAdmin.email,
        passwordHash,
        env.superAdmin.fullName,
      ]
    );

    console.log('Super admin seeded successfully.');
    console.log(`Email: ${env.superAdmin.email}`);
  } finally {
    connection.release();
  }
}

require('dotenv').config();

seedSuperAdmin()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seed failed:', error.message);
    process.exit(1);
  });
