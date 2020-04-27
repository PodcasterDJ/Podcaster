const path = require('path')

module.exports = ({config}) => {
  // allow SCSS
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader',
      {
        loader: 'style-resources-loader',
        options: {
          patterns: [path.resolve(__dirname, '@/styles/*.scss')]
        }
      }
    ],
  });
  // setup URL Alias
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, '../src')
  };
  return config;
}
