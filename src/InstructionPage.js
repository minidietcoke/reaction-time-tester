import React, { Component } from 'react';
import './index.css';
import Game from './Game';

// - A random number is fetched using the random.org API, and the app waits for as many seconds
// - the app displays the result and offers to restart the test
// -
const requestBody = {
  "jsonrpc": "2.0",
  "method": "generateIntegers",
  "params": {
      "apiKey": "93ff549e-52f3-4a09-bef0-653210839a63",
      "n": 20,
      "min": 2000,
      "max": 10000
  },
  "id": 42
}

class InstructionPage extends Component {
  fetchRandomNumbers = fetch('https://api.random.org/json-rpc/1/invoke', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody)
  }).then((response) => {
    return response.json();
  });

  constructor(props) {
    super(props);
    this.state = {
      gameReady: 0,
      gameStarted: 0,
      randomNumbers: null
    }

    this.fetchRandomNumbers.then((response) => {
      this.setState({randomNumbers: response.result.random.data, gameReady: 1})
      window.addEventListener("keydown", this.startGame);
    }).catch(function() {
      throw new Error(`Random API call failed with ${JSON.stringify(requestBody)}`);
    });;
  }

  startGame = () => {
    this.setState({ gameStarted: 1 });
  }

  render() {
    const loadingText = this.state.gameReady ? "To get started, press any key." : "Loading..."

    return this.state.gameStarted ? <Game randomNumbers={this.state.randomNumbers} /> : (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">How to play</h1>
        </header>
        <p className="App-intro">
          The screen will be red when you start the game.<br/>
          When the screen turns green, you must tap any key as quickly as possible.<br/>
          If you tap the button before the screen turns green, the round will be invalid.<br/>
          Your results will be displayed after five valid rounds.
        </p>
        <p className="App-intro">
          {loadingText}
        </p>
      </div>
    );
  }
}

export default InstructionPage;
