import React, { Component } from "react";
import { Link } from "react-router-dom";
import localStorage from "localStorage";

import Ticket from "../Ticket";
import AppBar from "../AppBar";
import NavBar from "../NavBar";

const dateStamp = mongooseTimestamp =>
  `${mongooseTimestamp.slice(
    0,
    mongooseTimestamp.indexOf("T")
  )}`;


class ActivityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: []
    };
  }

  componentDidMount() {
    fetch(`/api/movies/activity/hack?user=${localStorage.getItem("userId")}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          activity: [...data.films]
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div style={{ paddingBottom: "20%" }}>
        <AppBar url="/profile" title="Activity" />
        <h3 style={{ margin: 0, paddingTop: "20%", paddingBottom: 20, fontSize: "3.5em" }}> Films you're interested in...</h3>
        <div id="container">
          {this.state.activity.map((activity, idx) => (
            <Link
              to={`${this.props.match.url}/${activity.movie}`}
              style={{ textDecoration: "none" }}
            >
              <Ticket
                index={idx}
                cinema={activity.cinema}
                movie={activity.movie}
                time={activity.time}
                date={dateStamp(activity.date)}
                user={activity.user}
              />
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default ActivityPage;
