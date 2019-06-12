import React from 'react'
import './App.css'
import BookInShelf from './BookInShelf'

const Shelf = (props) => {

    

    const { shelf, books } = props;


    return (
        <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf}</h2>
        <div className="bookshelf-books">
        <ol className="books-grid">
            
            { books && books.map( (book) => (
                <li key={book.id}>
                    <BookInShelf book={book} />
                </li>
            )

            )
            }
            
            
        
        </ol>
        </div>
    </div>
    )

}

export default Shelf;