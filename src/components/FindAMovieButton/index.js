import React from "react";
import SocialLoginButton from "react-social-login-buttons/lib/buttons/SocialLoginButton";
import Reel from "./reel.svg.js";

const FindAMovieButton = props => {
  const customProps = {
    style: {
      background: "#F94548",
      color: "white",
      width: "80%",
      margin: "30px auto",
      marginBottom: "20px"
    },
    activeStyle: {
      background: "#BE3438"
    }
  };

  return (
    <SocialLoginButton
      {...{ ...customProps, ...props }}
      onClick={() => {
        props.history.replace("/movies");
      }}
    >
      <img
        style={{
          verticalAlign: "middle",
          height: 26,
          paddingRight: 0,
          paddingTop: 10,
          paddingLeft: 6,
          float: "left",
          height: "60%"
        }}
        src="reel.svg"
      />
      <span
        style={{
          verticalAlign: "middle",
          marginLeft: -40,
          fontFamily: "Ubuntu, sans-serif"
        }}
      >
        Find A Movie
      </span>
    </SocialLoginButton>
  );
};

export default FindAMovieButton;
