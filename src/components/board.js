import React from 'react'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import Row from "./row";
import { handleMoveUp, handleMoveRight, handleMoveDown, handleMoveLeft, newGame } from '../actions/board'


var _ = require("lodash");

class Board extends React.Component{
  componentDidMount() {
    this.props.newGame();
    document.addEventListener("keydown", this.handleKeyPress.bind(this));
  }

  handleKeyPress(event){
    var keyCode = event.keyCode;
    switch(keyCode){
      //left arrow
      case 37:
        this.props.handleMoveLeft();
        break;
      //up arrow
      case 38:
        this.props.handleMoveUp();
        break;
      //right arrow
      case 39:
        this.props.handleMoveRight();
        break;
      //down arrow
      case 40:
        this.props.handleMoveDown();
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="board">
        {this.props.Board.map((x, i) =>
          <Row value={x} key={i}/>
        )}
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    Board: state.Board
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({handleMoveUp, handleMoveRight, handleMoveDown, handleMoveLeft, newGame}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
