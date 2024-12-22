import { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins?.push({
        apply: (compiler: any) => {
          compiler.hooks.beforeRun.tap('DefineSelf', () => {
            (global as any).self = global;
          });
        },
      });
    }
    return config;
  },
};

export default nextConfig;
