const path = require("path");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      if (typeof window !== "undefined") {
        require("chartist-plugin-tooltips-updated");
      }
      return webpackConfig;
    },
  },
};
