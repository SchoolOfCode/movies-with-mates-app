import React from "react";
import SocialLoginButton from "react-social-login-buttons/lib/buttons/SocialLoginButton";

const ActivityButton = props => {
  const customProps = {
    style: {
      background: "#F94548",
      color: "white",
      width: "80%",
      margin: "10px auto",
      marginBottom: "20px"
    },
    activeStyle: {
      background: "#BE3438"
    }
  };

  return (
    <SocialLoginButton
      {...{ ...customProps, ...props }}
      onClick={() => props.history.replace("/activity")}
    >
      <img
        style={{
          verticalAlign: "middle",
          height: 26,
          paddingRight: 9,
          paddingTop: 15,
          paddingLeft: 6,
          float: "left",
          height: "80%"
        }}
        src="chat-icon.svg"
      />
      <span
        style={{
          verticalAlign: "middle",
          marginLeft: -30,
          fontFamily: "Ubuntu, sans-serif"
        }}
      >
        View your activity
      </span>
    </SocialLoginButton>
  );
};

export default ActivityButton;
