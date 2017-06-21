import React from 'react'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import { toggleDifficulty } from '../actions/gameState'

var _ = require("lodash");

class ChangeDifficulty extends React.Component{
  componentDidMount() {
  }

  render() {
    return (
      <div className="difficulty-choice">
        <button className="easy" onClick={() => this.props.toggleDifficulty("easy")}>Easy</button>
        <button className="medium" onClick={() => this.props.toggleDifficulty("medium")}>Medium</button>
        <button className="hard" onClick={() => this.props.toggleDifficulty("hard")}>Hard</button>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    GameState: state.GameState
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({toggleDifficulty}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeDifficulty)
