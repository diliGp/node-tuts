import { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLList, GraphQLString } from 'graphql';
import _ from 'lodash';
import { BookStructure, AuthorStructure } from './entity-structures';
import { authors, books } from './helper';
/**
 * Defining entry point for query.
 */

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    // Qeury type which we'll pass while requesting for a single book.
    book: {
      // Giving definition to book type.
      type: BookStructure,
      // Required arguments to pass along with the request to identify the entity.
      args: {
        id: {
          type: GraphQLID
        }
      },
      // Code handle singe book request (like fetching book from db).
      resolve: (parent, args) => {
        return _.find(books, {
          id: args.id
        });
      }
    },
    books: {
      type: new GraphQLList(BookStructure),

      resolve() {
        return books;
      }

    },
    author: {
      type: AuthorStructure,
      args: {
        id: {
          type: GraphQLID
        }
      },

      resolve(parent, args) {
        return _.find(authors, {
          id: args.id
        });
      }

    },
    authors: {
      type: new GraphQLList(AuthorStructure),

      resolve() {
        return authors;
      }

    }
  }
});
const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    addBook: {
      type: BookStructure,
      args: {
        name: {
          type: GraphQLString
        },
        genre: {
          type: GraphQLString
        },
        authorId: {
          type: GraphQLID
        }
      },

      resolve(parent, {
        name,
        genre,
        authorId
      }) {
        books.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        const newId = parseInt(books[0].id) + 1;
        const newBook = {
          id: `${newId}`,
          name,
          genre,
          authorId
        };
        books.push(newBook);
        return newBook;
      }

    }
  }
});
export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
});