import React, { Component } from "react";
import localStorage from "localStorage";
import { Link } from "react-router-dom";

import AppBar from "../AppBar";
import NavBar from "../NavBar";
import Ticket from "../Ticket";
import BackButton from "../BackButton";
import Return from "../ReturnHome";


const dateStamp = mongooseTimestamp =>
  `${mongooseTimestamp.slice(0, mongooseTimestamp.indexOf("T"))}`;

class GoingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      going: [],
      error: false
    };
  }
  componentDidMount() {
    fetch(`/api/movies?user=${localStorage.getItem("userId")}`)
      .then(res => res.json())
      .then(data => this.setState({ going: [...data.going] }))
      .catch(err => this.setState({error: true}));
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{position: "fixed", backgroundColor: "white", zIndex: "1000", height: "100vh", width: "100vw"}}>
          <h2 style={{ margin: 0, fontFamily:"Ubuntu", position:"relative", top:"175px" }}>Aw, shucks.</h2>
          <h2 style={{ margin: 0, fontFamily:"Ubuntu", position:"relative", top:"175px" }}>We're experiencing some technical difficulties</h2>
          <h1 style={{ margin: 0, fontFamily:"Ubuntu", position:"relative", top:"175px", fontSize: "10em", marginTop:"10vh"}}> :( </h1>
          <Return />
        </div>
      )
    }
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
