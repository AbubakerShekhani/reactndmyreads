import React from 'react';
import './App.css';
import Shelf from './Shelf';

const BookRack = (props) => {

    const { books, onMoveBookToShelfHandler } = props;
    const shelfTypes = [
        { type: 'currentlyReading', title: 'Currently Reading' },
        { type: 'wantToRead', title: 'Want to Read' },
        { type: 'read', title: 'Read' },
    ];

    return (
        <div className="list-books-content">
            {shelfTypes.map((shelf, index) => {

                const booksShelf = books.filter(book => book.shelf === shelf.type);

                return (
                    <Shelf
                        key={index}
                        shelf={shelf.title}
                        books={booksShelf}
                        onMoveBookToShelfHandler={onMoveBookToShelfHandler}
                    />)

            })
            }
        </div>
    )
}

export default BookRack;