import React, { Component } from "react";
import Ticket from "../Ticket";
import SearchBar from "material-ui-search-bar";
import TextField from "material-ui/TextField";

class MovieEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      searchTerm: ""
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    fetch("/api/movies")
      .then(results => {
        console.log("Results", results);
        return results.json();
      })
      .then(data => {
        console.log("data", data);
        this.setState(prevState => ({
          films: [...prevState.films, ...data.payload]
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
    this.setState({
      searchTerm: e.target.value
    });
    // console.log("state: ", this.state.searchTerm);
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState(prevState => ({
      films: []
    }));
    const searchTerm = encodeURIComponent(this.state.searchTerm).trim();
    console.log("Searching");
    fetch(`/api/movies/search/${searchTerm}`)
      .then(response => {
        console.log("Response", response);
        return response.json();
      })
      .then(data => {
        this.setState({
          films: data.payload
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "#fcf2e3",
          height: "100%",
          padding: "0"
        }}
      >
        <br />
        What's on?
        <br />
        <br />
        <TextField
          onChange={this.handleSearchChange}
          style={{
            width: "75%",
            height: "7%",
            margin: "0 auto"
          }}
          value={this.state.searchTerm}
        />
        <button onClick={this.handleSearch} />
        <br />
        {this.state.films.map((film, idx) => {
          return (
            <Ticket
              cinema={film.cinema}
              movie={film.movie}
              time={film.time}
              date={film.date}
            />
          );
        })}
      </div>
    );
  }
}

export default MovieEvent;
