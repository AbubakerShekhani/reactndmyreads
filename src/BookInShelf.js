import React from 'react';
import './App.css';

const BookInShelf = (props) => {

    const { book, onMoveBookToShelfHandler } = props;

    return (

        <div className="book">
            <div className="book-top">
                {
                    (book.imageLinks) &&
                    <div className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                        }}>
                    </div>
                }
                <div className="book-shelf-changer">
                    <select
                        id={book.id}
                        defaultValue={(book.shelf) ? book.shelf : 'none'}
                        onChange={(event) => onMoveBookToShelfHandler(book, event.target.value)}>
                            <option value="" disabled>move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{(book.authors) && book.authors.join(', ')}</div>
        </div>
    )
}

export default BookInShelf;