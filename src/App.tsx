import React, { FC, useEffect } from 'react'
import AppLayout from './layout'
import "./App.scss";
import Charts from './components/ChartsOfGraphs/Charts';

function App() {
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
      <AppLayout />
      <Charts  />
    </>
  )
}

export default App
