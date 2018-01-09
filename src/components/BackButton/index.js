import React, { Component } from "react";
import { Link } from "react-router-dom";

class BackButton extends Component {
  render() {
    return (<Link to={"/movies"}> <img style={this.props.style} src={"/back-button-white.svg"}/> </Link>)
  }
}
export default BackButton;
