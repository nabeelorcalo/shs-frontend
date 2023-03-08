import React, { useState, useEffect } from "react";
import "./style.scss";
import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import PageHeader from "../../components/PageHeader";
import ContentMenu from "../../components/ContentMenu";
import {ROUTES_CONSTANTS} from "../../config/constants";



const Accommodation = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location)
  const [selectedKey, setSelectedKey] = useState(location.pathname)
  const {ACCOMMODATION, SAVED_SEARCHES } = ROUTES_CONSTANTS

  const items = [
    {
      label: 'Available Properties',
      key: `/${ACCOMMODATION}`,
    },
    {
      label: 'Saved Searches',
      key: `/accommodation/${SAVED_SEARCHES}`,
    },
  ]


  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {

  }, [])



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleMenuClick: MenuProps['onClick'] = (item) => {
    console.log(item)
    if(item.key) {
      setSelectedKey(item.key)
      navigate(item.key)
    }
  };


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="page-content">
      <PageHeader
        title="Accommodation"
      />
      <div className="page-filterbar">
        <div className="page-filterbar-left">

        </div>
        <div className="page-filterbar-right">

        </div>
      </div>

      <ContentMenu 
        items={items}
        handleMenuClick={handleMenuClick}
        selectedKey={selectedKey}
      />
    </div>
  )
}

export default Accommodation