import React, { Component } from "react";

import AppBar from "../AppBar";
import OdeonButton from "../OdeonButton";
import CineworldButton from "../CineworldButton";
import CineworldListings from "../CineworldListings";
import OdeonListings from "../OdeonListings";
import Listings from "../Listings";
import PostMovieTicket from "../PostMovieTicket";
import TodayTomorrowContainer from "../TodayTomorrowContainer";
import NavBar from "../NavBar";
import BackButton from "../BackButton";

const getDateDB = require("../../tests/frontEndFunctions").getDateDB;

class PostAMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      odeonClicked: false,
      cineworldClicked: false,
      showTicket: false,
      selectedFilm: {},
      listings: [],
      seeCinemas: false,
      seeListings: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onOdeonClick = this.onOdeonClick.bind(this);
    this.onCineworldClick = this.onCineworldClick.bind(this);
    this.onShowingClick = this.onShowingClick.bind(this);
    this.onTodayClick = this.onTodayClick.bind(this);
    this.onTomorrowClick = this.onTomorrowClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  handleChange(value, type) {
    this.setState((prevState, props) => {
      console.log(value);
      return {
        selectedFilm: {
          ...prevState.selectedFilm,
          [type]: value
        }
      };
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch("/api/movies", {
      headers: {
        "Content-Type": "application/json",
        "email": localStorage.getItem("email")
      },
      method: "POST",
      body: JSON.stringify({
        ...this.state.selectedFilm,
        ...{
          user: {
            picture: localStorage.getItem("picture"),
            name: localStorage.getItem("displayName"),
            id: localStorage.getItem("userId")
          }
        }
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .then(() => this.props.history.replace("/movies"))
      .catch(err => console.log(err));
  }

  onOdeonClick() {
    if (this.state.today) {
      this.setState({
        listings: [...this.props.listings[0][9688]],
        seeListings: true,
        odeonClicked: true,
        cineworldClicked: false
      });
    }
    this.setState({
      listings: [...this.props.listings[1][9688]],
      seeListings: true,
      odeonClicked: true,
      cineworldClicked: false
    });
  }

  onCineworldClick() {
    if (this.state.today) {
      this.setState({
        listings: [...this.props.listings[0][8672]],
        seeListings: true,
        cineworldClicked: true,
        odeonClicked: false
      });
    }
    this.setState({
      listings: [...this.props.listings[1][8672]],
      seeListings: true,
      cineworldClicked: true,
      odeonClicked: false
    });
  }

  onTodayClick() {
    if (this.state.odeonClicked) {
      this.setState({
        listings: this.props.listings[0][9688],
        seeCinemas: true,
        today: true
      });
    }
    if (this.state.cineworldClicked) {
      this.setState({
        listings: this.props.listings[0][8672],
        seeCinemas: true,
        today: true
      });
    } else {
      this.setState({
        listings: this.props.listings[0],
        seeCinemas: true,
        today: true
      });
    }
  }

  onTomorrowClick() {
    if (this.state.odeonClicked) {
      this.setState({
        listings: this.props.listings[1][9688],
        seeCinemas: true,
        today: false
      });
    }
    if (this.state.cineworldClicked) {
      this.setState({
        listings: this.props.listings[1][8672],
        seeCinemas: true,
        today: false
      });
    } else {
      this.setState({
        listings: this.props.listings[1],
        seeCinemas: true,
        today: false
      });
    }
  }

  onShowingClick(index, showing, film) {
    console.log(
      `button ${index} was clicked for the ${showing} showing of ${film}`
    );
    this.setState({
      showTicket: true,
      selectedFilm: {
        cinema: this.state.odeonClicked
          ? "Odeon, New Street"
          : "Cineworld, Broad Street",
        movie: film,
        date: getDateDB(this.state.today),
        time: showing
      }
    });
    localStorage.setItem("odeon", this.state.odeonClicked)
  }
  handleBackClick(){
    console.log("Im clicking");
    this.setState({
      showTicket: false
    })
  }


  render() {
    if(this.state.showTicket){
      return (
        <div style={{ paddingBottom: "2%", paddingTop: "14%" }}>
        <BackButton onClick={this.handleBackClick} style={{
          height: "25px",
          width: "25px",
          position: "absolute",
          top: "15px",
          left: "20px",
          zIndex: "101"
        }}
        history={this.props.history}
        handleClick={this.handleBackClick}/>
          <AppBar title="Post a Movie" url="/movies" />
          <PostMovieTicket
            handleCinemaChange={this.handleCinemaChange}
            handleMovieChange={this.handleMovieChange}
            handleDateChange={this.handleDateChange}
            handleTimeChange={this.handleTimeChange}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            selectedFilm={this.state.selectedFilm}
          />
        </div>
    )

    }
    return (
      <div style={{ paddingBottom: "2%", paddingTop: "14%" }}>
        <AppBar title="Post a Movie" url="/movies" />
        <div
          style={{
            overflow: "scroll",
            position: "relative",
            // top: "2vh",
            height: "82vh"
            // paddingBottom: "8%"
          }}
        >
          <div className="postMovieSummary"
            style={{
              position: "relative",
              height: "32vh",
              top: "-2vh",
              paddingTop: "12%",
              paddingBottom: "12%",
              backgroundColor: "rgb(252, 252, 252)"
            }}>
              <h1 style={{textAlign: "center", fontSize: "3.5em"}}> Start a Movie Event </h1>
              <h5 style={{textAlign: "center", margin: 0, fontSize:"1.5em"}}> Meet with like-minded people and enjoy </h5>
              <h5 style={{textAlign: "center", margin: 0}}> a movie together </h5>
          </div>
          <TodayTomorrowContainer
            today={this.onTodayClick}
            tomorrow={this.onTomorrowClick}
          />
          <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
            {this.state.seeCinemas ? (
              <OdeonButton onClick={this.onOdeonClick} />
            ) : (
              ""
            )}
            {this.state.seeCinemas ? (
              <CineworldButton onClick={this.onCineworldClick} />
            ) : (
              ""
            )}
          </div>
          {this.state.seeListings ? (
            <Listings
              listings={this.state.listings}
              onShowingClick={this.onShowingClick}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
/**

{this.state.odeonClicked ? <OdeonListings listings={this.state.odeon} onShowingClick={this.onShowingClick} /> : ""}
{this.state.cineworldClicked ? <CineworldListings listings={this.state.cineworld} onShowingClick={this.onShowingClick}/> : ""}


// this.setState((prevState) => ({
//   odeon: [...prevState.odeon],
//   odeonClicked: false,
//   cineworld: cineworldCount === 1 ? [...prevState.cineworld, ...this.props.listings[8672]] : [...prevState.cineworld],
//   cineworldClicked: !prevState.cineworldClicked,
//   showTicket: prevState.showTicket,
//   selectedFilm: {...prevState.selectedFilm}
// }))

// this.setState((prevState) => ({
//   odeon: odeonCount === 1 ? [...prevState.odeon, ...this.props.listings[9688]] : [...prevState.odeon],
//   odeonClicked: !prevState.odeonClicked,
//   cineworld: [...prevState.cineworld],
//   cineworldClicked: false,
//   showTicket: prevState.showTicket,
//   selectedFilm: {...prevState.selectedFilm}
// }))

let resetState = new Promise((resolve,reject) => {
  if(odeonCount > 1) {
    resolve(this.state.today ? this.onTodayClick() : this.onTomorrowClick())
  }
})
resetState.then(
  this.setState({
    listings: cineworldCount === 1 ? [...this.state.listings[8672]] : [...this.state.listings],
    seeListings: true
  })
)

onOdeonClick(){
  odeonCount++;
  console.log("odeon is clicked");
  if(this.state.today && cineworldCount > 1){
    this.onTodayClick( () => {
      this.setState({
        listings: odeonCount === 1 ? [...this.state.listings[9688]] : [...this.state.listings],
        seeListings: true
      })
    }
    )
  }
  this.onTomorrowClick( () => {
    this.setState({
      listings: odeonCount === 1 ? [...this.state.listings[9688]] : [...this.state.listings],
      seeListings: true
    })
  })
}

onCineworldClick(){
  cineworldCount++;
  console.log("cineworld is clicked")
  if(this.state.today){
    this.onTodayClick( () => {
      this.setState({
        listings: cineworldCount === 1 ? [...this.state.listings[8672]] : [...this.state.listings],
        seeListings: true
      })
    }
    )
  }
  this.onTomorrowClick( () => {
      this.setState({
        listings: cineworldCount === 1 ? [...this.state.listings[8672]] : [...this.state.listings],
        seeListings: true
      })
    }
    )
}

onCineworldClick(){
  cineworldCount++;
  console.log("cineworld is clicked")
  if(this.state.today) {
    this.setState({
      listings: this.props.listings[0]
    },
    () => {
    this.setState({
      listings: cineworldCount === 1 ? [...this.state.listings[8672]] : [...this.state.listings],
      seeListings: true
    })
  }
  )
  }
  this.setState({
    listings: this.props.listings[1]
  }, () => {

  this.setState({
    listings: cineworldCount === 1 ? [...this.state.listings[8672]] : [...this.state.listings],
    seeListings: true
  })
  }
  )
}


**/
export default PostAMovie;
