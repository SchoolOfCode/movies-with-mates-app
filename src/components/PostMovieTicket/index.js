import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

import ClockIcon from "material-ui/svg-icons/device/access-time";
import LocationIcon from "material-ui/svg-icons/communication/location-on";
import MovieIcon from "material-ui/svg-icons/maps/local-movies";
import DateIcon from "material-ui/svg-icons/action/date-range";

import "./PostTicket.css"

const PostMovieTicket = props => {
  return (
    <div>
      <div id="ticket">
        <p
          style={{
            position: "relative",
            top: 24,
            left: 140,
            color: "white",
            fontSize: "2em",
            lineHeight: 1.5,
            textAlign: "left",
            marginTop: 0
          }}
        >
          <LocationIcon style={{ position:"relative", top:"8px",color:"white", height:"25px", padding:"2px"}} /> {" "}
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
          <MovieIcon style={{  position:"relative", top:"8px",color:"white", height:"25px", padding:"2px"}} />  {" "}
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
          <DateIcon style={{  position:"relative", top:"8px",color:"white", height:"25px", padding:"2px"}} />  {" "}
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
            <ClockIcon style={{  position:"relative", top:"8px",color:"white", height:"25px", padding:"2px"}}/>   {" "}
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
