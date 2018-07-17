import React, { Component } from 'react';
import './index.css';

class Display extends Component {
  render() {
    return (
      <div className="game" style={{backgroundColor: this.props.backgroundColor}}>
      </div>
    )
  }
}

export default Display
