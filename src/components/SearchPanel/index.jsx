import React, { Component } from "react";
import {PropTypes} from "prop-types";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { setSearch } from "../../ducks/movies.js";
import { showSelector } from "../../ducks/search.js";

import "./index.scss";
import ErrorField from "./ErrorField";

export class SearchPanel extends Component {
  static propTypes = {
    show : PropTypes.bool,
    setSearch: PropTypes.func
  };


  onSubmit = ({ search }) => {
    this.props.setSearch({
      search
    });
  };
  
  render() {
    const search = this.props.show ? "search-appear" : "search-leave ";
    return (
      <div className={`search-panel ${search}`}>
        <form
          className="search-panel__form"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <div className="search-panel__wrapper">
            <div className="search-panel__input-wrapper">
              <Field name="search" component={ErrorField} />
            </div>
            <div className="search-panel__submit-wrapper">
              <button
                className="search__submit"
                value="search"
                style={{ backgroundImage: "url(search.png)" }}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export const validate = ({ search }) => {
  const errors = {};
  if (!search || !search.match(/^\s*\w\w+\s*/g))
    errors.search = "Input needs to be at least 2 characters long";
  return errors;
};

export default connect(
  state => ({
    show: showSelector(state)
  }),
  { setSearch }
)(
  reduxForm({
    form: "search",
    validate
  })(SearchPanel)
);
