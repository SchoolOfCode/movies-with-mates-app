import React from "react";

import Return from "../ReturnHome";

const LoginPage = props => {
  return (
    <div style={{position: "fixed", backgroundColor: "white", zIndex: "1000", height: "100vh", width: "100vw"}}>
      <h2 style={{ margin: 0, fontFamily:"Ubuntu", position:"relative", top:"175px" }}>Aw, shucks.</h2>
      <h2 style={{ margin: 0, fontFamily:"Ubuntu", position:"relative", top:"175px" }}>You're not logged in.</h2>
      <h1 style={{ margin: 0, fontFamily:"Ubuntu", position:"relative", top:"175px", fontSize: "10em", marginTop:"10vh"}}> :( </h1>
      <Return />
    </div>
  );
};

export default LoginPage;
