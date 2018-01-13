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
      alt="user"
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
          textAlign: "center",
          textDecoration: "none"
        }}
        id="name"
      >
        {props.user.name}
      </p>
    </div>
    <div
      id="info"
      style={{ top: "30px", left: "37%", fontSize: "1.32em", width: "51vw" }}
    >
      <div style={{ position: "relative", height: "4.5vh", top: 0 }}>
        <LocationIcon
          style={{
            position: "relative",
            color: "white",
            top: "7px",
            height: "22px",
            padding: "2px"
          }}
        />
        <p
          style={{
            position: "relative",
            display: "inline-block",
            margin: "0",
            width: "80%",
            top: "0",
            height: "50%",
            verticalAlign: "text-bottom"
          }}
        >
          {props.cinema}
        </p>
      </div>
      <div style={{ position: "relative", height: "4.5vh" }}>
        <MovieIcon
          style={{
            position: "relative",
            top: "7px",
            color: "white",
            height: "22px",
            padding: "2px"
          }}
        />
        <div
          style={{
            position: "relative",
            display: "inline-block",
            top: "3px",
            margin: "0",
            width: "80%",
            height: "60%",
            verticalAlign: "text-bottom",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {props.movie}
        </div>
      </div>
      <div style={{ position: "relative", height: "4.5vh" }}>
        <DateIcon
          style={{
            position: "relative",
            top: "7px",
            color: "white",
            height: "22px",
            padding: "2px"
          }}
        />
        <p
          style={{
            position: "relative",
            display: "inline-block",
            margin: "0",
            width: "80%",
            height: "50%",
            verticalAlign: "text-bottom"
          }}
        >
          {props.date}
        </p>
      </div>
      <div style={{ position: "relative", height: "4.5vh" }}>
        <ClockIcon
          style={{
            position: "relative",
            top: "7px",
            color: "white",
            height: "22px",
            padding: "2px"
          }}
        />
        <p
          style={{
            position: "relative",
            display: "inline-block",
            margin: "0",
            width: "80%",
            height: "50%",
            verticalAlign: "text-bottom"
          }}
        >
          {props.time}
        </p>
      </div>
    </div>
  </div>
);

export default Ticket;
