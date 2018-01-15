import React, { Component } from "react";
import { Route } from "react-router-dom";

import CircularProgress from "material-ui/CircularProgress";

import Movies from "../Movies";
import CommentsPage from "../CommentsPage";
import AppBar from "../AppBar";
import LoginPage from "../LoginPage";
import Return from "../ReturnHome";

const eventFinderById = require("../../tests/frontEndFunctions").eventFinderById;
const tokenChecker = require("../../tests/frontEndFunctions").tokenChecker;


class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      films: [],
      searchTerm: "",
      needsToLogIn: false,
      error: false
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.fetchFilms = this.fetchFilms.bind(this);
  }

  componentDidMount() {
    tokenChecker() ? this.fetchFilms() : this.getLogInPage();
  }

  fetchFilms() {
    fetch("/api/movies")
      .then(results => results.json())
      .then(data => {
        this.setState(prevState => ({
          films: [...prevState.films, ...data.payload],
          loading: false
        }));
      })
      .catch(error => this.setState({loading: false, error: true})
      );
  }

  handleSearchChange(e) {
    console.log(e.target.value);
    if (e.target.value === "") {
      fetch("/api/movies")
        .then(results => results.json())
        .then(data => {
          this.setState(prevState => ({
            films: [...data.payload]
          }));
        })
        .catch(error => console.log(error));
    }
    this.setState({ searchTerm: e.target.value });
  }

  handleSearch(e) {
    const searchTerm = encodeURIComponent(this.state.searchTerm).trim();
    fetch(`/api/movies/search/${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ films: data.payload });
      })
      .catch(error => console.log(error));
  }

  getLogInPage() {
    this.setState({ needsToLogIn: true });
  }

  render() {
    if (this.state.needsToLogIn) {
      return <LoginPage />;
    }
    if (this.state.loading) {
      return (
        <div>
         <CircularProgress style={{position: "absolute", top: "300px", right:"160px"}} size={50} color={"red"} thickness={10} />
         <div style={{position:"fixed", backgroundColor:"white", zIndex:"1000", width:"100vw", height:"10vh", bottom:"0"}}>
         </div>
       </div>
      );
    }
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
      <div>
        <Route
          exact
          path={`${this.props.match.url}`}
          render={props => (
            <div>
              <AppBar title="" url="/profile" />
              <Movies
                films={this.state.films}
                textFieldOnChange={this.handleSearchChange}
                textFieldValue={this.state.searchTerm}
                handleSearch={this.handleSearch}
                history={this.props.history}
                {...props}
              />
            </div>
          )}
        />
        <Route
          exact
          path={`${this.props.match.url}/:filmId`}
          render={props => {
            console.log("PARAMS", props.match);
            return (
              <CommentsPage
                film={eventFinderById(this.state.films,props.match.params.filmId)}
                {...props}
              />
            );
          }}
        />
      </div>
    );
  }
}

export default MoviePage;
