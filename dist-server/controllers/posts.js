"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPosts = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _RedisHandler = require("../middlewares/RedisHandler");

var _cache = require("../cache");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getPosts = function getPosts(req, res) {
  _axios["default"].get('https://jsonplaceholder.typicode.com/posts').then(function (_ref) {
    var data = _ref.data;
    console.log('Fecthing data....');
    var cacheInfo = _cache.cachable[req.path];
    (0, _RedisHandler.setCache)(cacheInfo, JSON.stringify(data));
    res.json({
      status: 200,
      data: data
    });
  })["catch"](function (error) {
    console.error(error);
    res.sendStatus(500);
  });
};

exports.getPosts = getPosts;