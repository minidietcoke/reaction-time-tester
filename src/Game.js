import React, { Component } from 'react';
import './index.css';

class Game extends Component {
  state = {
    valid: 1,
  }

  backgroundColour = "red"
  countDown = this.props.randomNumbers.pop()

  timeElapsed = () => {
    return Date.now() - this.state.start;
  }

  timeToReact = () => {
    return this.timeElapsed - this.state.countDown;
  }

  componentDidMount() {
    this.setState({
      start: Date.now()
    });
    // console.log(`IN GAME`);
    console.log(`COUNTDOWN ${this.countDown}`);
    // console.log(Date.now());
    setInterval(function(){ this.backgroundColor = "green"; console.log("countrdown fown")}, this.countDown);
  }



  render() {
    return (
      <div className="game" style={{backgroundColor: this.backgroundColour}}>
      THIISEHS
      </div>
    );
  }
}

export default Game;
