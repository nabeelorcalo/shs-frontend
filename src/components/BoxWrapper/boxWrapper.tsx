import React from 'react'
import "./BoxStyle.scss"

const BoxWrapper = (props:any) => {
  return (
    <div className='BoxWrapper'>{props.children}</div>
  )
}

export default BoxWrapper