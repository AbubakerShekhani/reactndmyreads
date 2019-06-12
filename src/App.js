import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookRack from './BookRack'
import SearchBar from './SearchBar'
import { Link, Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [

    ],
    connectionSuccessful: true
  }

  getAllBooks = () => {
    BooksAPI.getAll()
    .then((books)=>{

      let currentlyReading = [], wantToRead = [], readBook = [];

      books.map( (book) => {

        const shelf = book.shelf;

        if (shelf === 'currentlyReading') {
          
          currentlyReading.push(book);
        } else if (shelf === 'wantToRead') {
          
          wantToRead.push(book);
        }
        else if (shelf === 'read') {
          
          readBook.push(book);
        }

      }
      
      )

      this.setState({
        currentlyReading,
        wantToRead,
        readBook,
        connectionSuccessful: true 

      })
      
   
      
    }).catch((err)=>{
      this.setState({ connectionSuccessful: false });
      console.log(err)
    })

    return 1;
  }

  componentDidMount() {
    this.getAllBooks();      
  }

  render() {
    

    return (
      <div className="app">
        { (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

          {  (!this.state.connectionSuccessful) ?
              <div>Loading</div>
            : (
                <Route exact path='/' render={() => (
                  <BookRack 
                    currentlyReading={this.state.currentlyReading} 
                    wantToRead={this.state.wantToRead} 
                    readBook={this.state.readBook}
                  />
                )}
              />
            )
          }  

            <Route exact path='/search' render={() => (
              <SearchBar />
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

export default BooksApp
