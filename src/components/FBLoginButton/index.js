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
<<<<<<< HEAD
      local: {
        email: response.email
      },
=======
      local: {email: response.email},
>>>>>>> b60183a5903c631cddf4fe69870fd5447e88bee1
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
<<<<<<< HEAD
      console.log("get back from post request", data);
      let fbAccessToken = data.userAccessToken;
      let fbId = data.fbId;
      let picture = data.picture;
      let userId = data.userId;
      let displayName = data.displayName;
      let email = data.email;
=======
      let { fbAccessToken, fbId, picture, userId, displayName, email } = data;
>>>>>>> b60183a5903c631cddf4fe69870fd5447e88bee1
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
