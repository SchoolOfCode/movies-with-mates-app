import React from "react";
import SocialLoginButton from "react-social-login-buttons/lib/buttons/SocialLoginButton";

const EmailLoginButton = props => {
  const customProps = {
    style: {
      background: "#e03c3c",
      color: "white",
      // width: "80%",
      margin: "10px auto",
      marginBottom: "10px",
      width: "55vw"
    },
    activeStyle: {
      background: "#962727"
    }
  };

  return (
    <SocialLoginButton
      {...{ ...customProps, ...props }}
      onClick={() => window.location.replace("/locallogin")}
    >
      {/* <img
        style={{
          verticalAlign: "middle",
          height: 26,
          paddingRight: 9,
          paddingTop: 15,
          paddingLeft: 6,
          float: "left",
          height: "40%"
        }}
        src="envelope.svg"
      /> */}
      <span style={{ verticalAlign: "middle" }}>
        Login with Email
      </span>
    </SocialLoginButton>
  );
};

export default EmailLoginButton;
