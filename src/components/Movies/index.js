import React from 'react';

import TextField from 'material-ui/TextField';
import SearchIcon from 'material-ui/svg-icons/action/search';
import UpArrowIcon from 'material-ui/svg-icons/navigation/subdirectory-arrow-right';
import { Link } from 'react-router-dom';

import Ticket from '../Ticket';
import NavBar from '../NavBar';
import './Movies.css';

let otherStyle = {
  errorStyle: {
    color: '#F94548'
  },
  underlineStyle: {
    borderColor: '#FFFFFF'
  },
  floatingLabelStyle: {
    color: '#F94548'
  },
  floatingLabelFocusStyle: {
    color: '#FFFFFF'
  },
  hint: {
    color: '#FFFFFF',
    fontSize: '0.9em'
  }
};

const dateStamp = require('../../tests/frontEndFunctions').dateStamp;

const Movies = props => {
  return (
    <div className="pageContainer">
      <div
        className="searchContainer"
        style={{ position: 'fixed', height: '10vh', zIndex: 101 }}
      >
        <img
          // className="one column"
          src="/search.svg"
          style={{
            position: 'relative',
            display: 'inline',
            height: '70%',
            width: '8vw',
            marginLeft: '3.5vw',
            top: '-25px'
          }}
        />
        <TextField
          // className="eleven columns"
          onKeyPress={e => {
            if (e.key === 'Enter') {
              props.handleSearch();
            }
          }}
          floatingLabelText="Search for what's on"
          floatingLabelStyle={{
            color: 'white',
            fontFamily: 'Ubuntu, sans-serif',
            fontSize: '0.9em'
          }}
          floatingLabelShrinkStyle={{ color: '#DD585D' }}
          hintText="e.g. Gone With The Wind"
          onChange={props.textFieldOnChange}
          underlineFocusStyle={otherStyle.underlineStyle}
          underlineStyle={otherStyle.underlineStyle}
          value={props.textFieldValue}
          hintStyle={otherStyle.hint}
          inputStyle={{ color: 'white', fontSize: '0.9em' }}
          style={{
            width: '74vw',
            marginLeft: '2vw',
            marginRight: '2vw',
            top: '-25px'
          }}
        />
        <img
          // className="one column"
          onClick={() => props.history.replace('/create')}
          src="/plus-button-white.svg"
          style={{
            position: 'relative',
            display: 'inline',
            height: '50%',
            width: '7.5vw',
            top: '-25px'
          }}
        />
      </div>
      <div style={{ height: '8vh' }} />
      <div
        style={{
          overflow: 'scroll',
          position: 'relative',
          top: '0',
          height: '80vh'
        }}
      >
        <div
          style={{
            position: 'relative',
            height: '29vh',
            top: '-3vh',
            paddingTop: '12%',
            backgroundColor: 'rgb(252, 252, 252)'
          }}
          className="pageInfoBG"
        >
          <div
            className="pageInfo"
            style={{ position: 'relative', top: '30px' }}
          >
            <h3 style={{ marginBottom: '3vh', fontSize: '3.5em' }}>
              Movie Events
            </h3>
            <h3 style={{ fontSize: '2em' }}>Click to create your own</h3>
            <UpArrowIcon
              style={{
                color: '#F94548',
                position: 'relative',
                height: '4vh',
                left: '125px',
                top: '-41px',
                transform: 'rotate(-64deg)'
              }}
            />
            <h3
              style={{ position: 'relative', top: '-60px', fontSize: '1.5em' }}
            >
              Or scroll to find a movie that suits you...
            </h3>
          </div>
        </div>
        <div id="container">
          {props.films &&
            props.films.map((film, idx) => (
              <Link
                to={{
                  pathname: `${props.match.url}/${film._id}`,
                  state: { prevPath: props.location.pathname }
                }}
                style={{ textDecoration: 'none' }}
                key={idx}
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
      </div>
    </div>
  );
};

export default Movies;
