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
import useBookingRequests from './BookingRequests/actionHandler'
import endpoints from "../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import { availablePropertiesState } from "../../store";
import api from "../../api";


  // Temporary Data
  const bookingRequestsData = [
    {
      key: '1',
      agentTitle: 'Stenna Freddi',
      address: '118-127 Park Ln, London W1K 7AF, UK',
      durationBooking: '22/09/2022 - 22/09/2022',
      rent: '£ 170/day',
      contracts: false,
      status: 'pending'
    },
    {
      key: '2',
      agentTitle: 'Keith Thompson',
      address: '118-127 Park Ln, London W1K 7AF, UK',
      durationBooking: '22/09/2022 - 22/09/2022',
      rent: '£ 170/day',
      contracts: true,
      status: 'success'
    },
    {
      key: '3',
      agentTitle: 'John Emple',
      address: '118-127 Park Ln, London W1K 7AF, UK',
      durationBooking: '22/09/2022 - 22/09/2022',
      rent: '£ 170/day',
      contracts: false,
      status: 'rejected'
    },
    {
      key: '4',
      agentTitle: 'Stenna Freddi',
      address: '118-127 Park Ln, London W1K 7AF, UK',
      durationBooking: '22/09/2022 - 22/09/2022',
      rent: '£ 170/day',
      contracts: true,
      status: 'pending'
    },
    {
      key: '5',
      agentTitle: 'Keith Thompson',
      address: '118-127 Park Ln, London W1K 7AF, UK',
      durationBooking: '22/09/2022 - 22/09/2022',
      rent: '£ 170/day',
      contracts: true,
      status: 'success'
    },
    {
      key: '6',
      agentTitle: 'John Emple',
      address: '118-127 Park Ln, London W1K 7AF, UK',
      durationBooking: '22/09/2022 - 22/09/2022',
      rent: '£ 170/day',
      contracts: false,
      status: 'rejected'
    },
    {
      key: '7',
      agentTitle: 'Stenna Freddi',
      address: '118-127 Park Ln, London W1K 7AF, UK',
      durationBooking: '22/09/2022 - 22/09/2022',
      rent: '£ 170/day',
      contracts: true,
      status: 'pending'
    },
    {
      key: '8',
      agentTitle: 'Keith Thompson',
      address: '118-127 Park Ln, London W1K 7AF, UK',
      durationBooking: '22/09/2022 - 22/09/2022',
      rent: '£ 170/day',
      contracts: true,
      status: 'success'
    },
    {
      key: '9',
      agentTitle: 'John Emple',
      address: '118-127 Park Ln, London W1K 7AF, UK',
      durationBooking: '22/09/2022 - 22/09/2022',
      rent: '£ 170/day',
      contracts: false,
      status: 'rejected'
    },
  ];

// Temporary
const agentOptions = [
  {label: 'Maria Sanoid', value: 'Maria Sanoid', thumb: "s"},
  {label: 'Janete Samson', value: 'Janete Samson', thumb: "s"},
]



const Accommodation = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const downloadBookingRequest = useBookingRequests()
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const location = useLocation()
  const [availablePropertyFiltersOpen, setAvailablePropertyFiltersOpen] = useState(false)
  const [filterValues,  setFilterValues] = useState({})
  const [savedSearchesFiltersOpen, setSavedSearchesFiltersOpen] = useState(false)
  const [selectedKey, setSelectedKey] = useState(location.pathname)
  const {ACCOMMODATION, SAVED_SEARCHES, RENTED_PROPERTIES, BOOKING_REQUESTS, ACCOMMODATION_PAYMENTS } = ROUTES_CONSTANTS
  const [availableProperties, setavAilableProperties] = useRecoilState(availablePropertiesState)
  const [loading, setLoading] = useState(false)
  const { GET_AVAILABLE_PROPERTIES } = endpoints;
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


  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    // fetchBookingRequests()
    console.log("availablePro: ", availableProperties)
  }, [])


    /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const fetchBookingRequests = async () => {
    setLoading(true)
    try {
      const response = await api.get(GET_AVAILABLE_PROPERTIES, {"moveInDate": "2023-02-01", "moveOutDate": "2023-02-02"});
      if(!response.error) {
        const {data} = response
        setavAilableProperties(data)
      }
    } catch (errorInfo) {
      return;
    } finally {
      setLoading(false)
    }
  }



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

  function applyFilterAvailableProperties(fieldsValue: any) {
    const values = {
      ...fieldsValue,
      'moveInDate': fieldsValue['moveInDate'].format('DD/MM/YYYY'),
      'moveOutDate': fieldsValue['moveOutDate'].format('DD/MM/YYYY'),
    }
    console.log('Success:', values);
  }

  const resetFormFields = () => {
    form.resetFields()
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
    console.log('Date::: ', date, dateString);
  }

  const handleChangeStatus = (value: string) => {
    console.log(`selected ${value}`);
  }

  function handledownloadBookingRequest (key:any) {
    if(key === 'pdf') {
      downloadBookingRequest.downloadPDF("Booking Requests", bookingRequestsData)
    }
    if(key === 'excel') {
      downloadBookingRequest.downloadCSV("Booking Requests", bookingRequestsData, )
    }
  }

  function handleFilterStatusBookingRequests(key: any) {
    console.log(key)
  }

  const goToPosts = () => navigate({
    pathname: '/accommodation',
    search: '?sort=date&order=newest',
  });


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
                <Dropdown 
                  overlayClassName="shs-dropdown" 
                  trigger={['click']} 
                  placement="bottomRight"
                  menu={{ 
                    items: [
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
                    ],
                    onClick: ({key}) => handleFilterStatusBookingRequests(key),
                    selectable: true,
                  }} 
                >
                  <Button className="button-sky-blue">Status<IconAngleDown /></Button>
                </Dropdown>
              </div>
              <div className="dropdown-download">
                <Dropdown
                  overlayClassName="shs-dropdown"
                  trigger={['click']}
                  placement="bottomRight"
                  menu={{ 
                    items: downloadItems,
                    onClick: ({key}) => handledownloadBookingRequest(key)
                  }}
                >
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
          <Form
            form={form}
            layout="vertical"
            name="availablePropertiesFilters"
            onValuesChange={(_, values) => {
              console.log('Filter Values:: ', values)
            }}
            onFinish={applyFilterAvailableProperties}
          >
            <div className="shs-form-group">
              <div className="form-group-title">Price Range</div>
              <Form.Item name="priceRange">
                <Slider
                  min={0}
                  max={1000}
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
                  onChange={onChange}
                  showToday={false}
                />
              </Form.Item>
              
              <Form.Item name="moveOutDate" label="Move Out Date">
                <DatePicker
                  className="filled"
                  suffixIcon={<IconDatePicker />}
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
                <ExtendedButton customType="tertiary" ghost onClick={resetFormFields}>
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