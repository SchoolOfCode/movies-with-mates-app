import React, { Component } from "react";
import { Link } from "react-router-dom";
import localStorage from "localStorage";
import ClockIcon from "material-ui/svg-icons/device/access-time";

import Ticket from "../Ticket";
import AppBar from "../AppBar";
import NavBar from "../NavBar";

const dateStamp = mongooseTimestamp =>
  `${mongooseTimestamp.slice(0, mongooseTimestamp.indexOf("T"))}`;

const timeStamp = mongooseTimestamp =>
  `${mongooseTimestamp.slice(
    0,
    mongooseTimestamp.indexOf("T")
  )} ${mongooseTimestamp.slice(
    mongooseTimestamp.indexOf("T") + 1,
    mongooseTimestamp.lastIndexOf(":")
  )}`;

class ActivityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theirs: [],
      going: []
    };
  }

  componentDidMount() {
    fetch(`/api/movies/thing/${localStorage.getItem("userId")}`)
      .then(res => res.json())
      .then(data => {
        console.log("DATA FROM FETCH", data);

        let theirs = data.comments.filter(c =>
          data.theirEvents.includes(c.movie)
        );

        console.log("THEIRS ARRAY ", theirs);

        let going = data.comments.filter(c => data.going.includes(c.movie));

        console.log("GOING ARRAY", going);

        this.setState({
          theirs,
          going
        });
      })
      .then(() => console.log(this.state))
      .catch(err => console.log(err));
  }

  render() {
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
          {this.state.going.map(c => {
            return (
              <Link
                to={{
                  pathname: `/movies/${c.movie}`,
                  state: { prevPath: this.props.location.pathname }
                }}
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
          {this.state.theirs.map(c => {
            return (
              <Link
                to={{
                  pathname: `/movies/${c.movie}`,
                  state: { prevPath: this.props.location.pathname }
                }}
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
