import React from "react";

import Logo from "../Logo";
import TagLine from "../TagLine";
import FBLoginButton from "../FBLoginButton";
import LoginEmailButton from "../LoginEmailButton";
import RegisterLink from "../RegisterLink";

import "./LandingPage.css";

const LandingPage = props => {
  return (
    <div style={{width: "100vw", backgroundColor:"black"}}>
      <img className="background" src={"/cinema-room.jpg"}/>
      <div className="mwmLogo">
        <img
          src={"/ticket-v5.svg"}
          style={{position: "relative", top: "13vh", left:"23%",height: "50%", width: "50%", transform:"rotate(-45deg)"}}
        />
        <img
          src={"/ticket-v6.svg"}
          style={{position: "relative", top: "18vh", left:"-23%", height: "50%", width: "50%"}}
        />
      </div>
      <div className="tagLine">
        <TagLine style={{ fontFamily: "Roboto"}} />
      </div>
      <div className="loginButtons">
        <FBLoginButton history={props.history} />
        <LoginEmailButton />
        <RegisterLink />
      </div>
    </div>
  );
};

export default LandingPage;
