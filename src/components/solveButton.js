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
        <button className="toggle-solver" onClick={this.props.solve}></button>
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
