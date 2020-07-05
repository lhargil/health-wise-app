const webpack = require('webpack');
const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: ['./src/**/*.html', './src/**/*.component.ts'],
  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || []
});

module.exports = (config, options) => {
  console.log(`Using '${config.mode}' mode`);
  config.plugins.push(new webpack.DefinePlugin({
    'process.env.RESUME_BUILDER_BASEURL': JSON.stringify(process.env.RESUME_BUILDER_BASEURL),
    'process.env.RESUME_BUILDER_ENVIRONMENT': JSON.stringify(process.env.RESUME_BUILDER_ENVIRONMENT),
  }));
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            require('postcss-import'),
            require('tailwindcss')('./tailwind.config.js'),
            require('autoprefixer'),
            ...(config.mode === 'production' ? [purgecss] : [])
          ]
        }
      }
    ]
  });
  return config;
};
