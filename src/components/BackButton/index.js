import React, { Component } from "react";

class BackButton extends Component {
  render() {
    return (<img onClick={() => this.props.history.replace("/movies")} style={this.props.style} src={"/back-button-white.svg"}/>)
  }
}
export default BackButton;
