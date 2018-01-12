import React from "react";
import Ticket from "../Ticket";
import NavBar from "../NavBar";

import TextField from "material-ui/TextField";
import SearchIcon from "material-ui/svg-icons/action/search";
import UpArrowIcon from "material-ui/svg-icons/navigation/subdirectory-arrow-right";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";

import "./Movies.css";

let otherStyle = {
	// lineHeight: "36px",
	// width: "75%",
	// height: "7%",
	// marginTop: 50,
	errorStyle: {
		color: '#F94548'
	},
	underlineStyle: {
		borderColor: '#FFFFFF'
	},
	floatingLabelStyle: {
		color: '#F94548'
	},
	floatingLabelFocusStyle: {
		color: '#FFFFFF'
	},
	hint: {
		color: '#FFFFFF',
		fontSize: '0.9em'
	}
};

const dateStamp = mongooseTimestamp =>
  `${mongooseTimestamp.slice(0, mongooseTimestamp.indexOf("T"))}`;

const Movies = props => {
  console.log("Movie props", props);
  return (
    <div className="pageContainer">
      <div
        className="searchContainer"
        style={{ position: "fixed", height: "10vh", zIndex: 101 }}
      >
        <img
          src="/search.svg"
          style={{
            position: "relative",
            display: "inline",
            height: "4vh",
            marginLeft: "3.5vw",
						top: "-25px"
          }}
        />
        <TextField
					onKeyPress={e => {
						if (e.key === 'Enter') {
							console.log('Enter key pressed');
							props.handleSearch();
						}
					}}
					floatingLabelText="Search for what's on"
					floatingLabelStyle={{color: "white", fontFamily: "Ubuntu, sans-serif", fontSize: '0.9em'}}
					floatingLabelShrinkStyle={{color:"#DD585D"}}
					hintText="e.g. Gone With The Wind"
					onChange={props.textFieldOnChange}
					underlineFocusStyle={otherStyle.underlineStyle}
					underlineStyle={otherStyle.underlineStyle}
					value={props.textFieldValue}
					hintStyle={otherStyle.hint}
					inputStyle={{ color: 'white', fontSize: '0.9em' }}
					style={{ width: '74vw', marginLeft: '2vw', marginRight: '2vw', top: '-25px' }}
				/>
        <img
          onClick={() => props.history.replace("/create")}
          src="/plus-button-white.svg"
          style={{
            position: "relative",
            display: "inline",
            height: "3.5vh",
						top: "-25px"
          }}
        />
      </div>
      <div style={{ height: "8vh" }} />
      <div
        style={{
          overflow: "scroll",
          position: "relative",
          top: "0",
          height: "80vh"
        }}
      >
        <div
					style={{
					position: "relative",
					height: "29vh",
					top: "-3vh",
					paddingTop: "12%",
					backgroundColor: "rgb(252, 252, 252)"
					}}
					className="pageInfo">
          <h3 style={{ marginBottom: "3vh", fontSize: "3.5em" }}>
            Movie Events
          </h3>
					<h3 style={{ fontSize: "2em" }}>
						Click to create your own
					</h3>
					<UpArrowIcon
						style={{
							color: "#F94548",
							position: "relative",
							height: "4vh",
							left: "125px",
							top: "-41px",
							transform: "rotate(-64deg)"
						}}
					/>
          <h3 style={{ position:"relative", top:"-60px", fontSize: "1.5em" }}>
            Or scroll to find a movie that suits you...
          </h3>
        </div>
        <div id="container">
          {props.films &&
            props.films.map((film, idx) => (
              <Link
                to={{
                  pathname: `${props.match.url}/${film._id}`,
                  state: { prevPath: props.location.pathname }
                }}
                style={{ textDecoration: "none" }}
              >
                <Ticket
                  index={idx}
                  cinema={film.cinema}
                  movie={film.movie}
                  time={film.time}
                  date={dateStamp(film.date)}
                  user={film.user}
                />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
