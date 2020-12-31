import { gql } from '@apollo/client';
const ADD_BOOK = gql`
  mutation AddBook($name: String!,$genre: String!,$authorId: ID!) {
    addBook(name: $name,genre:$genre,authorId:$authorId) {
      id
      genre,
      author {
          name,
          id
      }
    }
  }
`;
const REMOVE_BOOK = gql`
mutation RemoveBook($id:ID!) {
    removeBook(id:$id) {
        id
    }
}
`;
const GetAuthors = gql`
  query GetAuthors {
    authors {
       name,
       id
    }
  }
`;
const GetBooks = gql`
  query GetBooks {
    books {
        name,
        id,
        author {
            name,
            id
        }
    }
  }
`;


export { GetAuthors, GetBooks, ADD_BOOK,REMOVE_BOOK}