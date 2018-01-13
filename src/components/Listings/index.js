import React from "react";
import RaisedButton from 'material-ui/RaisedButton';

import "./Listings.css";

const Listings = props => {
  return props.listings.map((film, idx) => {
    return (
      <div key={idx}>
        <div className="showings">
        <h3 className="filmName">{film.title}</h3>
        {film.times.map((showing, i) => {
          return (
            <RaisedButton className="showingTimes" style={{margin: "5px"}}
              key={i}
              onClick={() => props.onShowingClick(i, showing, film.title)}
            >
              {showing}
            </RaisedButton>
          );
        })}
      </div>
      </div>
    );
  });
};

export default Listings;
