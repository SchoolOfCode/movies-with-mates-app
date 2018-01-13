import React, {Component} from "react";

import "./tagline.css";

let word = "Marvel";

let randomWords = ["Marvel", "Mates", "Minions", "Magic", "Monsters", "Magnificence", "Meditation", "Mesmerize", "Mouthwatering", "Mm-Hmm", "My Gosh", "My Word", "Mutuality"]

const getRandomWord = () => {
  let num = Math.floor(Math.random() * 13);
  word = randomWords[num];
}

class TagLine extends Component {
  componentWillMount(){
    getRandomWord()
  }
  render(){
  return (
    <div>
      <h2 style={{position: "relative", top: "-3vh", fontSize: "2em"}}>Movies With Mates</h2>
      <h4 style={{position: "relative", top: "-3.8vh", fontSize: "1.1em", color:"rgb(119,119,119)"}}>Meet, Watch, <span className="lastWord" style={{ color:"#BE3438", fontSize:"1.5em", fontFamily:"Gloria Hallelujah"}}>{word}</span></h4>
    </div>
    );
  };
}

export default TagLine;
