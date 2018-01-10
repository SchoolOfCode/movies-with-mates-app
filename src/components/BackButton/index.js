import React, { Component } from "react";
import { Link } from "react-router-dom";

class BackButton extends Component {
  render() {
    console.log("BACK BUTTON PROPS", this.props);
    let previousPath = this.props.history.location.state.prevPath;
    return (
      <Link to={previousPath}>
        {" "}
        <img style={this.props.style} src={"/back-button-white.svg"} />{" "}
      </Link>
    );
  }
}
export default BackButton;
