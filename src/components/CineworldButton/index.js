import React from "react";
import SocialLoginButton from "react-social-login-buttons/lib/buttons/SocialLoginButton";

const CineworldButton = props => {
  const customProps = {
    style: {
      fontSize:"1.2em",
      fontFamily:"Ubuntu, sans-serif",
      background: "#e03c3c",
      color: "white",
      width: "35%",
      // marginBottom: "20px",
      // marginTop: 40,
      position: "relative",
      // top: -110
    },
    activeStyle: {
      background: "#962727"
    }
  };

  return (
    <SocialLoginButton
      {...{ ...customProps, ...props }}
      onClick={props.onClick}
    >
      <span style={{ verticalAlign: "middle"}}>
        Cineworld listings
      </span>
    </SocialLoginButton>
  );
};

export default CineworldButton;
