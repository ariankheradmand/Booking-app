/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins.push({
        apply: (compiler) => {
          compiler.hooks.beforeRun.tap('DefineSelf', () => {
            global.self = global;
          });
        },
      });
    }
    return config;
  },
};

module.exports = nextConfig;
