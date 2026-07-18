const env = require('../config/env');

class EmailService {
  async sendPasswordResetEmail({ to, resetToken, userName }) {
    const resetUrl = `${env.cors.origin}/reset-password?token=${resetToken}`;

    const emailPayload = {
      to,
      subject: 'Password Reset Request - Arena Forage',
      template: 'password-reset',
      data: {
        userName: userName || 'User',
        resetUrl,
        expiresInMinutes: Math.floor(env.passwordReset.tokenExpiresIn / 60000),
      },
    };

    // Placeholder for future SMTP integration (nodemailer, SendGrid, etc.)
    if (env.nodeEnv === 'development') {
      console.log('[EmailService] Password reset email prepared:', {
        to: emailPayload.to,
        resetUrl,
      });
    }

    return emailPayload;
  }
}

module.exports = new EmailService();
