import React from "react";

const Book = ({ book, currentShelf, moveShelf }) => {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${
              book.imageLinks
                ? book.imageLinks.thumbnail
                : "icons/book-placeholder.svg"
            })`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            onChange={(event) => moveShelf(book, event.target.value)}
            value={currentShelf}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">
        {book.title ? book.title : "Title unavailable"}
      </div>
      <div className="book-authors">
        {book.authors ? book.authors : "Author name unavailable"}
      </div>
    </div>
  );
};

export default Book;
