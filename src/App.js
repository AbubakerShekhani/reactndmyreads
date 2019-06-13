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

  moveBookToShelfHandler = (book, shelfName) => {
    
    if (shelfName !== 'none')
    {
      BooksAPI.update(book, shelfName)
        .then((response) => {
          //console.log(response);

          book.shelf = shelfName
          console.log(this.state);

          this.setState((prevState)=>({
            books: prevState.books
                  .filter( prevbook => prevbook.id !== book.id)
                  .concat( book)
          }))


        })
    }

  }

  searchBooks = (searchQuery) => {

    BooksAPI.search(searchQuery)
      .then((searchResults) => {
        console.log(searchResults);
      })

  }

  getAllBooks = () => {
    BooksAPI.getAll()
    .then((books)=>{

      this.setState({books})

      /*
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
      
      )*/

      this.setState({
        
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
    
    const books = this.state.books;

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
                    books={books}
                    onMoveBookToShelfHandler ={this.moveBookToShelfHandler }
                  />
                )}
              />
            )
          }  

            <Route exact path='/search' render={() => (
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

export default BooksApp
