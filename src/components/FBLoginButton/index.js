import React from "react";
import FacebookLogin from "react-facebook-login";

import "./index.css";

var localStorage = require("localStorage");

const responseFacebook = response => {
  fetch("/api/fb", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      name: response.name,
      local: {email: response.email},
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
      let { fbAccessToken, fbId, picture, userId, displayName, email } = data;
      localStorage.setItem("accessToken", fbAccessToken);
      localStorage.setItem("fbId", fbId);
      localStorage.setItem("picture", picture);
      localStorage.setItem("userId", userId);
      localStorage.setItem("displayName", displayName);
      localStorage.setItem("email", email);
    })
    .then(() => {
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
