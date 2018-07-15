import React, { Component } from "react";
import { Provider } from "react-redux";
import SearchPanel from "./components/SearchPanel";
import MovieList from "./components/MovieList";
import Message from "./components/Message";
import store from "./redux";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Message />
          <SearchPanel />
          <MovieList  />
        </div>
      </Provider>
    );
  }
}

export default App;
