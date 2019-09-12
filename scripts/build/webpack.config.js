const path = require('path');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { getRuleJS, getRuleCSS, getRuleFiles } = require('./utils');

const PROJECT_ROOT_PATH = path.resolve(__dirname, '../../');
const SOURCE_PATH = path.resolve(PROJECT_ROOT_PATH, 'src');
const DIST_PATH = path.resolve(PROJECT_ROOT_PATH, 'dist');
const PACKAGES_PATH = path.resolve(SOURCE_PATH, 'packages');
const NODE_MODULES_PATH = path.resolve(SOURCE_PATH, '../node_modules');

const { oneui } = require('../../package.json');

const { libraryName: LIBRARY_NAME } = oneui;

const plugins = {
    namedModulesPlugin: new webpack.NamedModulesPlugin(),
    hashedModuleIdsPlugin: new webpack.HashedModuleIdsPlugin({
        hashDigestLength: 6,
    }),
    cssPlugin: new MiniCssExtractPlugin({
        filename: `${LIBRARY_NAME}.min.css`,
    }),
    styleLintPlugin: new StyleLintPlugin({
        context: SOURCE_PATH,
    }),
    optimizeCssAssetsPlugin: new OptimizeCssAssetsPlugin(),
    bundleAnalyzerPlugin: new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: '../reports/bundle-size.html',
    }),
    cleanWebpackPlugin: new CleanWebpackPlugin({ verbose: true }),
};

const getRules = (env = 'prod') => ({
    js: getRuleJS({
        includePaths: [SOURCE_PATH],
    }),
    styles: getRuleCSS({
        styleLoader: env === 'prod' ? MiniCssExtractPlugin.loader : 'style-loader',
        localIdentName: env === 'prod' ? '[local]--[hash:base64:10]' : '[local]',
        includePaths: [SOURCE_PATH],
        context: DIST_PATH, // https://github.com/webpack-contrib/css-loader/issues/464
    }),
    files: getRuleFiles({
        fileLoader: 'file-loader',
    }),
});

const baseConfig = {
    context: SOURCE_PATH,

    entry: {
        main: './index.js',
    },

    output: {
        filename: `${LIBRARY_NAME}.js`,
        path: DIST_PATH,
        library: LIBRARY_NAME,
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },

    resolve: {
        modules: [PACKAGES_PATH, NODE_MODULES_PATH],
        extensions: ['.js'],
    },
};

module.exports = {
    baseConfig,
    plugins,
    getRules,
    LIBRARY_NAME,
    PROJECT_ROOT_PATH,
    SOURCE_PATH,
    DIST_PATH,
    PACKAGES_PATH,
    NODE_MODULES_PATH,
};