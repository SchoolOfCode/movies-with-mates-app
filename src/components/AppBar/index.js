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
      <h3 style={{ width: "65vw",
        height: "4vh",
        margin: "0 auto",
        color: "white",
        backgroundColor: "#DD585D",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace:"nowrap" }}>
        {props.title}
      </h3>
    </div>
  );
};
export default AppBar;
