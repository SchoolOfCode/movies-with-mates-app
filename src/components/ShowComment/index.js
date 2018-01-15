import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';

import './ShowComment.css';

const ShowComment = props => {
  return (
    <div
      className="container"
      style={{
        overflow: 'scroll',
        height: '34vh',
        width: '100%',
        paddingBottom: '2%'
      }}
    >
      <div style={{ height: '0vh' }} />
      {props.comments.map((comment, idx) => (
        <div
          className="chatInfo"
          style={{
            width: '95vw',
            paddingBottom: '3%',
            marginBottom: '-10%'
          }}
          key={idx}
        >
          <div
            className="userInfo"
            style={{ height: '16vh', width: '93vw', marginRight: 0 }}
          >
            <Avatar
              className="avatar"
              src={comment.picture}
              style={{
                position: 'relative',
                display: 'inline',
                left: '-40%',
                top: '10%',
                height: '9vh',
                width: '9vh',
                marginBottom: '2%'
              }}
            />
            <h6
              style={{
                position: 'relative',
                textAlign: 'left',
                top: '-70px',
                left: '75px',
                fontWeight: 'bold',
                width: '50vw'
              }}
            >
              {comment.displayName}
            </h6>
            <Card
              className="chatMessage"
              style={{
                position: 'relative',
                top: '-77px',
                left: '22%',
                width: '70vw',
                paddingBottom: '0',
                borderBottomRightRadius: '20px',
                borderBottomLeftRadius: '20px',
                borderTopRightRadius: '20px',
                borderTopLeftRadius: '20px',
                fontWeight: '100',
                backgroundColor:
                  localStorage.getItem('displayName') === comment.displayName
                    ? '#F9F4F4'
                    : 'white'
              }}
            >
              <CardText
                className="cardText"
                style={{
                  position: 'relative',
                  textAlign: 'left',
                  left: '3%',
                  top: '20%',
                  padding: '1%',
                  width: '95%'
                }}
              >
                {comment.comment}
              </CardText>
            </Card>
            <h6
              style={{
                textAlign: 'right',
                position: 'relative',
                top: '-79px',
                left: -25,
                marginRight: -10,
                fontSize: '.8em',
                color: '#635E5F'
              }}
            >
              {props.timestamp(comment.createdAt)}
            </h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowComment;
