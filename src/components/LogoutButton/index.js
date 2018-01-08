import React from "react";
import SocialLoginButton from "react-social-login-buttons/lib/buttons/SocialLoginButton";
import localStorage from "localStorage";

const LogoutButton = props => {
  const customProps = {
    style: {
      background: "white",
      color: "black",
      width: "40%",
      margin: "20px auto",
      marginBottom: "20px",
      
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
          verticalAlign: "middle",
          height: 26,
          paddingRight: 40,
          paddingTop: 10,
          paddingLeft: 6,
          paddingBottom: 8,
          float: "left",
          height: "70%"
        }}
        src="logout.png"
      />
      <span style={{ verticalAlign: "middle", marginLeft: -40 }}>Logout</span>
    </SocialLoginButton>
  );
};

export default LogoutButton;
