import React, { Component } from "react";
import {PropTypes} from "prop-types";
import "./index.scss";
import MovieInfo from "./MovieInfo";

export class Movie extends Component {
  constructor() {
    super();
    this.click = this.click.bind(this);
    this.leave = this.leave.bind(this);
    this.selected = false;
  }


  static propTypes = {
    movie: PropTypes.shape({
     year: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    pict:  PropTypes.string.isRequired   
    }).isRequired,
    select: PropTypes.string.isRequired 
}


  componentWillMount() {
    this.setState({ selected: false });
  }

  click() {
    this.setState({ selected: !this.state.selected });
  }

  leave() {
    this.setState({ selected: false });
  }

  render() {
    const { pict, year, title } = this.props.movie;
    const { select } = this.props;
    const poster = pict === "N/A" ? "no_poster.png" : pict;
    const movieAppear = this.state.selected
      ? "movie-appear-active"
      : "movie-appear-leave";
    return (
      <div className="movie">
        <button
          className={`movie__button ${movieAppear} `}
          onClick={this.click}
          onBlur={this.leave}
        >
          <div
            className="movie__pict"
            style={{ backgroundImage: `url(${poster})` }}
          />
          <MovieInfo
            className="movie__brif-info"
            select={select}
            title={title}
            year={year}
          />
          <MovieInfo
            className="movie__info"
            select={select}
            title={title}
            year={year}
          >
            <p>Some Info...</p>
          </MovieInfo>
        </button>
      </div>
    );
  }
}

export default Movie;
