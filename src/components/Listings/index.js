import React from "react";
import RaisedButton from 'material-ui/RaisedButton';

import "./Listings.css";

var count = 1;
   function setColor(btn, color) {
       var property = document.getElementById(btn);
       if (count == 0) {
           property.style.backgroundColor = "#FFFFFF"
           count = 1;
       }
       else {
           property.style.backgroundColor = "#7FFF00"
           count = 0;
       }
   }

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
