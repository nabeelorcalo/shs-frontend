import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import type { MenuProps, DatePickerProps } from 'antd';
import { PageHeader, ContentMenu, ExtendedButton, SearchBar, FiltersButton } from "../../components";
import {ROUTES_CONSTANTS} from "../../config/constants";
import {IconAngleDown, IconDocumentDownload, IconDatePicker} from '../../assets/images'
import Drawer from "../../components/Drawer";
import { Form, Select, Slider, Space, DatePicker, Dropdown, Button } from 'antd'
import avatar from '../../assets/images/header/avatar.svg'
import dayjs from 'dayjs';
import "./style.scss";

// Temporary
const agentOptions = [
  {label: 'Maria Sanoid', value: 'Maria Sanoid', thumb: "s"},
  {label: 'Janete Samson', value: 'Janete Samson', thumb: "s"},
]



const Accommodation = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate()
  const location = useLocation()
  const [availablePropertyFiltersOpen, setAvailablePropertyFiltersOpen] = useState(false)
  const [savedSearchesFiltersOpen, setSavedSearchesFiltersOpen] = useState(false)
  const [selectedKey, setSelectedKey] = useState(location.pathname)
  const {ACCOMMODATION, SAVED_SEARCHES, RENTED_PROPERTIES, BOOKING_REQUESTS, ACCOMMODATION_PAYMENTS } = ROUTES_CONSTANTS
  const items = [
    {
      label: 'Available Properties',
      key: `/${ACCOMMODATION}`,
    },
    {
      label: 'Saved Searches',
      key: `/accommodation/${SAVED_SEARCHES}`,
    },
    {
      label: 'Rented Properties',
      key: `/accommodation/${RENTED_PROPERTIES}`,
    },
    {
      label: 'Booking Requests',
      key: `/accommodation/${BOOKING_REQUESTS}`,
    },
    {
      label: 'Payments',
      key: `/accommodation/${ACCOMMODATION_PAYMENTS}`,
    },
  ]

  const downloadItems: MenuProps['items'] = [
    {
      key: 'pdf',
      label: "PDF"
    },
    {
      key: 'excel',
      label: "Excel"
    },
  ];

  const statusItems: MenuProps['items'] = [
    {
      key: 'reserved',
      label: 'Reserved'
    },
    {
      key: 'pending',
      label: 'Pending'
    },
    {
      key: 'rejected',
      label: 'Rejected'
    },
  ];

  const agentItems: MenuProps['items'] = [
    {
      key: 'reserved',
      label: 'Reserved'
    },
    {
      key: 'pending',
      label: 'Pending'
    },
    {
      key: 'rejected',
      label: 'Rejected'
    },
  ];


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

  const openAvailablePropertyFilters = () => {
    setAvailablePropertyFiltersOpen(true)
  }

  const closeAvailablePropertyFilters = () => {
    setAvailablePropertyFiltersOpen(false)
  }

  const openSavedSearchesFilters = () => {
    setSavedSearchesFiltersOpen(true)
  }

  const closeSavedSearchesFilters = () => {
    setSavedSearchesFiltersOpen(false)
  }

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  }

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log('dfdfdsfsdfas::: ', date, dateString);
  }

  const handleChangeStatus = (value: string) => {
    console.log(`selected ${value}`);
  }


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
            {location.pathname === '/accommodation' &&
              <div className="searchbar-wrapper">
                <SearchBar handleChange={() => console.log('Search')}/>
              </div>
            }
            {location.pathname === '/accommodation/rented-properties' &&
              <div className="searchbar-wrapper">
                <SearchBar handleChange={() => console.log('Search')}/>
              </div>
            }
            {location.pathname === '/accommodation/saved-searches' &&
              <div className="searchbar-wrapper">
                <SearchBar handleChange={() => console.log('Search')}/>
              </div>
            }
            {location.pathname === '/accommodation/booking-requests' &&
              <div className="searchbar-wrapper">
                <SearchBar handleChange={() => console.log('Search')}/>
              </div>
            }
            {location.pathname === '/accommodation/payments' &&
              <div className="searchbar-wrapper">
                <SearchBar handleChange={() => console.log('Search')}/>
              </div>
            }
          </div>
          <div className="page-filterbar-right">
            {location.pathname === '/accommodation' &&
              <FiltersButton
                label="Filters"
                onClick={() => openAvailablePropertyFilters()}
              />
            }
            {location.pathname === '/accommodation/saved-searches' &&
              <FiltersButton
                label="Filters"
                onClick={() => openSavedSearchesFilters()}
              />
            }
            {location.pathname === '/accommodation/booking-requests' &&
            <Space size={20} className="main-filter-btns">
              <div className="requests-filterby-agent">
                <Select 
                  className="filled"
                  placeholder="Agent"
                  onChange={handleChangeStatus}
                  popupClassName={'agents-dropdown'}
                  placement="bottomRight"
                  suffixIcon={<IconAngleDown />}
                >
                  {agentOptions.map((option) => {
                    return (
                      <Select.Option value={option.value} key={option.value}>
                        <div className="agent-option">
                          <img src={avatar} />
                          {option.label}
                        </div>
                      </Select.Option>
                    )
                  })}
                </Select>
              </div>

              <div className="requests-filterby-status">
                <Dropdown overlayClassName="shs-dropdown" menu={{ items: statusItems }} trigger={['click']} placement="bottomRight">
                  <Button className="button-sky-blue">Status<IconAngleDown /></Button>
                </Dropdown>
              </div>
              <div className="dropdown-download">
                <Dropdown overlayClassName="shs-dropdown" menu={{ items: downloadItems }} trigger={['click']} placement="bottomRight">
                  <Button className="button-sky-blue"><IconDocumentDownload /></Button>
                </Dropdown>
              </div>
            </Space>
            }
            {location.pathname === '/accommodation/payments' &&
            <Space>
                <div className="requests-filterby-agent">
                <Select 
                  className="filled"
                  placeholder="Agent"
                  onChange={handleChangeStatus}
                  popupClassName={'agents-dropdown'}
                  placement="bottomRight"
                  suffixIcon={<IconAngleDown />}
                >
                  {agentOptions.map((option) => {
                    return (
                      <Select.Option value={option.value} key={option.value}>
                        <div className="agent-option">
                          <img src={avatar} />
                          {option.label}
                        </div>
                      </Select.Option>
                    )
                  })}
                </Select>
              </div>
                
              <div className="dropdown-time-frame">
                <Dropdown overlayClassName="shs-dropdown" menu={{ items: downloadItems }} trigger={['click']} placement="bottomRight">
                  <Button className="button-sky-blue">Time Frame <IconAngleDown /></Button>
                </Dropdown>
              </div>

              <div className="dropdown-download">
                <Dropdown overlayClassName="shs-dropdown" menu={{ items: downloadItems }} trigger={['click']} placement="bottomRight">
                  <Button className="button-sky-blue"><IconDocumentDownload /></Button>
                </Dropdown>
              </div>
            </Space>
            }
          </div>
        </div>

        <ContentMenu 
          items={items}
          handleMenuClick={handleMenuClick}
          selectedKey={selectedKey}
        />

        <div className="accommodation-content">
          <Outlet />
        </div>

      </div>

      {/* Available Properties Filters 
      ***********************************************************************************/}
      <Drawer
        title="Filters"
        open={availablePropertyFiltersOpen}
        onClose={closeAvailablePropertyFilters}
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
                <DatePicker
                  className="filled"
                  suffixIcon={<IconDatePicker />}
                  format='YYYY/MM/DD'
                  onChange={onChange}
                  showToday={false}
                />
              </Form.Item>
              
              <Form.Item name="moveOutDate" label="Move Out Date">
                <DatePicker
                  className="filled"
                  suffixIcon={<IconDatePicker />}
                  format='YYYY/MM/DD'
                  onChange={onChange}
                  showToday={false}
                />
              </Form.Item>

              <Form.Item name="offer" label="Offer">
                <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                  <Select.Option value="discounts">Discounts</Select.Option>
                  <Select.Option value="noDeposit">No Deposit</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item name="accomodationType" label="Accomodation Type">
                <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                  <Select.Option value="privateRoom">Private Room</Select.Option>
                  <Select.Option value="sharedRoom">Shared Room</Select.Option>
                  <Select.Option value="apartment">Apartment</Select.Option>
                  <Select.Option value="studio">Studio</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item name="facilities" label="Facilities">
                <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
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

      {/* Saved Searches Filters 
      ***********************************************************************************/}
      <Drawer
        title="Filters"
        open={savedSearchesFiltersOpen}
        onClose={closeSavedSearchesFilters}
      >
        <div className="shs-filter-form">
          <Form layout="vertical" name="sevedSearchesFilters" onFinish={onFinish}>
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
                <DatePicker
                  className="filled"
                  suffixIcon={<IconDatePicker />}
                  format='YYYY/MM/DD'
                  onChange={onChange}
                  showToday={false}
                />
              </Form.Item>
              
              <Form.Item name="moveOutDate" label="Move Out Date">
                <DatePicker
                  className="filled"
                  suffixIcon={<IconDatePicker />}
                  format='YYYY/MM/DD'
                  onChange={onChange}
                  showToday={false}
                />
              </Form.Item>

              <Form.Item name="offer" label="Offer">
                <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                  <Select.Option value="discounts">Discounts</Select.Option>
                  <Select.Option value="noDeposit">No Deposit</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item name="accomodationType" label="Accomodation Type">
                <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                  <Select.Option value="privateRoom">Private Room</Select.Option>
                  <Select.Option value="sharedRoom">Shared Room</Select.Option>
                  <Select.Option value="apartment">Apartment</Select.Option>
                  <Select.Option value="studio">Studio</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item name="facilities" label="Facilities">
                <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
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