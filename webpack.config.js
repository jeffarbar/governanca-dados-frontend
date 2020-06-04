var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.vue?$/,
                exclude: /(node_modules)/,
                use: 'vue-loader'
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            { 
                test: /\.less$/, 
                loaders: ["css-loader", "less-loader"] 
            }, 
            { 
                test: /\.css$/, 
                loaders: ["css-loader"] 
            } 
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true,
        open: process.platform === "darwin",
        host: "0.0.0.0",
        port: 8080, 
        https: false,
        hotOnly: false
    },
    externals: {
         //global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:4000'
        })
    }
}