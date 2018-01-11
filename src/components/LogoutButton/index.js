import React from "react";
import SocialLoginButton from "react-social-login-buttons/lib/buttons/SocialLoginButton";
import localStorage from "localStorage";

const LogoutButton = props => {
  const customProps = {
    style: {
      background: "white",
      color: "black",
      margin: "10px auto",
      marginBottom: "10px",
      width: "55vw"

    },
    activeStyle: {
      background: "white"
    }
  };

  return (
    <SocialLoginButton
      {...{ ...customProps, ...props }}
      onClick={() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("fbId");
        localStorage.removeItem("localToken");
        localStorage.removeItem("email");
        localStorage.removeItem("picture");
        localStorage.removeItem("displayName");
        localStorage.removeItem("userId");
        props.history.push("/");
      }}
    >
      <img
        style={{
          position: "relative",
          verticalAlign: "middle",
          height: "3.5vh",
          left: "80px"
        }}
        src="logout.png"
      />
      <span style={{
        position: "relative",
        display: "inline-block",
        fontFamily: "Ubuntu, sans-serif",
        fontSize: "1.2em",
        left: "-74px"
      }}>
        Logout
      </span>
    </SocialLoginButton>
  );
};

export default LogoutButton;
