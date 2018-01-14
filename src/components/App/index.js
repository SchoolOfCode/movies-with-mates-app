import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from '../LandingPage';
import Register from '../Register';
import LocalLogin from '../LocalLogin';
import UserProfile from '../UserProfile';
import MoviePage from '../MoviePage';
import PostAMovie from '../PostAMovie';
import ActivityPage from '../ActivityPage';
import GoingPage from '../GoingPage';
import NavBar from '../NavBar';

import './App.css';

/**9688 is birmingham new street odeon, 8672 is cineworld broad street*/

let today = {};
let tomorrow = {};
let all = {};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: {}
    };
    this.fetchCinemaListings = this.fetchCinemaListings.bind(this);
  }

  fetchCinemaListings = (url, id, day) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (day === '0') {
          today[id] = data.listings;
          all[day] = { ...today };
        }
        tomorrow[id] = data.listings;
        all[day] = { ...tomorrow };
        this.setState(prevState => ({
          listings: { ...prevState.listings, ...all }
        }));
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    Promise.all([
      this.fetchCinemaListings(
        'https://api.cinelist.co.uk/get/times/cinema/9688',
        '9688',
        '0'
      ),
      this.fetchCinemaListings(
        'https://api.cinelist.co.uk/get/times/cinema/8672',
        '8672',
        '0'
      ),
      this.fetchCinemaListings(
        'https://api.cinelist.co.uk/get/times/cinema/9688?day=1',
        '9688',
        '1'
      ),
      this.fetchCinemaListings(
        'https://api.cinelist.co.uk/get/times/cinema/8672?day=1',
        '8672',
        '1'
      )
    ]);
  }
  render() {
    return (
      <div
        className="App"
        style={{
          minHeight: '100vh',
          padding: '0'
        }}
      >
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/register" component={Register} />
          <Route path="/locallogin" component={LocalLogin} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/movies" component={MoviePage} />
          <Route
            path="/create"
            render={props => (
              <PostAMovie {...props} listings={this.state.listings} />
            )}
          />
          <Route path="/activity" component={ActivityPage} />
          <Route path="/going" component={GoingPage} />
        </Switch>
        <Route
          path={['/profile', '/create', '/activity', '/going']}
          component={NavBar}
        />
        <Route exact path={'/movies'} component={NavBar} />
      </div>
    );
  }
}

export default App;
