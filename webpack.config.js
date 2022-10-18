const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    target: 'web',
    entry: './src/app.ts',
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        static: "./dist",
        hot: true,
        watchFiles: ['src/**/*'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(jpg|png|jpeg|gif)$/,
                type: 'assets/sprites'
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['main']
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'assets/sprites/*',
                    context: 'src/'
                }
            ]
        })
    ],
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};