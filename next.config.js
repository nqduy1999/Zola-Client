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
