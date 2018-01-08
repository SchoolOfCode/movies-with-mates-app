import React from "react";

import Return from "../ReturnHome";

const LoginPage = props => {
  return (
    <div>
      <h2 style={{ margin: 0, fontFamily:"Ubuntu", position:"relative", top:"175px" }}>Aw, shucks. You're not logged in.</h2>
      <Return />
    </div>
  );
};

export default LoginPage;
