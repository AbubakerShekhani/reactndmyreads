import React from 'react'
import './App.css'
import Shelf from './Shelf'


const BookRack = (props) => {

    const { currentlyReading, wantToRead, readBook } = props;

    return (
        <div>
        {
            (!currentlyReading) ?

                <div>Loading</div>
            :
                <div className="list-books-content">
                    <div>
                    <Shelf shelf='Currently Reading' books={currentlyReading} />
                    <Shelf shelf='Want to Read' books={wantToRead} />
                    <Shelf shelf='Read' books={readBook} />
                    
                    </div>
                </div>
        }
        </div>
    )


}

export default BookRack;