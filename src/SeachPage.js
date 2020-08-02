// ***NOTE***
// Search input will search only the following terms :
// "Android", "Art", "Artificial Intelligence",  "Astronomy", "Austen",
//   "Baseball", "Basketball", "Bhagat", "Biography", "Brief", "Business",
// "Camus", "Cervantes", "Christie", "Classics", "Comics", "Cook", "Cricket", "Cycling",
//   "Desai", "Design", "Development", "Digital Marketing", "Drama", "Drawing","Dumas",
//   "Education", "Everything", "Fantasy", "Film", "Finance", "First", "Fitness", "Football", "Future",
//   "Games", "Gandhi", "Homer","Horror", "Hugo",
//   "Ibsen", "Journey", "Kafka", "King", "Lahiri", "Larsson", "Learn", "Literary Fiction",
//   "Make", "Manage", "Marquez", "Money", "Mystery", "Negotiate",
//   "Painting", "Philosophy", "Photography", "Poetry", "Production", "Programming",
//   "React", "Redux", "River", "Robotics", "Rowling",
//   "Satire", "Science Fiction", "Shakespeare", "Singh", "Swimming", "Tale", "Thrun", "Time", "Tolstoy", "Travel",
//   "Ultimate", "Virtual Reality", "Web Development", "iOS";

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";

class SearchPage extends Component {
  state = {
    query: " ",
    searchedBooks: [],
  };

  updateQuery = (query) => {
    this.setState(() => ({
      query: query,
    }));
    this.updateSearchedBooks(query);
  };

  updateSearchedBooks = (query) => {
    if (query) {
      BooksAPI.search(query).then((searchedBooks) => {
        if (searchedBooks.error) {
          this.setState({ searchedBooks: [] });
        } else {
          this.setState({ searchedBooks: searchedBooks });
        }
      });
    } else {
      this.setState({ searchedBooks: [] });
    }
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query.trimStart()}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchedBooks.map((searchedBook) => {
              let shelf = "none";

              this.props.books.map((book) =>
                book.id === searchedBook.id ? (shelf = book.shelf) : " "
              );

              return (
                <li key={searchedBook.id}>
                  <Book
                    book={searchedBook}
                    moveShelf={this.props.moveShelf}
                    currentShelf={shelf}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
