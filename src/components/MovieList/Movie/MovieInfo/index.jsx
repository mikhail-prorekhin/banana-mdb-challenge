import React from "react";
import Parser from "html-react-parser";
import {PropTypes} from "prop-types";

export function replace(title, select) {
  if (!select) return  title;
  const selectPattern = select.trim().split(" ").join("|");
  const regExp = new RegExp(`(${selectPattern})`, "gi");
  return title.replace(regExp, "<strong>$1</strong>");
}

function MovieInfo(props) {
  const { year, title, select, className } = props;
  const hightLineTitle = replace(title, select);

  return (
    <div className={className}>
      <p className="movie__title">{Parser(hightLineTitle)}</p>
      <p className="movie__year">{year}</p>
      {props.children}
    </div>
  );
}

MovieInfo.propTypes = {
    year: PropTypes.string,
    title: PropTypes.string.isRequired,
    select: PropTypes.string.isRequired,
    className: PropTypes.string
}


export default MovieInfo;
