/**
 * Created by adam.kazberuk on 12/7/2016.
 */
import React from 'react'
import Tile from './tile'

const Row = props => (
  <div className='boardRow'>{
    props.value.map((x, i) =>
      <Tile number={x} key={i}/>
    )
  }</div>
)

export default Row
