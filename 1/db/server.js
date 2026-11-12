/**
 * 作者：孙绍词
 * 建立时间：2026-11-12
 * 使用模型：GLM-5.3-Flash
 * 功能名称：poems 数据服务器（server.js）
 * 功能简介：读取同目录 db.json 中的 poems 数组，通过 GET /poems
 *           以 JSON 返回（图片 pic、标题 title、内容 content），
 *           供 poems.html 上图下文页面请求数据；端口号 3004。
 * 启动方式：在本文件夹执行 node server.js
 */
var express = require('express');
var fs = require('fs');
var path = require('path');

var app = express();
var PORT = 3004;

/**
 * 函数名称：CORS 中间件
 * 功能简介：为所有响应添加 Access-Control-Allow-Origin: *，
 *           允许 poems.html（file:// 或其他端口打开）跨域获取数据
 */
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

/**
 * 函数名称：GET /poems 接口
 * 功能简介：读取 db.json 并解析，返回 poems 数组；
 *           读取失败或 JSON 格式错误时返回 500 与错误信息
 */
app.get('/poems', function (req, res) {
  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', function (err, data) {
    if (err) {
      res.status(500).json({ error: '读取 db.json 失败' });
      return;
    }
    try {
      var json = JSON.parse(data);
      res.json(json.poems || []);
    } catch (e) {
      res.status(500).json({ error: 'db.json 格式错误' });
    }
  });
});

/**
 * 函数名称：app.listen
 * 功能简介：在 3004 端口启动服务器，控制台输出访问地址
 */
app.listen(PORT, function () {
  console.log('poems 数据服务器已启动：http://localhost:' + PORT + '/poems');
});
