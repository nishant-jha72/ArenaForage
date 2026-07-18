const pool = require('../../config/db');

const USER_COLUMNS = `
  id, username, email, phone, password_hash, full_name, profile_picture_url,
  role, status, is_email_verified, is_phone_verified, last_login,
  deleted_at, created_at, updated_at
`;

class UserRepository {
  async create(userData) {
    const { username, email, phone, passwordHash, fullName } = userData;

    const [result] = await pool.query(
      `INSERT INTO users (username, email, phone, password_hash, full_name)
       VALUES (?, ?, ?, ?, ?)`,
      [username, email, phone || null, passwordHash, fullName || null]
    );

    return this.findById(result.insertId);
  }

  async findById(id, includeDeleted = false) {
    const deletedClause = includeDeleted ? '' : 'AND deleted_at IS NULL';

    const [rows] = await pool.query(
      `SELECT ${USER_COLUMNS} FROM users WHERE id = ? ${deletedClause}`,
      [id]
    );

    return rows[0] || null;
  }

  async findByEmail(email) {
    const [rows] = await pool.query(
      `SELECT ${USER_COLUMNS} FROM users WHERE email = ? AND deleted_at IS NULL`,
      [email]
    );

    return rows[0] || null;
  }

  async findByUsername(username) {
    const [rows] = await pool.query(
      `SELECT ${USER_COLUMNS} FROM users WHERE username = ? AND deleted_at IS NULL`,
      [username]
    );

    return rows[0] || null;
  }

  async findByPhone(phone) {
    const [rows] = await pool.query(
      `SELECT ${USER_COLUMNS} FROM users WHERE phone = ? AND deleted_at IS NULL`,
      [phone]
    );

    return rows[0] || null;
  }

  async updateProfile(id, data) {
    const fields = [];
    const values = [];

    if (data.fullName !== undefined) {
      fields.push('full_name = ?');
      values.push(data.fullName);
    }

    if (data.phone !== undefined) {
      fields.push('phone = ?');
      values.push(data.phone);
    }

    if (data.profilePictureUrl !== undefined) {
      fields.push('profile_picture_url = ?');
      values.push(data.profilePictureUrl);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    await pool.query(
      `UPDATE users SET ${fields.join(', ')} WHERE id = ? AND deleted_at IS NULL`,
      values
    );

    return this.findById(id);
  }

  async updatePassword(id, passwordHash) {
    await pool.query(
      'UPDATE users SET password_hash = ? WHERE id = ? AND deleted_at IS NULL',
      [passwordHash, id]
    );
  }

  async updateLastLogin(id) {
    await pool.query(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
      [id]
    );
  }

  async updateStatus(id, status) {
    await pool.query(
      'UPDATE users SET status = ? WHERE id = ? AND deleted_at IS NULL',
      [status, id]
    );

    return this.findById(id);
  }

  async softDelete(id) {
    await pool.query(
      'UPDATE users SET deleted_at = CURRENT_TIMESTAMP, status = ? WHERE id = ? AND deleted_at IS NULL',
      ['BANNED', id]
    );
  }

  async findAll({ page, limit, search, sortBy, sortOrder, role, status }) {
    const offset = (page - 1) * limit;
    const conditions = ['deleted_at IS NULL'];
    const params = [];

    if (search) {
      conditions.push('(username LIKE ? OR email LIKE ? OR full_name LIKE ?)');
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (role) {
      conditions.push('role = ?');
      params.push(role);
    }

    if (status) {
      conditions.push('status = ?');
      params.push(status);
    }

    const whereClause = conditions.join(' AND ');
    const allowedSortFields = ['id', 'username', 'email', 'role', 'status', 'created_at', 'last_login'];
    const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'created_at';
    const safeSortOrder = sortOrder === 'ASC' ? 'ASC' : 'DESC';

    const [countResult] = await pool.query(
      `SELECT COUNT(*) as total FROM users WHERE ${whereClause}`,
      params
    );

    const [rows] = await pool.query(
      `SELECT id, username, email, phone, full_name, profile_picture_url,
              role, status, is_email_verified, is_phone_verified, last_login,
              created_at, updated_at
       FROM users
       WHERE ${whereClause}
       ORDER BY ${safeSortBy} ${safeSortOrder}
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    return {
      users: rows,
      total: countResult[0].total,
      page,
      limit,
      totalPages: Math.ceil(countResult[0].total / limit),
    };
  }
}

module.exports = new UserRepository();
