/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['tailwindui.com', 'images.unsplash.com'],
  },
  distDir: '.dist',
  output: {
    hashFunction: 'xxhash64',
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      child_process: false,
      net: false,
      crypto: false,
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      process: 'process/browser',
    }

    return config
  },
}
