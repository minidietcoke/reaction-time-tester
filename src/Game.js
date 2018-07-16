import React, { Component } from 'react';
import './index.css';
import Display from './Display'

class Game extends Component {
  constructor(props) {
    super(props)

    this.state = {
      backgroundColor: "red",
      isValid: 1,
      start: Date.now(),
    };

    this.countDown = this.props.randomNumbers.pop();
    this.scores = [];

    window.addEventListener("keydown", this.handleKeyDown);
    setTimeout(this.goGreen, this.countDown);
  }


  getTimeElapsed = () => {
    return Date.now() - this.state.start;
  }

  timeToReact = () => {
    return this.getTimeElapsed() - this.countDown;
  }

  handleKeyDown = () => {
    const reactionTime = this.timeToReact();
    console.log(`reaction time ${reactionTime}`)
    if (reactionTime > 0) {
      this.scores.push(reactionTime)
    } else {
      this.setState({
       isValid: 0
     });
    }
    this.restart();
  }

  restart = () => {
    this.setState({
      start: Date.now(),
      backgroundColor: "red",
      countDownFinished: 0,
      isValid: 1,
    });
    this.countDown = this.props.randomNumbers.pop();
    setTimeout(this.goGreen, this.countDown);
    console.log(`restarting with ${Date.now()}, ${this.countDown}, ${this.state.backgroundColor}`);
  }

  goGreen = () => {
    console.log(`COUNTDOWN FINISHED, currently ${this.state.backgroundColor}`);
    this.setState({
      backgroundColor: "green", countDownFinished: 1
    });
  }

  render() {
    return (
      <Display backgroundColor={this.state.backgroundColor} isValid={this.state.isValid}/>
    )
  }
}

export default Game;
