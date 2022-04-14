const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const webpack = require('webpack');
const DotEnv = require('dotenv');
const path = require('path');

DotEnv.config();

module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        inlineImageLimit: 8192,
        imagesFolder: 'images',
        imagesName: '[name]-[hash].[ext]',
        handleImages: ['jpeg', 'jpg', 'png', 'svg', 'webp', 'gif', 'ico'],
        optimizeImages: true,
        optimizeImagesInDev: false,
        mozjpeg: {
          quality: 80
        },
        optipng: {
          optimizationLevel: 3
        },
        pngquant: false,
        gifsicle: {
          interlaced: true,
          optimizationLevel: 3
        },
        webp: {
          preset: 'default',
          quality: 75
        }
      }
    ],
    [withCSS],
    [withFonts],
    [withSass]
  ],
  {
    exportPathMap() {
      return {
        '/': { page: '/' }
      };
    },
    webpack: config => {
      config.plugins.push(new webpack.EnvironmentPlugin(process.env));
      config.resolve.alias = {
        ...config.resolve.alias,
        '@actions': path.resolve('src/store/actions'),
        '@components': path.resolve('src/components'),
        '@containers': path.resolve('src/containers'),
        '@layout': path.resolve('src/layout'),
        '@configs': path.resolve('src/configs'),
        '@constants': path.resolve('src/constants'),
        '@helpers': path.resolve('src/helpers'),
        '@images': path.resolve('src/assets/images'),
        '@styles': path.resolve('src/assets/styles'),
        '@reducers': path.resolve('src/store/reducers')
      };
      return config;
    }
  }
);
