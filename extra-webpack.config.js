const webpack = require("webpack");
const purgecss = require("@fullhuman/postcss-purgecss")({
  // Specify the paths to all of the template files in your project
  content: [
    "./projects/health-wise-app/src/**/*.html",
    "./projects/health-wise-app/src/**/*.component.ts",
  ],
  // Include any special characters you're using in this regular expression
  defaultExtractor: (content) => content.match(/[\w-/.:]+(?<!:)/g) || [],
});

module.exports = (config, options) => {
  console.log(`Using '${config.mode}' mode`);
  config.plugins.push(
    new webpack.DefinePlugin({
      "process.env.HEALTHWISE_AUTHCONFIG_CLIENTROOT": JSON.stringify(
        process.env.HEALTHWISE_AUTHCONFIG_CLIENTROOT
      ),
      "process.env.HEALTHWISE_AUTHCONFIG_APIROOT": JSON.stringify(
        process.env.HEALTHWISE_AUTHCONFIG_APIROOT
      ),
      "process.env.HEALTHWISE_AUTHCONFIG_STSAUTHORITY": JSON.stringify(
        process.env.HEALTHWISE_AUTHCONFIG_STSAUTHORITY
      ),
      "process.env.HEALTHWISE_AUTHCONFIG_CLIENTID": JSON.stringify(
        process.env.HEALTHWISE_AUTHCONFIG_CLIENTID
      ),
      "process.env.HEALTHWISE_AUTHCONFIG_APIID": JSON.stringify(
        process.env.HEALTHWISE_AUTHCONFIG_APIID
      ),
      "process.env.HEALTHWISE_TESTUSER": JSON.stringify(
        process.env.HEALTHWISE_TESTUSER
      ),
    })
  );
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      {
        loader: "postcss-loader",
        options: {
          ident: "postcss",
          syntax: "postcss-scss",
          plugins: [
            require("postcss-import"),
            require("tailwindcss")("./tailwind.config.js"),
            require("autoprefixer"),
            ...(config.mode === "production" ? [purgecss] : []),
          ],
        },
      },
    ],
  });
  return config;
};
