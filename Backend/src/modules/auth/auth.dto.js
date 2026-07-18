module.exports = {
  toAuthResponse: ({ user, accessToken, refreshToken }) => ({
    user,
    tokens: {
      accessToken,
      refreshToken,
    },
  }),

  toTokenRefreshResponse: (accessToken) => ({
    accessToken,
  }),
};
