/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.alias['@components'] = path.join(__dirname, 'src/app/components');
    config.resolve.alias['@ui'] = path.join(__dirname, 'src/app/components/ui-components');
    config.resolve.alias['@services'] = path.join(__dirname, 'src/services');
    config.resolve.alias['@app'] = path.join(__dirname, 'src/app');
    config.resolve.alias['@hooks'] = path.join(__dirname, 'src/hooks');

    return config;
  },
}

module.exports = nextConfig
