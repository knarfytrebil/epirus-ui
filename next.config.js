var withTypescript = require('@zeit/next-typescript');
module.exports = withTypescript({
  env: {
    API_URL: process.env.API_URL,
    API_AUTHORITY: process.env.API_AUTHORITY,
    ENABLE_PAID_FEATURES: process.env.ENABLE_PAID_FEATURES,
  },
  webpack: function(cfg) {
    const originalEntry = cfg.entry;
    cfg.entry = async () => {
      const entries = await originalEntry();

      if (entries['main.js'] && !entries['main.js'].includes('./client/polyfills.ts')) {
        entries['main.js'].unshift('./client/polyfills.ts');
      }

      return entries;
    };

    return cfg;
  },
});
