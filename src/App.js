import React from "react";
import MainPage from "./MainPage";
// import SearchPage from "./SeachPage";

// import { Route, Link } from "react-router-dom";
// import * as BooksAPI from './BooksAPI'
import "./App.css";

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <MainPage />
      </div>
    );
  }
}
export default BooksApp;
