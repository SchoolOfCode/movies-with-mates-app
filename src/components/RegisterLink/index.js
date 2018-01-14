import React from 'react';
import { Link } from 'react-router-dom';

import './RegisterLink.css';

const RegisterLink = props => {
  return (
    <div>
      <Link
        to="/register"
        style={{
          position: 'relative',
          left: '17%',
          fontStyle: 'italic',
          fontSize: '80%',
          color: 'white'
        }}
      >
        <p> Not signed up? </p>
      </Link>
    </div>
  );
};

export default RegisterLink;
