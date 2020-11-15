const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlReplaceWebpackPlugin = require("html-replace-webpack-plugin");
const WebpackNotifier = require("webpack-notifier");
const CopyPlugin = require('copy-webpack-plugin');

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
      "process.env.HEALTHWISE_IMAGE_CDN": JSON.stringify(
        process.env.HEALTHWISE_IMAGE_CDN
      )
    }),
    new HtmlWebpackPlugin({
      filename: "assets/silent-callback.html",
      template: "src/templates/silent-callback-template.html",
      chunks: [""],
    }),
    new HtmlReplaceWebpackPlugin([
      {
        pattern: "__STS_AUTHORITY__",
        replacement: process.env.HEALTHWISE_AUTHCONFIG_STSAUTHORITY,
      },
      {
        pattern: "__CLIENT_ID__",
        replacement: process.env.HEALTHWISE_AUTHCONFIG_CLIENTID,
      },
      {
        pattern: "__SCOPE__",
        replacement: process.env.HEALTHWISE_AUTHCONFIG_APIID,
      },
    ]),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'node_modules/oidc-client/dist', 'oidc-client.min.js'),
          to: 'assets/js/oidc-client.min.js'
        }
      ]
    }),
    new WebpackNotifier({title: 'Webpacking HealthWise', excludeWarnings: true, alwaysNotify: false, skipFirstNotification: true}),
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
