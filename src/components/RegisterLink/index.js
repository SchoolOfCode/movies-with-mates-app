import React from "react";
import { Link } from "react-router-dom";

const RegisterLink = props => {
  return (
    <div>
      <Link to="/register" style={{ position: "relative", left: "17%",color: "#fefefe", fontStyle: "italic", fontSize: "80%" }}>
        Not signed up?
      </Link>
    </div>
  );
};

export default RegisterLink;
