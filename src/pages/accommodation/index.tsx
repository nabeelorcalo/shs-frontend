import React, { useState, useEffect } from "react";
import "./style.scss";
import type { MenuProps } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import PageHeader from "../../components/PageHeader";
import ContentMenu from "../../components/ContentMenu";
import {ROUTES_CONSTANTS} from "../../config/constants";
import FiltersButton from "../../components/FiltersButton";
import Drawer from "../../components/Drawer";
import { Form, Input,  Select, Slider, Space, DatePicker } from 'antd'
import ExtendedButton from '../../components/ExtendedButton'
import { CommonDatePicker } from "../../components";
import dayjs from 'dayjs';
import type { DatePickerProps } from 'antd';


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

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log('dfdfdsfsdfas::: ', date, dateString);
  };


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <div className="page-content">
        <PageHeader
          title="Accommodation"
          bordered
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

      {/* Available Properties Drawer */}
      <Drawer
        title="Filters"
        open={drawerOpen}
        onClose={closeDrawer}
      >
        <div className="shs-filter-form">
          <Form layout="vertical" name="availablePropertiesFilters" onFinish={onFinish}>
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
                  <DatePicker format='YYYY/MM/DD' onChange={onChange} />
                </Form.Item>
                
                <Form.Item name="moveOutDate" label="Move Out Date">
                  <DatePicker format='YYYY/MM/DD' onChange={onChange} />
                </Form.Item>

                {/* <Form.Item label="Username" name="username">
                  <Input placeholder="User anme" />
                </Form.Item> */}

                <Form.Item name="offer" label="Offer">
                  <Select placeholder="Select">
                    <Select.Option value="discounts">Discounts</Select.Option>
                    <Select.Option value="noDeposit">No Deposit</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item name="accomodationType" label="Accomodation Type">
                  <Select placeholder="Select">
                    <Select.Option value="privateRoom">Private Room</Select.Option>
                    <Select.Option value="sharedRoom">Shared Room</Select.Option>
                    <Select.Option value="apartment">Apartment</Select.Option>
                    <Select.Option value="studio">Studio</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item name="facilities" label="Facilities">
                  <Select placeholder="Select">
                    <Select.Option value="bills">Bills</Select.Option>
                    <Select.Option value="Wi-fi">Wi-fi</Select.Option>
                    <Select.Option value="laundary">Laundary</Select.Option>
                    <Select.Option value="meals">Meals</Select.Option>
                  </Select>
                </Form.Item>
            </div>
            <Form.Item style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Space align="end" size={20}>
                <ExtendedButton customType="tertiary" ghost>
                  Reset
                </ExtendedButton>
                <ExtendedButton customType="tertiary" htmlType="submit">
                  Apply
                </ExtendedButton>
              </Space>
            </Form.Item> 
          </Form>
        </div>
      </Drawer>
    </>
  )
}

export default Accommodation