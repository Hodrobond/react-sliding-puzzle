import React, { Component } from 'react';
import './App.css';

import Board from './components/board';
import SolveButton from './components/solveButton';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Board/>
        <SolveButton/>
      </div>
    );
  }
}

export default App;
