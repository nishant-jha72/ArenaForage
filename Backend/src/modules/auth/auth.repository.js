const pool = require('../../config/db');

class AuthRepository {
  async saveRefreshToken(userId, tokenHash, expiresAt) {
    await pool.query(
      'INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)',
      [userId, tokenHash, expiresAt]
    );
  }

  async findActiveRefreshTokensForUser(userId) {
    const [rows] = await pool.query(
      `SELECT * FROM refresh_tokens
       WHERE user_id = ? AND is_revoked = FALSE AND expires_at > NOW()`,
      [userId]
    );

    return rows;
  }

  async revokeRefreshToken(id) {
    await pool.query('UPDATE refresh_tokens SET is_revoked = TRUE WHERE id = ?', [id]);
  }

  async revokeAllUserRefreshTokens(userId) {
    await pool.query(
      'UPDATE refresh_tokens SET is_revoked = TRUE WHERE user_id = ? AND is_revoked = FALSE',
      [userId]
    );
  }

  async savePasswordResetToken(userId, tokenHash, expiresAt) {
    await pool.query(
      'UPDATE password_reset_tokens SET is_used = TRUE WHERE user_id = ? AND is_used = FALSE',
      [userId]
    );

    await pool.query(
      'INSERT INTO password_reset_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)',
      [userId, tokenHash, expiresAt]
    );
  }

  async findValidPasswordResetTokens() {
    const [rows] = await pool.query(
      `SELECT prt.*, u.email, u.username
       FROM password_reset_tokens prt
       JOIN users u ON u.id = prt.user_id
       WHERE prt.is_used = FALSE AND prt.expires_at > NOW() AND u.deleted_at IS NULL`
    );

    return rows;
  }

  async markPasswordResetTokenUsed(id) {
    await pool.query('UPDATE password_reset_tokens SET is_used = TRUE WHERE id = ?', [id]);
  }
}

module.exports = new AuthRepository();
