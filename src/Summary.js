import React, { Component } from 'react';
import './index.css';

class Summary extends Component {
	average = arr => {
		const sum = arr.reduce(function(a, b) {
			return b >= 0 ? a + b : a;
		});

		return (sum / this.props.validTries).toFixed(1);
	};

	render() {
		return (
			<div className="Summary">
				<header>
					<h1>Stats</h1>
					<hr />
				</header>
				{this.props.scores.map(function(score, index) {
					return score > 0 ? (
						<p className="App-intro" key={index}>
							Try {index + 1}: {score}
						</p>
					) : (
						<p className="App-intro" key={index}>
							Try {index + 1}: Invalid
						</p>
					);
				})}
				<hr />
				<p>Average reaction time (ms): {this.average(this.props.scores)}</p>
				<p>Invalid attempts: {this.props.inValidTries}</p>
				<p style={{ color: 'blue' }}>Press any key to retry</p>
			</div>
		);
	}
}

export default Summary;
