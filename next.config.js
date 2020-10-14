const withImages = require('next-images');
const withFonts = require('next-fonts');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const webpackConfigs = cf => {
  const config = { ...cf };
  config.node = {
    dns: 'mock',
    path: true,
    url: false
  };

  return config;
};
const options = {
  webpack: webpackConfigs
};
module.exports = withBundleAnalyzer(withImages(withFonts({ ...options })));
module.exports = {
  async headers() {
    return [
      {
        // mathching all API routes
        source: '/api/v0/*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
          }
        ]
      }
    ];
  }
};
