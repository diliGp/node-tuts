"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphql = require("graphql");

var _lodash = _interopRequireDefault(require("lodash"));

var _entityStructures = require("./entity-structures");

var _helper = require("./helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Defining entry point for query.
 */
var RootQuery = new _graphql.GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    // Qeury type which we'll pass while requesting for a single book.
    book: {
      // Giving definition to book type.
      type: _entityStructures.BookStructure,
      // Required arguments to pass along with the request to identify the entity.
      args: {
        id: {
          type: _graphql.GraphQLID
        }
      },
      // Code handle singe book request (like fetching book from db).
      resolve: function resolve(parent, args) {
        return _lodash["default"].find(_helper.books, {
          id: args.id
        });
      }
    },
    books: {
      type: new _graphql.GraphQLList(_entityStructures.BookStructure),
      resolve: function resolve() {
        return _helper.books;
      }
    },
    author: {
      type: _entityStructures.AuthorStructure,
      args: {
        id: {
          type: _graphql.GraphQLID
        }
      },
      resolve: function resolve(parent, args) {
        return _lodash["default"].find(_helper.authors, {
          id: args.id
        });
      }
    },
    authors: {
      type: new _graphql.GraphQLList(_entityStructures.AuthorStructure),
      resolve: function resolve() {
        return _helper.authors;
      }
    }
  }
});

var _default = new _graphql.GraphQLSchema({
  query: RootQuery
});

exports["default"] = _default;