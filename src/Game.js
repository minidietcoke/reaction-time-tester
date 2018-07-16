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

    this.countDown = this.props.randomNumbers.pop();
    this.inValidTries = 0;
    this.score = [];
    this.start = Date.now();
    this.validTries = 0;

    window.addEventListener("keydown", this.handleKeyDown);
    setTimeout(this.goGreen, this.countDown);
  }

  getTimeElapsed = () => {
    return Date.now() - this.start;
  }

  timeToReact = () => {
    return this.getTimeElapsed() - this.countDown;
  }

  handleGameEnd = () => {
    console.log("game finished");
    this.setState({gameFinished: 1});
  }
  handleKeyDown = () => {
    const timeToReact = this.timeToReact();
    this.score.push(timeToReact);

    timeToReact > 0 ? this.validTries = this.validTries + 1 : this.inValidTries = this.inValidTries + 1
    this.validTries < 5 ? this.restart() : this.handleGameEnd()
  }

  restart = () => {
    this.setState({
      backgroundColor: "red",
    });
    this.start = Date.now();
    this.countDown = this.props.randomNumbers.pop();
    setTimeout(this.goGreen, this.countDown);
  }

  goGreen = () => {
    this.setState({
      backgroundColor: "green", countDownFinished: 1
    });
  }

  render() {
    return this.state.gameFinished ? (
      <Summary validTries={this.validTries} inValidTries={this.inValidTries} score={this.score}/>
    ) : <Display backgroundColor={this.state.backgroundColor} />
  }
}

export default Game;
