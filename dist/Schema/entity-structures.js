import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } from "graphql";
import { authors, books } from "./helper";
import _ from 'lodash';
/**
 * Defining `TYPE`/`Structure` for the Book entity.
 */

export const BookStructure = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    genre: {
      type: GraphQLString
    },
    author: {
      type: AuthorStructure,

      resolve(parent) {
        return _.find(authors, {
          id: parent.authorId
        });
      }

    }
  })
});
/**
 * Defining `TYPE`/`Structure` for the Book entity.
 */

export const AuthorStructure = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    books: {
      type: new GraphQLList(BookStructure),

      resolve(parent) {
        return _.filter(books, {
          authorId: parent.id
        });
      }

    }
  })
});