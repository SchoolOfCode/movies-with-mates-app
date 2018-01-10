import React from 'react';
import Ticket from '../Ticket';
import NavBar from '../NavBar';

import TextField from 'material-ui/TextField';
import SearchIcon from 'material-ui/svg-icons/action/search';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

import './Movies.css';

let otherStyle = {
	// lineHeight: "36px",
	// width: "75%",
	// height: "7%",
	// marginTop: 50,
	errorStyle: {
		color: '#F94548'
	},
	underlineStyle: {
		borderColor: '#FFFFFF'
	},
	floatingLabelStyle: {
		color: '#F94548'
	},
	floatingLabelFocusStyle: {
		color: '#FFFFFF'
	},
	hint: {
		color: '#FFFFFF',
		fontSize: '0.9em'
	}
};

const dateStamp = mongooseTimestamp =>
	`${mongooseTimestamp.slice(0, mongooseTimestamp.indexOf('T'))}`;

const Movies = props => {
	console.log('Movie props', props);
	return (
		<div className="pageContainer">
			<div
				className="searchContainer"
				style={{ position: 'fixed', height: '8vh', width: '100vw', zIndex: 101 }}
			>
				<img
					src="search.svg"
					style={{
						position: 'relative',
						display: 'inline',
						height: '4vh',
						top: '-25px'
						// marginLeft: '3.5vw'
					}}
				/>
				<TextField
					onKeyPress={e => {
						if (e.key === 'Enter') {
							console.log('Enter key pressed');
							props.handleSearch();
						}
					}}
					floatingLabelText="Search for what's on"
					floatingLabelStyle={{color: "white", fontFamily: "Ubuntu, sans-serif", fontSize: '0.9em'}}
					floatingLabelShrinkStyle={{color:"#DD585D"}}
					hintText="e.g. Gone With The Wind"
					onChange={props.textFieldOnChange}
					underlineFocusStyle={otherStyle.underlineStyle}
					underlineStyle={otherStyle.underlineStyle}
					value={props.textFieldValue}
					// hintText="Search for what's on"
					hintStyle={otherStyle.hint}
					inputStyle={{ color: 'white', fontSize: '0.9em' }}
					style={{ width: '74vw', marginLeft: '2vw', marginRight: '2vw', top: '-25px' }}
				/>
				<img
					onClick={() => props.history.replace('/create')}
					src="plus-button-white.svg"
					style={{
						position: 'relative',
						display: 'inline',
						// width: "5%",
						height: '3.5vh',
						top: '-25px'
					}}
				/>
			</div>
			<div style={{ height: '10vh' }} />
			<div
				style={{
					overflow: 'scroll',
					position: 'relative',
					top: '0',
					height: '80vh'
				}}
			>
				<div className="pageInfo">
					<h3 style={{ marginBottom: '3vh', fontSize:"3.5em" }}> Movie Events </h3>
					<h3 style={{ fontSize:"1.5em" }}> Scroll to find a movie that suits you... </h3>
				</div>
				<div id="container">
					{props.films &&
						props.films.map((film, idx) => (
							<Link
								to={`${props.match.url}/${film.movie}`}
								style={{ textDecoration: 'none' }}
							>
								<Ticket
									index={idx}
									cinema={film.cinema}
									movie={film.movie}
									time={film.time}
									date={dateStamp(film.date)}
									user={film.user}
								/>
							</Link>
						))}
				</div>
			</div>
		</div>
	);
};

export default Movies;
