import React from 'react';
import SocialLoginButton from 'react-social-login-buttons/lib/buttons/SocialLoginButton';

const EmailLoginButton = props => {
  const customProps = {
    style: {
      background: '#e03c3c',
      color: 'white',
      margin: '10px auto',
      marginBottom: '10px',
      width: '55vw'
    },
    activeStyle: {
      background: '#962727'
    }
  };

  return (
    <SocialLoginButton
      {...{ ...customProps, ...props }}
      onClick={() => window.location.replace('/locallogin')}
    >
      <span
        style={{
          verticalAlign: 'middle',
          fontFamily: 'sans-serif'
        }}
      >
        Login With Email
      </span>
    </SocialLoginButton>
  );
};

export default EmailLoginButton;
