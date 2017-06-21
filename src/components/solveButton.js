import React from 'react'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import {solve} from '../actions/solver';

class solverButton extends React.Component{
  componentDidMount() {

  }

  render() {
    return (
      <div className="solver-button">
        <p>Warning: This should work on 3x3 boards, might work on 4x4, and probably will not work on 5x5</p>
        <button className="toggle-solver" onClick={this.props.solve}>Auto-Solve</button>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {};
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({solve}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(solverButton)
