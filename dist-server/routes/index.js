"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = require("../controllers/users");

var _posts = require("../controllers/posts");

var _RedisHandler = require("../middlewares/RedisHandler");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/users', _RedisHandler.checkCache, _users.getUsers);
router.get('/posts', _RedisHandler.checkCache, _posts.getPosts);
/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
var _default = router;
exports["default"] = _default;