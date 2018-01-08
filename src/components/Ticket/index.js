import React from 'react';
import { Link } from 'react-router-dom';

import Clock from '../Clock';
import Location from '../Location';
import MovieLogo from '../MovieLogo';
import Calendar from '../Calendar';

import './Ticket.css';

const Ticket = props => (
	<Link to={`/movies/${props.movie}`}>
		<div id="ticket" style={{ margin: 0 }}>
			<img src={props.user.picture} id="img" />
			<p id="name">{props.user.name}</p>
			<p id="info" style={{ left: '37%', fontSize: '1.32em', width: '51vw' }}>
				Cinema: {props.cinema}
				<br />
				Movie: {props.movie} <br />
				Date: {props.date}
				<br />
				Time: {props.time}
				<br />
			</p>
		</div>
	</Link>
);

export default Ticket;
