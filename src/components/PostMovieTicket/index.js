import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Clock from "../Clock";
import Location from "../Location";
import MovieLogo from "../MovieLogo";
import Calendar from "../Calendar";

import "./PostTicket.css"

const PostMovieTicket = props => {
  return (
    <div>
      <div id="ticket">
        <p
          style={{
            position: "relative",
            top: 30,
            left: 140,
            color: "white",
            fontSize: "2em",
            lineHeight: 1.5,
            textAlign: "left",
            marginTop: 0
          }}
        >
          <Location style={{ height:"25px"}} /> :{" "}
          <TextField
            id="information"
            name="cinema"
            onChange={e => props.handleChange(e.target.value, "cinema")}
            value={props.selectedFilm.cinema}
            inputStyle={{color:"white"}}
            style={{ left: "2%", width:"30vw", height: "4vh"}}
            underlineShow={false}
          />
          <br />
          <MovieLogo style={{ height:"25px"}} />  :{" "}
          <TextField
            id="information"
            name="movie"
            onChange={e => props.handleChange(e.target.value, "movie")}
            value={props.selectedFilm.movie}
            inputStyle={{color:"white"}}
            style={{ left: "2%", width:"30vw", height: "4vh"}}
            underlineShow={false}
          />
          <br />
          <Calendar style={{ height:"25px"}} />  :{" "}
          <TextField
            id="information"
            name="date"
            onChange={e => props.handleChange(e.target.value, "date")}
            value={props.selectedFilm.date}
            inputStyle={{color:"white"}}
            style={{ left: "2%", width:"30vw", height: "4vh"}}
            underlineShow={false}
          />
          <br />
            <Clock style={{ height:"25px"}}/>   :{" "}
          <TextField
            id="information"
            name="time"
            onChange={e => props.handleChange(e.target.value, "time")}
            value={props.selectedFilm.time}
            inputStyle={{color:"white"}}
            style={{ left: "2%", width:"30vw", height: "4vh"}}
            underlineShow={false}
          />
          <br />
        </p>
      </div>
      <RaisedButton
        style={{ marginBottom: "5vh" }}
        backgroundColor={"#F94548"}
        labelColor={"white"}
        label="Create Event"
        onClick={props.handleSubmit}
      />
    </div>
  );
};

export default PostMovieTicket;
