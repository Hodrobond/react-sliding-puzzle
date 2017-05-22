/**
 * Created by adam.kazberuk on 12/6/2016.
 */
import React from 'react'

import './tile.css'

class Tile extends React.Component{
  render(){
    return(
      <div className={"tile tile-"+this.props.number}>{this.props.number}</div>
    )
  }
}

export default Tile
