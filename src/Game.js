import React, { Component } from 'react';
import './index.css';
import { fetchRandomNumbers, requestBody } from './shared';
import Display from './Display';
import Summary from './Summary';

class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			backgroundColor: 'red',
			gameFinished: 0
		};

		this.inValidTries = 0;
		this.scores = [];
		this.testStartTime = null;
		this.validTries = 0;
		this.randomNumbers = this.props.randomNumbers;

		window.addEventListener('keydown', this.handleKeyDown);

		this.startTest();
	}

	startTest = () => {
		new Promise((resolve, reject) => {
			this.countDown = this.randomNumbers.pop();
			resolve(this.countDown);
		}).then(countDown => {
			setTimeout(this.goGreen, this.countDown);
			console.log('Counting down for ' + this.countDown);
		});
	};

	getReactionTime = () => {
		return this.testStartTime ? Date.now() - this.testStartTime : 0;
	};

	handleGameEnd = () => {
		this.setState({ gameFinished: 1 });
	};

	handleKeyDown = () => {
		if (!this.state.gameFinished) {
			new Promise((resolve, reject) => {
				resolve(this.getReactionTime());
			})
				.then(timeToReact => {
					this.scores.push(timeToReact);
					return timeToReact;
				})
				.then(timeToReact => {
					timeToReact > 0
						? (this.validTries = this.validTries + 1)
						: (this.inValidTries = this.inValidTries + 1);
				})
				.then(() => {
					this.validTries < 5 ? this.reset() : this.handleGameEnd();
				});
		} else {
			this.setState({ gameFinished: 0 });
			this.restartGame();
		}
	};

	reset = () => {
		this.setState({
			backgroundColor: 'red'
		});

		this.testStartTime = null;

		if (this.randomNumbers.length < 5) {
			fetchRandomNumbers
				.then(response => {
					return response.result.random.data;
				})
				.then(response => {
					this.randomNumbers = this.randomNumbers.concat(response);
				})
				.catch(function() {
					throw new Error(
						`Random API call failed with ${JSON.stringify(requestBody)}`
					);
				});
		}
		this.startTest();
	};

	restartGame = () => {
		this.inValidTries = 0;
		this.scores = [];
		this.testStartTime = null;
		this.validTries = 0;
		this.reset();
	};

	goGreen = () => {
		this.setState({
			backgroundColor: 'green'
		});
		this.testStartTime = Date.now();
	};

	render() {
		return this.state.gameFinished ? (
			<Summary
				validTries={this.validTries}
				inValidTries={this.inValidTries}
				scores={this.scores}
			/>
		) : (
			<Display backgroundColor={this.state.backgroundColor} />
		);
	}
}

export default Game;
