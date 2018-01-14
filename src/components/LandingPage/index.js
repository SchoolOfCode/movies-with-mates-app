import React from 'react';

import Logo from '../Logo';
import TagLine from '../TagLine';
import FBLoginButton from '../FBLoginButton';
import LoginEmailButton from '../LoginEmailButton';
import RegisterLink from '../RegisterLink';

import './LandingPage.css';

const LandingPage = props => {
  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <div
        className="landingAnimation"
        style={{
          position: 'absolute',
          height: '100%',
          width: '100vw',
          backgroundColor: 'white',
          zIndex: '30'
        }}
      >
        <div style={{ position: 'relative', top: '30vh' }}>
          <img
            src={'/logo.svg'}
            alt="mwm-logo"
            style={{ position: 'relative', width: '55%' }}
          />
          <div style={{ position: 'relative', top: '1vh' }}>
            <h2
              style={{
                position: 'relative',
                top: '1vh',
                left: '8px',
                fontSize: '2em',
                margin: '0 auto',
                width: '50vw'
              }}
            >
              Movies With Mates
            </h2>
          </div>
        </div>
      </div>
      <div className="bgColor">
        <img
          className="background"
          alt="background"
          src={'/cinema-room2.png'}
        />
        <div className="container">
          <img
            src={'/logo.svg'}
            alt="mwm-logo"
            style={{ position: 'relative', top: '8vh', width: '100%' }}
          />
        </div>
        <div className="tagLine">
          <TagLine style={{ fontFamily: 'Roboto' }} />
        </div>
        <div className="loginButtons">
          <FBLoginButton history={props.history} />
          <LoginEmailButton />
          <RegisterLink
            className="registerLink"
            style={{ backgroundColor: 'black' }}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
