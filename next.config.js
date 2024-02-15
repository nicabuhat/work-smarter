/** @type {import('next').NextConfig} */

module.exports = {
  publicRuntimeConfig: {
    // Path to the public folder
    publicFolder: "/public",
  },
  webpack: (config, { isServer }) => {
    // Exclude specific modules from the client bundle
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },
};
