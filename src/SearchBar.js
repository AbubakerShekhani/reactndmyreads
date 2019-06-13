import React, {Component} from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookInShelf from './BookInShelf'

class SearchBar extends Component {

  state = { 
            searchQuery:'',
            books:[] 

          }
  
  updateQuery = (query) => {

      console.log(query);

      if (query === '') {
        this.setState({
          books:[], 
          searchQuery:''
        })
      }

      if (query.length > 0)
      {
        BooksAPI.search(query, 20)
          .then((booksresult)=>{
          
            booksresult.length > 0 ? 
              this.setState({
                books:booksresult,
                searchQuery:query
              }) : 
              this.setState({
                books:[],
                searchQuery:''
              })

              console.log(this.state.books);
          })
          .catch((err)=>{
            console.log(err);
          })
      } else {
        this.clearQuery();
      }
  }

  clearQuery = () => {
    this.setState({
      books:[],
      searchQuery:''
    })

    console.log("State Cleared");
    console.log(this.state.books);

  }

  render () {
    
    const { onMoveBookToShelfHandler } = this.props;
    const  booksSearchResult  = this.state.books;
    console.log("Render Called");
    console.log(this.state.books);

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" >
              <button className="close-search">Close</button> </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" value={this.state.searchquery} onChange={ (event) => this.updateQuery(event.target.value) }/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">                    
                    { 
                        booksSearchResult.length > 0 && booksSearchResult.map( (book) => (
                            
                            
                            
                            <li key={book.id}>
                                <BookInShelf 
                                    book={book} 
                                    onMoveBookToShelfHandler={onMoveBookToShelfHandler}/>
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