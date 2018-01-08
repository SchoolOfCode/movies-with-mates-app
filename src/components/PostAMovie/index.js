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

// const getDateDisplay = today => {
//   let date = new Date();
//   let dd = today ? date.getDate() : date.getDate() + 1;
//   let mm = date.getMonth() + 1;
//   let yyyy = date.getFullYear();
//   dd = dd < 10 ? `0${dd}` : dd;
//   mm = mm < 10 ? `0${mm}` : mm;
//   return `${dd}/${mm}/${yyyy}`;
// };

const getDateDB = today => {
  let date = new Date();
  let dd = today ? date.getDate() : date.getDate() + 1;
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();
  dd = dd < 10 ? `0${dd}` : dd;
  mm = mm < 10 ? `0${mm}` : mm;
  return `${yyyy}-${mm}-${dd}`;
};

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
    this.handleCinemaChange = this.handleCinemaChange.bind(this);
    this.handleMovieChange = this.handleMovieChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onOdeonClick = this.onOdeonClick.bind(this);
    this.onCineworldClick = this.onCineworldClick.bind(this);
    this.onShowingClick = this.onShowingClick.bind(this);
    this.onTodayClick = this.onTodayClick.bind(this);
    this.onTomorrowClick = this.onTomorrowClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  //this needs refactoring
  //
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

  handleCinemaChange(e) {
    this.setState({
      selectedFilm: {
        cinema: e.target.value,
        movie: this.state.selectedFilm.movie,
        date: this.state.selectedFilm.date,
        time: this.state.selectedFilm.time
      }
    });
  }

  handleMovieChange(e) {
    this.setState({
      selectedFilm: {
        cinema: this.state.selectedFilm.cinema,
        movie: e.target.value,
        date: this.state.selectedFilm.date,
        time: this.state.selectedFilm.time
      }
    });
  }

  handleDateChange(e) {
    this.setState({
      selectedFilm: {
        cinema: this.state.selectedFilm.cinema,
        movie: this.state.selectedFilm.movie,
        date: e.target.value,
        time: this.state.selectedFilm.time
      }
    });
  }
  handleTimeChange(e) {
    this.setState({
      selectedFilm: {
        cinema: this.state.selectedFilm.cinema,
        movie: this.state.selectedFilm.movie,
        date: this.state.selectedFilm.date,
        time: e.target.value
      }
    });
  }
  // this sends off DD/MM/YYYY to the back end but if we want to look into deleting expired tickets
  // I think we need to send off a date object and account for this in the schema?
  handleSubmit(e) {
    e.preventDefault();
    fetch("/api/movies", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        ...this.state.selectedFilm,
        ...{
          user: {
            picture: localStorage.getItem("picture"),
            name: localStorage.getItem("displayName")
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
    // setTimeout(
    //   () => console.log("state after odeon click", this.state.listings),
    //   1000
    // );

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
    // setTimeout(
    //   () => console.log("state after cineworld click", this.state.listings),
    //   1000
    // );

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
    // setTimeout(
    //   () => console.log("state after today click", this.state.listings),
    //   1000
    // );
    // console.log(
    //   "today clicked, this.props.listings[0]",
    //   this.props.listings[0]
    // );
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
    // setTimeout(
    //   () => console.log("state after tomorrow click", this.state.listings),
    //   1000
    // );
    // console.log(
    //   "tomorrow clicked, this.props.listings[1]",
    //   this.props.listings[1]
    // );

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
  }

  render() {
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
              <h1 style={{textAlign: "center"}}> Start a Movie Event </h1>
              <h5 style={{textAlign: "center", margin: 0}}> Meet with like-minded people and enjoy </h5>
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
          {this.state.showTicket ? (
            <PostMovieTicket
              handleCinemaChange={this.handleCinemaChange}
              handleMovieChange={this.handleMovieChange}
              handleDateChange={this.handleDateChange}
              handleTimeChange={this.handleTimeChange}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              selectedFilm={this.state.selectedFilm}
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
