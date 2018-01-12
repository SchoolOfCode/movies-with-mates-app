import React from "react";

import Logo from "../Logo";
import TagLine from "../TagLine";
import FBLoginButton from "../FBLoginButton";
import LoginEmailButton from "../LoginEmailButton";
import RegisterLink from "../RegisterLink";

import "./LandingPage.css";

const LandingPage = props => {

  return (
    <div>
      <div className="landingAnimation" style={{ position: "absolute", height: "100vh", width: "100vw", backgroundColor:"white", zIndex:"30"}}>
        <div style={{position: "relative", top: "25vh"}}>
          <img
            src={"/ticket-v5.svg"}
            style={{zIndex: "10", position: "relative", top: "13vh", left:"23%",height: "50%", width: "50%", transform:"rotate(-45deg)"}}
          />
          <img
            src={"/ticket-v6.svg"}
            style={{zIndex:"20", position: "relative", top: "18vh", left:"-23%", height: "50%", width: "50%"}}
          />
          <p style= {{color: "white", position: "absolute", top: "129px", left: "112px", fontSize: "5.75em", zIndex:"25"}}>M W M</p>
          <div style={{position: "relative", top: "20vh"}}>
            <h2 style={{position: "relative", top: "1vh", left: "8px", fontSize: "2em", margin:"0 auto", width: "50vw"}}>Movies With Mates</h2>
          </div>
        </div>
      </div>
      <div style={{width: "100vw", backgroundColor:"black"}}>
        <img className="background" src={"/cinema-room.jpg"}/>
        <div className="mwmLogo">
          <img
            src={"/ticket-v5.svg"}
            style={{zIndex: "10", position: "relative", top: "13vh", left:"23%",height: "50%", width: "50%", transform:"rotate(-45deg)"}}
          />
          <img
            src={"/ticket-v6.svg"}
            style={{zIndex:"20", position: "relative", top: "18vh", left:"-23%", height: "50%", width: "50%"}}
          />
        </div>
        <div>
          <p style= {{color: "white", position: "absolute", top: "129px", left: "112px", fontSize: "5.75em", zIndex:"25"}}>M W M</p>
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
    </div>
  );
};

export default LandingPage;
