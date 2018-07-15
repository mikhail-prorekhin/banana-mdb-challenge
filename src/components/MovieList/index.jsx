import React, { Component } from "react";
import { connect } from "react-redux";
import {PropTypes} from "prop-types";
import "./index.scss";
import Movie from "./Movie";
import Loader from "./Loader";
import {
  fetchNextPage,
  moviesSelector,
  searchSelector,
  loadingSelector
} from "../../ducks/movies.js";
import { show, hide, showSelector } from "../../ducks/search.js";

export class MovieListClass extends Component {
  constructor() {
    super();
    this.handleInterval = this.handleInterval.bind(this);
    this.onTouchStartHadler = this.onTouchStartHadler.bind(this);
    this.onTouchMoveHadler = this.onTouchMoveHadler.bind(this);
    this.touch = {};
    this.minDistance = 50;
  }

  static propTypes = {
  
    movies: PropTypes.array.isRequired,
    select: PropTypes.string,
    loading:  PropTypes.bool,
    showSearchPanel:  PropTypes.bool,  
    fetchNextPage: PropTypes.func.isRequired,
    show: PropTypes.func.isRequired,
    hide: PropTypes.func.isRequired,

}


  handleInterval() {
    if (
      this.container.clientHeight > this.list.clientHeight ||
      this.container.clientHeight + this.container.scrollTop ===
        this.list.clientHeight
    ) {
      this.props.fetchNextPage();
    }
  }

  componentWillMount() {
    this.intervalID = setInterval(this.handleInterval, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  onTouchStartHadler(e) {
    const touch = e.touches[0];
    this.touch = { y: touch.clientY };
  }

  onTouchMoveHadler(e) {
    if (e.changedTouches && e.changedTouches.length) {
      const touch = e.changedTouches[0];
      const moveY = touch.clientY - this.touch.y;
      if (moveY < 0 && this.props.showSearchPanel) {
        this.props.hide();
        return;
      }
      if (moveY > this.minDistance && !this.props.showSearchPanel) {
        this.props.show();
      }
    }
  }

  render() {
    const { movies, loading, select } = this.props;
    const movieComponents = movies.map(movie => (
      <Movie movie={movie} key={movie.id} select={select} />
    ));
    let loadingElement = loading ? <Loader /> : null;
    return (
      <div
        className="movie-list"
        ref={divElement => (this.container = divElement)}
        onTouchStart={this.onTouchStartHadler}
        onTouchMove={this.onTouchMoveHadler}
        onTouchEnd={this.onTouchEndHadler}
      >
        <div
          className="movie-list__scroll-wrap"
          ref={divElement => (this.list = divElement)}
        >
          {movieComponents}
        </div>
        {loadingElement}
      </div>
    );
  }
}

export default connect(
  state => ({
    movies: moviesSelector(state).toArray(),
    select: searchSelector(state),
    loading: loadingSelector(state),
    showSearchPanel: showSelector(state)
  }),
  { fetchNextPage, show, hide }
)(MovieListClass);
