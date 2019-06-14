import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookInShelf from './BookInShelf'

class SearchBar extends Component {

  state = {
    searchQuery: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState({
      searchQuery: query
    })

    if (query && query.length > 0) {
      BooksAPI.search(query.trim(), 20)
        .then((booksresult) => {

          booksresult.length > 0 ?
            this.setState({
              books: booksresult,
            }) :
            this.setState({
              books: [],
            })
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      this.clearQuery();
    }

    if (query.length === 0) {
      this.clearQuery();
    }
  }

  clearQuery = () => {
    this.setState({
      books: [],
      searchQuery: ''
    })
  }

  render() {

    const { onMoveBookToShelfHandler } = this.props;
    const booksSearchResult = this.state.books;
    const searchQuery = this.state.searchQuery;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" >
            <button className="close-search">Close</button> </Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={searchQuery} onChange={(event) => this.updateQuery(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { searchQuery.length > 0 &&
              booksSearchResult.length > 0 && booksSearchResult.map((book) => (
                <li key={book.id}>
                  <BookInShelf
                    book={book}
                    onMoveBookToShelfHandler={onMoveBookToShelfHandler} />
                </li>
              )
              )
            }
          </ol>

        </div>
      </div>
    )
  }
}

export default SearchBar;