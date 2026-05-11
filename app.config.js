require('dotenv').config();

module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL || 'https://fast-api-g456.onrender.com',
    },
  };
};
