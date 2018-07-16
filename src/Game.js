import React, { Component } from 'react';
import './index.css';
import Display from './Display'
import Summary from './Summary'

class Game extends Component {
  constructor(props) {
    super(props)

    this.state = {
      backgroundColor: "red",
      gameFinished: 0,
    };

    this.inValidTries = 0;
    this.scores = [];
    this.testStartTime = null;
    this.validTries = 0;

    window.addEventListener("keydown", this.handleKeyDown);

    this.startTest();
  }

  startTest = () => {
    new Promise((resolve, reject) => {
      this.countDown = this.props.randomNumbers.pop();
      console.log(`starting test with countDown: ${this.countDown}`)
      resolve(this.countDown);
    }).then((countDown) => {
      setTimeout(this.goGreen, this.countDown);
      console.log("Counting down for " + this.countDown);
    })
  }

  getReactionTime = () => {
    return this.testStartTime ? Date.now() - this.testStartTime : 0;
  }

  handleGameEnd = () => {
    this.setState({gameFinished: 1});
  }

  handleKeyDown = () => {
    if (!this.state.gameFinished) {
      new Promise((resolve, reject) => {
        resolve(this.getReactionTime());
      }).then((timeToReact) => {
        this.scores.push(timeToReact);
        return timeToReact;
      }).then((timeToReact) => {
        console.log(`timeToReact ${timeToReact}, start: ${this.testStartTime} countdown ${this.countDown}`)
        timeToReact > 0 ? (this.validTries = this.validTries + 1, console.log("VALID")): this.inValidTries = this.inValidTries + 1
      }).then(() => {
        this.validTries < 2 ? this.reset() : this.handleGameEnd()
      })
    } else {
      this.setState({gameFinished: 0});
      this.restartGame()
    }
  }

  reset = () => {
    this.setState({
      backgroundColor: "red",
    });

    this.startTest();
  }

  restartGame = () => {
    this.inValidTries = 0;
    this.scores = [];
    this.testStartTime = null;
    this.validTries = 0;
    this.reset();
  }

  goGreen = () => {
    this.setState({
      backgroundColor: "green"
    });
    this.testStartTime = Date.now();
  }

  render() {
    return this.state.gameFinished ? (
      <Summary validTries={this.validTries} inValidTries={this.inValidTries} scores={this.scores}/>
    ) : <Display backgroundColor={this.state.backgroundColor} />
  }
}

export default Game;
