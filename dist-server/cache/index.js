"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cachable = void 0;
var cachable = {
  '/users': {
    key: 'users',
    expiry: 3600 // In seconds

  },
  '/posts': {
    key: 'posts',
    expiry: 30 // In seconds

  }
};
exports.cachable = cachable;