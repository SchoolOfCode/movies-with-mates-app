import React from "react";

import ClockIcon from "material-ui/svg-icons/device/access-time";
import LocationIcon from "material-ui/svg-icons/communication/location-on";
import MovieIcon from "material-ui/svg-icons/maps/local-movies";
import DateIcon from "material-ui/svg-icons/action/date-range";

import "./Ticket.css";

const Ticket = props => (
  <div id="ticket" style={{ margin: 0 }}>
    <img
      style={{ position: "relative", left: "-30%", top: "6vh" }}
      src={props.user.picture}
      id="img"
    />
    <div
      className="userName"
      style={{
        position: "relative",
        width: "22vw",
        height: "15%",
        top: "28%",
        left: "7%",
        margin: "0"
      }}
    >
      <p
        style={{
          position: "relative",
          top: "0",
          margin: "0 auto",
          textAlign: "center"
        }}
        id="name"
      >
        {props.user.name}
      </p>
    </div>
    <p
      id="info"
      style={{
        bottom: "25px",
        top: "3px",
        left: "37%",
        fontSize: "1.32em",
        width: "51vw"
      }}
    >
      <br />
      <LocationIcon
        style={{
          position: "relative",
          top: "8px",
          color: "white",
          height: "30px",
          padding: "2px",
          paddingTop: "5px"
        }}
      />{" "}
      {props.cinema}
      <br />
      <MovieIcon
        style={{
          position: "relative",
          top: "8px",
          color: "white",
          height: "22px",
          padding: "2px"
        }}
      />{" "}
      {props.movie} <br />
      <DateIcon
        style={{
          position: "relative",
          top: "8px",
          color: "white",
          height: "22px",
          padding: "2px"
        }}
      />{" "}
      {props.date}
      <br />
      <ClockIcon
        style={{
          position: "relative",
          top: "8px",
          color: "white",
          height: "22px",
          padding: "2px"
        }}
      />{" "}
      {props.time}
      <br />
    </p>
  </div>
);

export default Ticket;
