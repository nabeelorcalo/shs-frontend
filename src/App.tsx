import React, {FC, useEffect, useState} from 'react'
import { AddEventInCalendar } from './components/AddEventInCalendar';
import { HorizonalLineCard } from './components/HorizontalLineCard';
import AppLayout from './layout'



function App() {
  const [open, setOpen] = useState(false)
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {

  }, [])



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
    <button onClick={()=> setOpen(true)}>dddd</button>
    <AppLayout />
    <AddEventInCalendar open={open} setOpen={setOpen} zoomVideoLink="https://zoom.com/call/0234"   title="Add Event"/>
   
    </>
  )
}

export default App;
