import React from "react";

import Return from "../ReturnHome";

const LoginPage = props => {
  return (
    <div style={{position: "fixed", backgroundColor: "white", zIndex: "1000", height: "100vh", width: "100vw"}}>
      <h2 style={{ margin: 0, fontFamily:"Ubuntu", position:"relative", top:"125px" }}>Aw, shucks.</h2>
      <h2 style={{ margin: 0, fontFamily:"Ubuntu", position:"relative", top:"125px" }}>You're not logged in.</h2>
      <h1 style={{ margin: 0, fontFamily:"Ubuntu", position:"relative", top:"125px", fontSize: "10em", marginTop:"10vh"}}> :( </h1>
      <h4 style={{ margin: 0, fontFamily:"Ubuntu", position:"relative", top:"125px", fontSize: "2em", marginTop:"10vh", marginBottom: "-10vh"}}><span style={{fontStyle: "italic"}}><br/>Let's get outta here</span><br/><br/> - Django Unchained </h4>
      <Return />
    </div>
  );
};

export default LoginPage;
