import React, { Component } from 'react';
import './index.css';

class Display extends Component {
  render() {
    return (
      <div className="game" style={{backgroundColor: this.props.backgroundColor}}>
      <p style={{display: this.props.isValid ? 'none' : 'block'}}>Invalid</p>
      kjefhlj
      </div>
    )
  }
}

export default Display
