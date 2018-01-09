import React from 'react';
import { Link } from 'react-router-dom';

import ClockIcon from "material-ui/svg-icons/device/access-time";
import LocationIcon from "material-ui/svg-icons/communication/location-on";
import MovieIcon from "material-ui/svg-icons/maps/local-movies";
import DateIcon from "material-ui/svg-icons/action/date-range";

import './Ticket.css';

const Ticket = props => (
	<Link to={`/movies/${props.movie}`}>
		<div id="ticket" style={{ margin: 0 }}>
			<img style={{position: "relative", left: "-30%", top:"6vh"}} src={props.user.picture} id="img" />
			<div className="userName" style={{position:"relative", width: "15vw", height: "20%", top: "15%", left: "12%", margin: "0"}}>
				<p style={{margin: "0"}} id="name">{props.user.name}</p>
			</div>
			<p id="info" style={{ bottom:"25px", top:"3px", left: '37%', fontSize: '1.32em', width: '51vw' }}>
				<br />
				<LocationIcon style={{ position:"relative", top:"8px", color:"white", height:"30px", padding:"2px", paddingTop:"5px"}}/>   {props.cinema}
				<br />
				<MovieIcon style={{ position:"relative", top:"8px",color:"white", height:"22px", padding:"2px"}}/>   {props.movie} <br />
				<DateIcon style={{ position:"relative", top:"8px",color:"white", height:"22px", padding:"2px"}}/>   {props.date}
				<br />
				<ClockIcon style={{ position:"relative", top:"8px",color:"white", height:"22px", padding:"2px"}}/>   {props.time}
				<br />
			</p>
		</div>
	</Link>
);

export default Ticket;
