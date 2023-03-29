import React, { useState } from 'react'
import { CardViewIcon, ListViewIcon } from '../../assets/images'
import './style.scss'

export const ListAndGridViewButton = () => {
  const [showGrid, setShowGrid] = useState(false)
  const [showTable, setShowTable] = useState(false)
  const [activeButton, setActiveButton] = useState()

  const handleClick = (buttonIndex:any) => { 
    setActiveButton(buttonIndex);
  }
  
  return (
    <div className="text-input-bg-color p-2 flex gap-2">
      <div className={`button ${activeButton === 0 ? 'active' : ''}`}
        onClick={() => {
          setShowGrid(true);
          setShowTable(false);
          handleClick(0);
          console.log("LIst icon clicked")
        }}
      >
        <ListViewIcon className='img-style' />
      </div>
      <div
        className={`button ${activeButton === 1 ? 'active' : ''}`}
        onClick={() => {
          setShowTable(true);
          setShowGrid(false);
          handleClick(1);
          console.log("Card icon clicked")
        }}
      >
        {/* <img src={ListViewIcon} alt="" className='img-style' /> */}
        <CardViewIcon className='img-style'  />
      </div>
    </div>
  )
}
