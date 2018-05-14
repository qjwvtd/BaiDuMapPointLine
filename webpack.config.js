var path = require('path');
//var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    //默认index.js 也可以确定是哪个文件名字
    entry:{
        index:[
            'webpack-hot-middleware/client?noInfo=true&reload=true',
            path.resolve(__dirname, './web/js')
        ]
    },
    //打包到build目录，index.js
    output: {
        path: path.resolve(__dirname, './web/dist'),
        filename: '[name].js',
        publicPath:'http://localhost:1000/dist/'  //避免热更新出现xxx-hot-update.json出现404
    },
    module:{
        rules:[
            {test: /\.jsx?$/,exclude:/node_modules/,loader: 'babel-loader',query: {presets: ['react', 'es2015']}},
            //{test:/\.css$/,use:['style-loader','css-loader']},
            //{test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            //{test:/\.(svg|eot|woff2|ttf|woff|png|gif|jpg)/,use:'url-loader'}
        ]
    },
    //热模块替换
    plugins: [
        //new HtmlWebpackPlugin({title: 'js name'}),
        new webpack.HotModuleReplacementPlugin()
    ]
};
