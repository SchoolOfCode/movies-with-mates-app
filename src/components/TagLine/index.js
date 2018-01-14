import React, { Component } from 'react';

import './tagline.css';

let word = 'Marvel';

let randomWords = [
  'Marvel',
  'Mates',
  'Minions',
  'Magic',
  'Monsters',
  'Magnificence',
  'Meditation',
  'Mesmerize',
  'Mouthwatering',
  'Mm-Hmm',
  'My Gosh',
  'My Word',
  'Mutuality'
];

const getRandomWord = () => {
  let num = Math.floor(Math.random() * 13);
  word = randomWords[num];
};

class TagLine extends Component {
  componentWillMount() {
    getRandomWord();
  }
  render() {
    return (
      <div>
        <h2
          style={{ position: 'relative', fontSize: '2em', marginBottom: '0px' }}
        >
          Movies With Mates
        </h2>
        <h4
          style={{
            position: 'relative',
            fontSize: '1.1em',
            color: 'rgb(119,119,119)',
            marginTop: '0px'
          }}
        >
          Meet, Watch,{' '}
          <span
            className="lastWord"
            style={{
              color: '#BE3438',
              fontSize: '1.5em',
              fontFamily: 'Gloria Hallelujah'
            }}
          >
            {word}
          </span>
        </h4>
      </div>
    );
  }
}

export default TagLine;
