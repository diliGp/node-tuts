"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthorStructure = exports.BookStructure = void 0;

var _graphql = require("graphql");

var _helper = require("./helper");

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Defining `TYPE`/`Structure` for the Book entity.
 */
var BookStructure = new _graphql.GraphQLObjectType({
  name: 'Book',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLID
      },
      name: {
        type: _graphql.GraphQLString
      },
      genre: {
        type: _graphql.GraphQLString
      },
      author: {
        type: AuthorStructure,
        resolve: function resolve(parent) {
          return _lodash["default"].find(_helper.authors, {
            id: parent.authorId
          });
        }
      }
    };
  }
});
/**
 * Defining `TYPE`/`Structure` for the Book entity.
 */

exports.BookStructure = BookStructure;
var AuthorStructure = new _graphql.GraphQLObjectType({
  name: 'Author',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLID
      },
      name: {
        type: _graphql.GraphQLString
      },
      age: {
        type: _graphql.GraphQLInt
      },
      books: {
        type: new _graphql.GraphQLList(BookStructure),
        resolve: function resolve(parent) {
          return _lodash["default"].filter(_helper.books, {
            authorId: parent.id
          });
        }
      }
    };
  }
});
exports.AuthorStructure = AuthorStructure;