import React, { Component } from "react";
import Ticket from "../Ticket";
import SearchBar from "material-ui-search-bar";
import TextField from "material-ui/TextField";
import { Route, Switch, Link } from "react-router-dom";

import Movies from "../Movies";
import CommentsPage from "../CommentsPage";
import AppBar from "../AppBar";
import LoginPage from "../LoginPage";

const tokenChecker = () => {
  return localStorage.getItem("localToken") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("email")
    ? true
    : false;
};

class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      films: [],
      searchTerm: "",
      needsToLogIn: false
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.filmIDFinder = this.filmIDFinder.bind(this);
    this.fetchFilms = this.fetchFilms.bind(this);
  }

  componentDidMount() {
    tokenChecker() ? this.fetchFilms() : this.getLogInPage();
  }

  fetchFilms() {
    fetch("/api/movies")
      .then(results => results.json())
      .then(data => {
        console.log("data", data);
        this.setState(prevState => ({
          films: [...prevState.films, ...data.payload],
          loading: false
        }));
        console.log("state", this.state);
      })
      .catch(error => console.log(error));
  }

  handleSearchChange(e) {
    console.log(e.target.value);
    if (e.target.value === "") {
      fetch("/api/movies")
        .then(results => results.json())
        .then(data => {
          console.log("data", data);
          this.setState(prevState => ({
            films: [...data.payload]
          }));
          console.log("state", this.state);
        })
        .catch(error => console.log(error));
    }
    this.setState({ searchTerm: e.target.value });
  }

  handleSearch(e) {
    // this.setState(prevState => ({ films: [] }));
    const searchTerm = encodeURIComponent(this.state.searchTerm).trim();
    fetch(`/api/movies/search/${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        console.log("SEARCH DATA ***", data);
        console.log("SEARCH TERM ***", searchTerm);
        this.setState({ films: data.payload });
      })
      .catch(error => console.log(error));
  }

  filmIDFinder(arr, film) {
    console.log(arr);
    console.log(film);
    const found = arr.filter(f => f.movie === film);
    if (found.length > 0) {
      return found[0]._id;
    }
    return;
    // return arr[arr.map(filmInfo => filmInfo.movie).indexOf(film)]._id;
  }
  filmFinder(film) {
    const found = this.state.films.filter(f => f.movie === film);
    return found[0];
    // return arr[arr.map(filmInfo => filmInfo.movie).indexOf(film)]._id;
  }

  getLogInPage() {
    this.setState({ needsToLogIn: true });
  }

  render() {
    console.log("MOVIE PAGE STATE", this.state);
    if (this.state.needsToLogIn) {
      return <LoginPage />;
    }
    if (this.state.loading) {
      return <div>no no no</div>;
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
          path={`${this.props.match.url}/:film`}
          component={props => (
            <CommentsPage
              film={this.filmFinder(props.match.params.film)}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default MoviePage;
