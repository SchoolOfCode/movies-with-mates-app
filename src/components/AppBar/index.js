import React from "react";

const AppBar = props => {
  return (
    <div
      style={{
        height: "8vh",
        backgroundColor: "#DD585D",
        position: "fixed",
        top: 0,
        width: "100vw",
        marginBottom: 50,
        zIndex: 100
      }}
    >
      <br />
      <h3 style={{ width: "75vw", height: "4vh", margin: "0 auto", color: "white", overflow: "auto" }}>{props.title}</h3>
      {/* <img
        onClick={() => window.location.replace("/profile")}
        src="/profile.svg"
        style={{
          width: "8%",
          height: "4%",
          position: "absolute",
          right: "2%",
          top: "2%"
        }}
      /> */}
    </div>
  );
};
export default AppBar;
