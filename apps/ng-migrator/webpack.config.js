module.exports = {
  resolve: {
    fallback: {
      fs: false,
      child_process: false,
      net: false,
      crypto: false,
    },
    alias: {
      process: 'process/browser',
      os: 'os-browserify/browser',
      constants: 'constants-browserify',
    },
  },
}
