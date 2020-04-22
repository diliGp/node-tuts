"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCache = exports.checkCache = void 0;

var _redis = require("redis");

var _cache = require("../cache");

var REDIS_PORT = process.env.REDIS_PORT || 6379;
var client = (0, _redis.createClient)(REDIS_PORT);
client.on('error', function (error) {
  console.error("Redis ".concat(error));
});
/**
 * Checks cache as a middleware and send resposne if cached data is present
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

var checkCache = function checkCache(req, res, next) {
  var headers = req.headers;
  /**
   * Passing `fresh: true` in header will skip cache check and always uses fresh data.
   */

  if ('fresh' in headers && headers.fresh === 'true') {
    next();
    return;
  }

  var baseUrl = req.path;
  var key = _cache.cachable[baseUrl].key;
  client.get(key, function (error, value) {
    if (error) {
      console.error(error);
      res.sendStatus(500);
      return;
    }

    if (value) {
      res.json(JSON.parse(value));
      return;
    }

    next();
  });
};
/**
 * Sets cache in redis.
 * @param {*} cachableInfo 
 * @param {*} value 
 */


exports.checkCache = checkCache;

var setCache = function setCache(cachableInfo, value) {
  client.setex(cachableInfo.key, cachableInfo.expiry, value);
};

exports.setCache = setCache;