/*
 * 2018/5/14
 * administractor
 */
var path = require("path");
var express = require("express");
var webpack = require("webpack");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-Hot-middleware");
var config = require('./../webpack.config.js');

var app = express();
var port = 1000; //启动端口
var com = webpack(config);

var _publicPath = config.output.publicPath;

let devMiddleware = webpackDevMiddleware(com,{
    publicPath: _publicPath,
    quiet: true //显示在控制台
});

let hotMiddleware = webpackHotMiddleware(com,{
    log: false,
    heartbeat: 1000
});
app.use(devMiddleware);
app.use(hotMiddleware);
// 静态文件路径
var root = __dirname.replace('server','web');
app.use(express.static(path.join(root)));
app.listen(port,function(){
    console.log("start success,http://localhost:"+port);
});
