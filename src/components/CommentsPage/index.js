import React, { Component } from "react";
import PropTypes from "prop-types";
import Ticket from "../Ticket";
import AppBar from "../AppBar";
import AddComment from "../AddComment";
import ShowComment from "../ShowComment";
import BackButton from "../BackButton";
import LoginPage from "../LoginPage";

const tokenChecker = () => {
  return localStorage.getItem("localToken") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("email")
    ? true
    : false;
};

const timeStamp = mongooseTimestamp =>
  `${mongooseTimestamp.slice(
    0,
    mongooseTimestamp.indexOf("T")
  )} ${mongooseTimestamp.slice(
    mongooseTimestamp.indexOf("T") + 1,
    mongooseTimestamp.lastIndexOf(":")
  )}`;

const dateStamp = mongooseTimestamp =>
  `${mongooseTimestamp.slice(0, mongooseTimestamp.indexOf("T"))}`;

// const saveUserActivity = (array, movieID) => {
//   console.log("array: ", array);
//   console.log("stringified movieID: ", JSON.stringify(movieID));
//   switch (array) {
//     case null:
//       console.log("null case");
//       localStorage.setItem("userActivity", JSON.stringify([movieID]));
//       break;
//     default:
//       console.log("in default");
//       JSON.parse(array).includes(JSON.stringify(movieID))
//         ? console.log("this movie is already saved in userActivity")
//         : localStorage.setItem(
//             "userActivity",
//             JSON.stringify([...JSON.parse(array), movieID])
//           );
//   }
// };

class CommentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // film: {
      //   cinema: "",
      //   movie: "",
      //   date: "",
      //   time: "",
      //   user: {}
      // },
      comment: "",
      comments: [],
      fb: false,
      picture: "/user.svg",
      attendees: [],
      needsToLogIn: false
    };
    this.getComments = this.getComments.bind(this);
    this.addAComment = this.addAComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loggedInWithFB = this.loggedInWithFB.bind(this);
    this.handleAttending = this.handleAttending.bind(this);
    this.handleNotAttending = this.handleNotAttending.bind(this);
    this.getAttendees = this.getAttendees.bind(this);
    this.getIntervals = this.getIntervals.bind(this);
  }

  componentDidMount() {
    this.getComments();
    this.getAttendees();
    tokenChecker() ? this.getIntervals() : this.getLogInPage();
  }

  getIntervals() {
    this.interval1 = setInterval(() => this.getComments(), 1000);
    this.interval2 = setInterval(() => this.getAttendees(), 1000);
  }

  getLogInPage() {
    this.setState({ needsToLogIn: true });
  }

  componentWillUnmount() {
    clearInterval(this.interval1);
    clearInterval(this.interval2);
  }

  getComments() {
    fetch(`/api/movies/${this.props.film._id}/comments`)
      .then(res => res.json())
      .then(data => {
        console.log("comments fetch", data);
        this.setState(prevState => ({
          comments: [...data.payload]
        }));
        console.log("COMMENTS state: ", this.state);
      });
  }

  addAComment(e) {
    e.preventDefault();
    fetch(`/api/movies/${this.props.film._id}/comments`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        user: localStorage.getItem("userId"),
        picture: localStorage.getItem("picture"),
        displayName: localStorage.getItem("displayName"),
        movie: this.props.film._id,
        comment: this.state.comment
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("data from addAComment", data);
        let newComment = data.comment;
        let picture = data.picture;
        this.setState(prevState => ({
          comment: "",
          comments: [...prevState.comments, newComment],
          picture
        }));
      })
      .catch(err => console.log(err));
  }

  handleChange(e) {
    const target = e.target,
      value = target.value,
      name = target.name;
    this.setState({
      [name]: value
    });
  }

  loggedInWithFB() {
    return localStorage.getItem("fbId") ? true : false;
  }

  handleAttending() {
    fetch(`/api/movies/${this.props.film._id}/join`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        user: localStorage.getItem("userId")
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .then(() => this.getAttendees());
  }
  handleNotAttending() {
    fetch(`/api/movies/${this.props.film._id}/join`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "DELETE",
      body: JSON.stringify({
        user: localStorage.getItem("userId")
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .then(() => this.getAttendees());
  }

  getAttendees() {
    fetch(`/api/movies/${this.props.film._id}/join`)
      .then(res => res.json())
      .then(data => {
        console.log("attendees", data);
        data.attendees && this.setState({ attendees: data.attendees });
      });
  }

  render() {
    console.log("COMMENTS PAGE PROPS", this.props);
    if (this.state.needsToLogIn) {
      return <LoginPage />;
    }
    return this.props.film ? (
      <div style={{ paddingTop: "18%" }}>
        <BackButton
          style={{
            height: "25px",
            width: "25px",
            position: "absolute",
            top: "15px",
            left: "20px",
            zIndex: "101"
          }}
          url="/movies"
          history={this.props.history}
        />
        <AppBar url="/movies" title={this.props.film.movie} />
        <br />
        <Ticket
          cinema={this.props.film.cinema}
          movie={this.props.film.movie}
          time={this.props.film.time}
          date={dateStamp(this.props.film.date)}
          user={this.props.film.user}
        />
        <div
          className="attending"
          style={{
            height: "12vh",
            borderBottom: "1px solid #D3D3D3",
            marginBottom: "3vh"
          }}
        >
          <h4 style={{ position: "relative", display: "inline", left: "-15%" }}>
            Attendees ({this.state.attendees.length})
          </h4>
          <div
            className="attendButtons"
            style={{ position: "relative", display: "inline" }}
          >
            <h4
              style={{
                position: "relative",
                display: "inline",
                left: "12%",
                bottom: 0
              }}
            >
              {" "}
              Going?{" "}
            </h4>
            <i
              style={{
                color: "red",
                position: "relative",
                display: "inline",
                left: "22%",
                top: "3px"
              }}
              class="fa fa-times fa-2x"
              onClick={this.handleNotAttending}
              aria-hidden="true"
            />
            <i
              style={{
                color: "green",
                position: "relative",
                display: "inline",
                left: "11%",
                top: "3px"
              }}
              onClick={this.handleAttending}
              class="fa fa-check fa-2x"
              aria-hidden="true"
            />
          </div>
          <br />
          <div
            className="attendingUsers"
            style={{
              position: "relative",
              left: "4%",
              width: "40%",
              height: "6vh",
              overflow: "auto"
            }}
          >
            {this.state.attendees.map((user, idx) => (
              <img
                src={user.fb.picture}
                style={{
                  borderRadius: "100%",
                  height: "5vh",
                  position: "relative",
                  // display: "inline",
                  marginRight: "2%"
                  // left: "-38%"
                }}
                key={idx}
              />
            ))}
          </div>
          <br />
        </div>
        <AddComment
          addAComment={this.addAComment}
          handleChange={this.handleChange}
          picture={this.state.picture}
          comment={this.state.comment}
        />
        {this.props.film._id && (
          <ShowComment
            // getComments={this.getComments}
            comments={this.state.comments}
            picture={this.state.picture}
            timestamp={timeStamp}
          />
        )}
      </div>
    ) : (
      <div>nope</div>
    );
  }
}

export default CommentsPage;
