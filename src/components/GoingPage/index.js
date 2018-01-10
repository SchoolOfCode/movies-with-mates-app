import React, { Component } from "react";
import localStorage from "localStorage";
import { Link } from "react-router-dom";

import AppBar from "../AppBar";
import NavBar from "../NavBar";
import Ticket from "../Ticket";
import BackButton from "../BackButton";

const dateStamp = mongooseTimestamp =>
  `${mongooseTimestamp.slice(0, mongooseTimestamp.indexOf("T"))}`;

class GoingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      going: []
    };
  }
  componentDidMount() {
    fetch(`/api/movies?user=${localStorage.getItem("userId")}`)
      .then(res => res.json())
      .then(data => this.setState({ going: [...data.going] }))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div style={{ paddingTop: "20%", paddingBottom: "20%" }}>
        <AppBar title="Going" />
        <h2>Films you're planning on seeing...</h2>
        <div id="bigDiv">
          {this.state.going.map((film, idx) => (
            <Link
              to={{
                pathname: `/movies/${film._id}`,
                state: { prevPath: this.props.location.pathname }
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
        <NavBar history={this.props.history} />
      </div>
    );
  }
}

export default GoingPage;
