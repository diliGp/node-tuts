"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authors = exports.books = void 0;
// Some dummy books data.
var books = [{
  name: 'Name Of The Wind',
  genre: 'Fantasy',
  id: '1',
  authorId: '1'
}, {
  name: 'The Song of Ice & Fire',
  genre: 'High fantasy',
  id: '2',
  authorId: '2'
}, {
  name: 'Fire & Blood',
  genre: 'Adventure fiction',
  id: '3',
  authorId: '2'
}, {
  name: 'The Long Earth',
  genre: 'Sci-Fi',
  id: '4',
  authorId: '3'
}]; // Dummy authors data.

exports.books = books;
var authors = [{
  name: 'Patrick Rothfus',
  age: 44,
  id: '1'
}, {
  name: 'George R. R. Martin',
  age: 71,
  id: '2'
}, {
  name: 'Terry Pratchett',
  age: 66,
  id: '3'
}];
exports.authors = authors;