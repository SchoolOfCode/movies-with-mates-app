import React from 'react'
import TodayTomButton from "../TodayTomButton";

const TodayTomorrowContainer = (props) => {
  return (
    <div className="buttonContainer" style={{position: "relative", display: "flex", flexDirection: "row", justifyContent: "center"}}>
      <TodayTomButton onClick={props.today} day="Today"/>
      <TodayTomButton onClick={props.tomorrow} day="Tomorrow"/>
    </div>
  )
}

export default TodayTomorrowContainer
