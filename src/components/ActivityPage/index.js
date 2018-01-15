import React, { Component } from "react";
import localStorage from "localStorage";

import { Link } from "react-router-dom";
import ClockIcon from "material-ui/svg-icons/device/access-time";

import Ticket from "../Ticket";
import AppBar from "../AppBar";
import NavBar from "../NavBar";
import Return from "../ReturnHome";

const dateStamp = require("../../tests/frontEndFunctions").dateStamp;
const timeStamp = require("../../tests/frontEndFunctions").timeStamp;

class ActivityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theirs: [],
      going: [],
      error: false
    };
  }

  componentDidMount() {
    fetch(`/api/movies/thing/${localStorage.getItem("userId")}`)
      .then(res => res.json())
      .then(data => {
        let theirs = data.comments.filter(c =>
          data.theirEvents.includes(c.movie)
        );
        let going = data.comments.filter(c => data.going.includes(c.movie));
        this.setState({
          theirs,
          going
        });
      })
      .then(() => console.log(this.state))
      .catch(err => this.setState({error: true}));
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{position: "fixed", backgroundColor: "white", zIndex: "1000", height: "100vh", width: "100vw"}}>
        <h2 style={{ margin: 0, fontFamily:"Ubuntu", position:"relative", top:"125px" }}>Aw, shucks.</h2>
        <h2 style={{ margin: 0, fontFamily:"Ubuntu", position:"relative", top:"125px" }}>We're experiencing some technical difficulties</h2>
        <h1 style={{ margin: 0, fontFamily:"Ubuntu", position:"relative", top:"125px", fontSize: "10em", marginTop:"10vh"}}> :( </h1>
        <h4 style={{ margin: 0, fontFamily:"Ubuntu", position:"relative", top:"175px", fontSize: "2em", marginTop:"10vh"}}><span style={{fontStyle: "italic"}}>"I'll be back"</span> - The Terminator</h4>
        <Return />
        </div>
      )
    }
    return (
      <div style={{ overflow: "hidden" }}>
        <AppBar title="Activity Feed" />
        <div
          className="postMovieSummary"
          style={{
            position: "relative",
            height: "32vh",
            top: "-2vh",
            paddingTop: "7%",
            backgroundColor: "rgb(252, 252, 252)"
          }}
        >
          <h1 style={{ position: "relative", top: "15vw", fontSize: "3.5em" }}>
            {" "}
            Your Notifications{" "}
          </h1>
          <h5 style={{ position: "relative", top: "15vw" }}>
            {" "}
            Click on a notification below to be redirected{" "}
          </h5>
        </div>
        <div
          style={{
            overflow: "scroll",
            minHeight: "50vh",
            padding: 0,
            marginRight: -20
          }}
        >
          {this.state.going.map((c, i) => {
            return (
              <Link
                to={{
                  pathname: `/movies/${c.movie}`,
                  state: { prevPath: this.props.location.pathname }
                }}
                key={i}
              >
                <div style={{ marginBottom: "3%", width: "100vw" }}>
                  <div style={{ position: "relative", width: "85%" }}>
                    <img
                      src={c.picture}
                      style={{
                        height: "40px",
                        width: "40px",
                        borderRadius: "50%"
                      }}
                    />
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                        width: "60vw",
                        top: "16px",
                        left: "20px"
                      }}
                    >
                      <p
                        style={{
                          marginLeft: "5px",
                          left: "20vw",
                          width: "70vw",
                          color: "black",
                          fontSize: "1.1em",
                          textAlign: "left",
                          overflow: "auto"
                        }}
                      >
                        {c.displayName === localStorage.getItem("displayName")
                          ? "You commented on a movie."
                          : `${
                              c.displayName
                            } commented on a film you're going to`}{" "}
                      </p>
                      <div
                        style={{
                          position: "relative",
                          width: "30vw",
                          top: "-5px"
                        }}
                      >
                        <ClockIcon
                          style={{
                            position: "relative",
                            display: "inline",
                            height: "10px",
                            width: "10px",
                            top: "2px",
                            left: "-5px",
                            color: "#C1C1C1"
                          }}
                        />
                        <p
                          style={{
                            position: "relative",
                            display: "inline",
                            textAlign: "left",
                            width: "26vw",
                            color: "#C1C1C1"
                          }}
                        >
                          {" "}
                          {timeStamp(c.createdAt)}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
          {this.state.theirs.map((c,i) => {
            return (
              <Link
                to={{
                  pathname: `/movies/${c.movie}`,
                  state: { prevPath: this.props.location.pathname }
                }}
                key={i}
              >
                <div style={{ marginBottom: "3%", width: "100vw" }}>
                  <div style={{ position: "relative", width: "85%" }}>
                    <img
                      src={c.picture}
                      style={{
                        height: "40px",
                        width: "40px",
                        borderRadius: "50%"
                      }}
                    />
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                        width: "60vw",
                        top: "16px",
                        left: "20px"
                      }}
                    >
                      <p
                        style={{
                          marginLeft: "5px",
                          left: "20vw",
                          width: "80vw",
                          color: "black",
                          fontSize: "1.1em",
                          textAlign: "left"
                        }}
                      >
                        {c.displayName === localStorage.getItem("displayName")
                          ? "You commented on a movie."
                          : `${
                              c.displayName
                            } commented on a film you're going to`}{" "}
                      </p>
                      <div
                        style={{
                          position: "relative",
                          width: "30vw",
                          top: "-5px"
                        }}
                      >
                        <ClockIcon
                          style={{
                            position: "relative",
                            display: "inline",
                            height: "10px",
                            width: "10px",
                            top: "2px",
                            left: "-5px",
                            color: "#C1C1C1"
                          }}
                        />
                        <p
                          style={{
                            position: "relative",
                            display: "inline",
                            textAlign: "left",
                            width: "26vw",
                            color: "#C1C1C1"
                          }}
                        >
                          {" "}
                          {timeStamp(c.createdAt)}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ActivityPage;
