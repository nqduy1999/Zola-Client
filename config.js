const config = {
  IS_DEV:
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'staging',
  PORT: parseInt(process.env.PORT, 10) || 3000
};

module.exports = config;
