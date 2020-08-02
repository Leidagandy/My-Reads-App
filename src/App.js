import React from "react";
import { Route } from "react-router-dom";
import MainPage from "./MainPage";
import SearchPage from "./SeachPage";

import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: [],
    error: false,
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books: books });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: true });
      });
  }

  moveShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).catch((error) => {
      console.log(error);
      this.setState({ error: true });
    });

    if (shelf === "none") {
      this.setState((prevState) => ({
        books: prevState.books.filter((b) => b.id !== book.id),
      }));
    } else {
      book.shelf = shelf;
      this.setState((prevState) => ({
        books: prevState.books.filter((b) => b.id !== book.id).concat(book),
      }));
    }
  };

  render() {
    // console.log(this.state.books);
    if (this.state.error) {
      return <div>Network error. Please try again later.</div>;
    }
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <MainPage books={this.state.books} moveShelf={this.moveShelf} />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchPage books={this.state.books} moveShelf={this.moveShelf} />
          )}
        />
      </div>
    );
  }
}
export default BooksApp;
