import React from 'react'

const OdeonListings = (props) => {
  return (
    props.listings.map((film, idx) => {
      return (
        <div key={idx}>
          <h3>{film.title}</h3>
          {film.times.map((showing,i) => {
            return (
              <button key={i} onClick={() => props.onShowingClick(i,showing,film.title)}>{showing}</button>
            )
          })}
      </div>
    )
    })

  )
}

export default OdeonListings
