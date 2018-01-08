import React from "react";
import { FacebookLoginButton } from "react-social-login-buttons";
import { LinkContainer } from "react-router-bootstrap";
import FacebookLogin from "react-facebook-login";
import SocialLoginButton from "react-social-login-buttons/lib/buttons/SocialLoginButton";

import history from "../../index.js";
import "./index.css";

var localStorage = require("localStorage");

const responseFacebook = response => {
  console.log("response", response);
  fetch("/api/fb", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      name: response.name,
      local: {},
      tokens: {
        accessToken: response.accessToken
      },
      fb: {
        fbId: response.id,
        displayName: response.name,
        picture: response.picture.data.url
      }
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log("get back from post request", data);
      let fbAccessToken = data.userAccessToken;
      let fbId = data.fbId;
      let picture = data.picture;
      let userId = data.userId;
      let displayName = data.displayName;
      localStorage.setItem("accessToken", fbAccessToken);
      localStorage.setItem("fbId", fbId);
      localStorage.setItem("picture", picture);
      localStorage.setItem("userId", userId);
      localStorage.setItem("displayName", displayName);
    })
    .then(() => {
      // history.push("/profile");
      window.location.replace("/profile");
    })
    .catch(err => console.log(err));
};

const FBLoginButton = props => (
      <div>
        <FacebookLogin
          appId="192854244610400"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          textButton="Login with Facebook"
          cssClass="fbLoginButton"
        />
      </div>
    );

export default FBLoginButton;
