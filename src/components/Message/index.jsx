import React, { Component } from "react";
import {PropTypes} from "prop-types";
import { connect } from "react-redux";
import { clearMessage, messageSelector } from "../../ducks/message.js";
import "./index.scss";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Message extends Component {
  static propTypes = {};
  static propTypes = {
    message : PropTypes.string,
    clearMessage: PropTypes.func
  };
  render() {
    const { message, clearMessage } = this.props;
    if (message == null) {
      return null;
    }

    return (
      <ReactCSSTransitionGroup
        transitionName={{
          appear: "message-appear",
          appearActive: "message-appear-active"
        }}
        transitionAppearTimeout={1000}
        transitionAppear={true}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div className="message">
          <p className="message-content"> {message} </p>
          <button
            className="message-delete"
            style={{ backgroundImage: "url(delete.png)" }}
            onClick={clearMessage}
          />
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default connect(
  state => ({
    message: messageSelector(state)
  }),
  { clearMessage }
)(Message);
