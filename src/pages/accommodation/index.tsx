import React, { useState, useEffect } from "react";
import "./style.scss";
import type { MenuProps } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import PageHeader from "../../components/PageHeader";
import ContentMenu from "../../components/ContentMenu";
import {ROUTES_CONSTANTS} from "../../config/constants";
import FiltersButton from "../../components/FiltersButton";
import Drawer from "../../components/Drawer";
import { Form, Input, Button, Slider } from 'antd'


const Accommodation = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate()
  const location = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)
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
    if(item.key) {
      setSelectedKey(item.key)
      navigate(item.key)
    }
  };

  const openDrawer = () => {
    setDrawerOpen(true)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
  }


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <div className="page-content">
        <PageHeader
          title="Accommodation"
        />
        <div className="page-filterbar">
          <div className="page-filterbar-left">

          </div>
          <div className="page-filterbar-right">
            <FiltersButton
              label="Filters"
              onClick={() => openDrawer()}
            />
          </div>
        </div>

        <ContentMenu 
          items={items}
          handleMenuClick={handleMenuClick}
          selectedKey={selectedKey}
        />

          <Outlet />
      </div>

      <Drawer
        title="Filters"
        open={drawerOpen}
        onClose={closeDrawer}
      >
        <div className="shs-filter-form">
          <Form layout="vertical">
            <div className="shs-form-group">
              <div className="form-group-title">Price Range</div>
              <Form.Item name="priceRange">
                <Slider
                  min={0}
                  max={1000}
                  defaultValue={0}
                  marks={{
                    0: '£0',
                    1000: '£1000',
                  }}
                />
              </Form.Item>
            </div>
            <div className="shs-form-group">
              <div className="form-group-title">Availability</div>
                <Form.Item name="moveInDate" label="Move in Date">
                  
                </Form.Item>
                <Form.Item name="moveOutDate" label="Move Out Date">
                  
                </Form.Item>
            </div>
          </Form>
        </div>
      </Drawer>
    </>
  )
}

export default Accommodation