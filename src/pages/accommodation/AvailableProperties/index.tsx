import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input,  Select, Button, Slider } from 'antd'
import "./style.scss";



const AvailableProperties = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate()
  const location = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)



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
      Available Properties
    </>
  )
}

export default AvailableProperties