import React, { Component } from 'react';
import './index.css';

class Game extends Component {
  state = {
    valid: 1,
    countDownFinished: 0,
    backgroundColour: "red",
  }

  countDown = this.props.randomNumbers.pop();

  timeElapsed = () => {
    return Date.now() - this.state.start;
  }

  timeToReact = () => {
    return this.timeElapsed - this.state.countDown;
  }

  restart = () => {
    this.setState({
      start: Date.now(),
      backgroundColour: "red",
      countDownFinished: 0
    });
    this.countDown = this.props.randomNumbers.pop();
    setTimeout(this.goGreen, this.countDown);
    console.log(`restarting with ${Date.now()}, ${this.countDown}, ${this.backgroundColour}`);
  }

  goGreen = () => {
    console.log(`COUNTDOWN FINISHED, currently ${this.backgroundColour}`);
    this.setState({backgroundColor: "green", countDownFinished: 1});
    // console.log(`countdown finished ${this.backgroundColour}`);
  }

  componentDidMount() {
    this.setState({
      start: Date.now()
    });
    // console.log(`IN GAME`);
    console.log(`COUNTDOWN ${this.countDown}`);
    // console.log(Date.now());
    setTimeout(this.goGreen, this.countDown);
    window.addEventListener("keydown", this.restart);
  }

  render() {
    console.log(this.backgroundColor);
    return this.state.countDownFinished ? (
      <div className="game" style={{backgroundColor: "green"}}>
      GREEN
      </div>
    ):(
      <div className="game" style={{backgroundColor: "red"}}>
      RED
      </div>
    );
  }
}

export default Game;
