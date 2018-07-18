import React, { Component } from 'react';
import './index.css';
import Game from './Game';
import { fetchRandomNumbers, requestBody } from './shared';

class InstructionPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gameReady: 0,
			gameStarted: 0,
			randomNumbers: null
		};

		fetchRandomNumbers
			.then(response => {
				this.setState({
					gameReady: 1
				});
				this.randomNumbers = response.result.random.data;

				window.addEventListener('keydown', this.startGame);
			})
			.catch(function() {
				throw new Error(
					`Random API call failed with ${JSON.stringify(requestBody)}`
				);
			});
	}

	startGame = () => {
		this.setState({ gameStarted: 1 });
	};

	render() {
		return this.state.gameStarted ? (
			<Game randomNumbers={this.randomNumbers} />
		) : (
			<div className="Intro">
				<header>
					<h1>How to play</h1>
				</header>
				<p>
					The screen will be red when you start the game.<br />
					When the screen turns green, you must tap any key as quickly as
					possible.<br />
					If you tap the button before the screen turns green, the round will be
					invalid.<br />
					Your results will be displayed after five valid rounds.
				</p>
				<p>
					{this.state.gameReady
						? 'To get started, press any key.'
						: 'Loading...'}
				</p>
			</div>
		);
	}
}

export default InstructionPage;
