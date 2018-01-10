import React, { Component } from "react";
import { Link } from "react-router-dom";
import localStorage from "localStorage";

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
          theirs: [...theirs.slice(0, 3)],
          going: [...going.slice(0, 3)]
        });
      })
      .then(() => console.log(this.state))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <AppBar title="Activity Feed" />
        <div style={{ paddingBottom: "20%" }} />
        {this.state.going.map(c => {
          return (
            <Link
              to={{
                pathname: `/movies/${c.movie}`,
                state: { prevPath: this.props.location.pathname }
              }}
            >
              <div>
                <img src={c.picture} />
                {c.displayName} commented on a film you're going to
                {timeStamp(c.createdAt)}
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
              <div>
                <img src={c.picture} />
                {c.displayName} commented on a film you posted
                {timeStamp(c.createdAt)}
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default ActivityPage;
