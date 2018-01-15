import React from "react";
import {Link} from "react-router-dom";

const BackButton = (props) => {
  if (props.history.location.pathname === "/create") {
    return (<img style={props.style} onClick={props.handleClick} src={"/back-button-white.svg"}/>)
  }
  let previousPath = props.history.location.state.prevPath;
  return (
    <Link to={previousPath}>
      {" "}
      <img style={props.style} src={"/back-button-white.svg"}/>{" "}
    </Link>
  );
}

export default BackButton;
