import React from "react";
import SocialLoginButton from "react-social-login-buttons/lib/buttons/SocialLoginButton";

const ReturnHome = props => {
  const customProps = {
    style: {
      background: "#e03c3c",
      color: "white",
      width: "80%",
      margin: "10px auto",
      marginBottom: "20px",
      position:"relative",
      top:"250px"
    },
    activeStyle: {
      background: "#962727"
    }
  };

  return (
    <SocialLoginButton
      {...{ ...customProps, ...props }}
      onClick={() => window.location.replace("/")}
    >
      <span style={{ verticalAlign: "middle", marginLeft: -30 }}>
        Return to Home
      </span>
    </SocialLoginButton>
  );
};

export default ReturnHome;
