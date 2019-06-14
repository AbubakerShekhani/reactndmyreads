import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookRack from './BookRack';
import SearchBar from './SearchBar';
import { Link, Route } from 'react-router-dom';
import Loader from 'react-loader-spinner';

class BooksApp extends React.Component {

  state = {
    books: [],
    isLoading: true,
    connectionSuccessful: true
  }

  moveBookToShelfHandler = (book, shelfName) => {

    BooksAPI.update(book, shelfName)
      .then((response) => {
        book.shelf = shelfName

        this.setState((prevState) => ({
          books: prevState.books
            .filter(prevbook => prevbook.id !== book.id)
            .concat(book)
        }))
      })
  };

  searchBooks = (searchQuery) => {

    BooksAPI.search(searchQuery)
      .then((searchResults) => {
        console.log(searchResults);
      })

  };

  getAllBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          books,
          connectionSuccessful: true,
          isLoading: false
        })
      }).catch((err) => {
        this.setState({
          connectionSuccessful: false,
          isLoading: false
        });
      })

    return 1;
  };

  componentDidMount() {
    this.getAllBooks();
  }

  render() {

    const books = this.state.books;
    const isLoading = this.state.isLoading;

    return (
      <div className="app">
        {isLoading ?
          (
            <div style={{
              position: 'fixed',
              top: '0px',
              left: '0px',
              bottom: '0px',
              right: '0px',
              display: 'flex',
              alignItems: 'center',
              overflow: 'auto'
            }}>
              <div style={{
                margin: 'auto',
                maxHeight: '100%'
              }} >
                <Loader
                  type="Grid"
                  color="#2e7c31"
                  height="100"
                  width="100"
                />
              </div>
            </div>)

          :

          (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>

              {(!this.state.connectionSuccessful) ?
                <div>There is some issue loading the page.</div>
                : (
                  <Route exact path="/" render={() => (
                    <BookRack
                      books={books}
                      onMoveBookToShelfHandler={this.moveBookToShelfHandler}
                    />
                  )}
                  />
                )
              }

              <Route exact path="/search" render={() => (
                <SearchBar onSearchTextChange={this.searchBooks} onMoveBookToShelfHandler={this.moveBookToShelfHandler} />
              )} />
              <div className="open-search">
                <Link to='/search'><button>Add Book</button></Link>
              </div>
            </div>

          )}
      </div>
    )
  }
}

export default BooksApp;
