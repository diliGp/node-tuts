"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _expressGraphql = _interopRequireDefault(require("express-graphql"));

var _index = _interopRequireDefault(require("./routes/index"));

var _Schema = _interopRequireDefault(require("./Schema"));

var _cors = _interopRequireDefault(require("cors"));

var _redis = require("redis");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use('/graphql', (0, _expressGraphql["default"])({
  schema: _Schema["default"],
  // Enables UI for querying throught the graphql.
  graphiql: true
}));
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../public')));
app.use('/', _index["default"]);
module.exports = app;