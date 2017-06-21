import React, { Component } from 'react';
import './App.css';

import Board from './components/board';
import SolveButton from './components/solveButton';
import ChangeDifficulty from './components/difficultyToggle';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ChangeDifficulty/>
        <Board/>
        <SolveButton/>
      </div>
    );
  }
}

export default App;
