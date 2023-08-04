import { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import type { MenuProps } from 'antd';
import {ROUTES_CONSTANTS} from "../../config/constants";
import {IconAngleDown, IconDocumentDownload, IconCloseModal} from '../../assets/images';
import Drawer from "../../components/Drawer";
import { Form, Select, Slider, Space, Dropdown, Button, Avatar } from 'antd';
import { PageHeader, ContentMenu, ExtendedButton, SearchBar, FiltersButton, DropDown } from "../../components";
import "./style.scss";
import dayjs from 'dayjs';
import useBookingRequests from './BookingRequests/actionHandler';
import usePaymentsHook from "./Payments/actionHandler";
import useAccommodationHook from "./actionHandler";
import { useRecoilState, useResetRecoilState } from "recoil";
import { 
  filterParamsState,
  paymentsFilterState,
  bookingRequestsFilterState,
  searchRentedState,
  savedFilterState
} from "../../store";


const Accommodation = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const {bookingRequests, downloadCSV, downloadPDF} = useBookingRequests();
  const {paymentList, downloadPaymentsCSV, downloadPaymentsPDF} = usePaymentsHook()
  const [propertiesFilterForm] = Form.useForm();
  const [savedFilterForm] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [propertyFiltersOpen, setPropertyFiltersOpen] = useState(false);
  const [savedFiltersOpen, setSavedFiltersOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState(location.pathname);
  const {getAllPropertyAgents, allAgents} = useAccommodationHook();
  const [filterParams, setFilterParams] = useRecoilState(filterParamsState);
  const resetFilterParams = useResetRecoilState(filterParamsState);
  const [savedFilter, setSavedFilter] = useRecoilState(savedFilterState);
  const resetSavedFilter = useResetRecoilState(savedFilterState);
  const [filterBookingRequest, setFilterBookingRequest] = useRecoilState(bookingRequestsFilterState);
  const [paymentFilters, setPaymentFilters] = useRecoilState(paymentsFilterState);
  const [rentedSearchText, setRentedSearchText] = useRecoilState(searchRentedState);
  const [timeFrameValue, setTimeFrameValue] = useState('Time Frame');
  const {
    ACCOMMODATION,
    SAVED_SEARCHES,
    RENTED_PROPERTIES,
    BOOKING_REQUESTS,
    ACCOMMODATION_PAYMENTS 
  } = ROUTES_CONSTANTS;
  const items = [
    {
      label: 'Available Properties',
      key: `/${ACCOMMODATION}`,
    },
    {
      label: 'Saved Properties',
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
    getAllPropertyAgents()
  }, [])

  useEffect(() => {
    propertiesFilterForm.resetFields();
  }, [propertiesFilterForm, navigate]);

  useEffect(() => {
    savedFilterForm.resetFields();
  }, [savedFilterForm, navigate]);


    /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/
  


  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleMenuClick: MenuProps['onClick'] = (item) => {
    if(item.key) {
      setSelectedKey(item.key)
      navigate(item.key,  {state: {from: location.pathname}})
    }
  };

  // Available Filters
  const openPropertyFilters = () => {
    setPropertyFiltersOpen(true)
  }

  const closePropertyFilters = () => {
    setPropertyFiltersOpen(false)
  }

  function submitFilters(fieldsValue: any) {
    let params:any = {}
    if(fieldsValue.priceRange !== undefined) {
      params.minPrice = fieldsValue.priceRange[0];
      params.maxPrice = fieldsValue.priceRange[1];
    }
    if(fieldsValue.offer !== undefined) {
      if(fieldsValue.offer.includes('Discounts')) {
        params.offer = fieldsValue.offer.includes('Discounts')
      }
      if(fieldsValue.offer.includes('No Deposit')) {
        params.depositRequired = fieldsValue.offer.includes('No Deposit')
      }
    }
    if(fieldsValue.accomodationType !== undefined) {
      params.propertyType = fieldsValue.accomodationType
    }
    if(fieldsValue.facilities !== undefined) {
      if(fieldsValue.facilities.includes('bills')) {
        params.billsIncluded = fieldsValue.facilities.includes('bills')
      }
      if(fieldsValue.facilities.includes('Wi-fi')) {
        params.hasWifi = fieldsValue.facilities.includes('Wi-fi')
      }
      if(fieldsValue.facilities.includes('laundary')) {
        params.hasWashingMachine = fieldsValue.facilities.includes('laundary')
      }
    }
    setFilterParams((prev) => {
      return {
        ...prev,
        ...params
      }
    })
    closePropertyFilters()
  }

  const resetFormFields = () => {
    propertiesFilterForm.resetFields()
    resetFilterParams()
    closePropertyFilters()
  }

  const handleSearchProperties = (value:any) => {
    setFilterParams((prev) => {
      return {
        ...prev,
        search: value
      }
    })
  }

  // Saved Properties Filter
  const openSavedFilters = () => {
    setSavedFiltersOpen(true)
  }
  const closeSavedFilters = () => {
    setSavedFiltersOpen(false)
  }
  function submitSavedFilters(fieldsValue: any) {
    let params:any = {}
    if(fieldsValue.priceRange !== undefined) {
      params.minPrice = fieldsValue.priceRange[0];
      params.maxPrice = fieldsValue.priceRange[1];
    }
    if(fieldsValue.offer !== undefined) {
      if(fieldsValue.offer.includes('Discounts')) {
        params.offer = fieldsValue.offer.includes('Discounts')
      }
      if(fieldsValue.offer.includes('No Deposit')) {
        params.depositRequired = fieldsValue.offer.includes('No Deposit')
      }
    }
    if(fieldsValue.accomodationType !== undefined) {
      params.propertyType = fieldsValue.accomodationType
    }
    if(fieldsValue.facilities !== undefined) {
      if(fieldsValue.facilities.includes('bills')) {
        params.billsIncluded = fieldsValue.facilities.includes('bills')
      }
      if(fieldsValue.facilities.includes('Wi-fi')) {
        params.hasWifi = fieldsValue.facilities.includes('Wi-fi')
      }
      if(fieldsValue.facilities.includes('laundary')) {
        params.hasWashingMachine = fieldsValue.facilities.includes('laundary')
      }
    }
    
    setSavedFilter((prev) => {
      return {
        ...prev,
        ...params
      }
    })
    closeSavedFilters()
  }
  const handleSearchSavedProperties = (value:any) => {
    setSavedFilter((prev) => {
      return {
        ...prev,
        search: value
      }
    })
  }

  const resetSavedFormFields = () => {
    savedFilterForm.resetFields()
    resetSavedFilter()
    closeSavedFilters()
  }

  // Rented Properties Search
  const handleRentedSearch = (value: any) => {
    setRentedSearchText({searchText: value})
  }

  const handleBookingRequestSearch = (value: any) => {
    setFilterBookingRequest((prev:any) => {
      return {
        ...prev,
        searchText: value
      }
    })
  }
  
  // Booking Requests Filter
  const handleFilterAgent = (value: any) => {
    setFilterBookingRequest((prev:any) => {
      return {...prev, agentId: value}
    })
  }

  const handleFilterStatus = (value: any) => {
    setFilterBookingRequest((prev:any) => {
      return {
        ...prev,
        status: value
      }
    })
  }
  
  const bookingRequestsData = () => {
    return bookingRequests?.map((data: any) => ({
      key: data.id,
      agentTitle: `${data?.agent?.firstName} ${data?.agent?.lastName}`,
      address: data?.property?.addressOne,
      durationBooking: `${dayjs(data?.bookingStartDate).format('DD/MM/YYYY')} - ${dayjs(data?.bookingEndDate).format('DD/MM/YYYY')}`,
      rent: `£${data.rent}/day`,
      status: data.status
    })) || [];
  };
  
  const handleDownloadBookingRequest =  (key:any) => {
    if(key === 'pdf') {
      downloadPDF("Booking Requests", bookingRequestsData())
    }
    if(key === 'excel') {
      downloadCSV("Booking Requests", bookingRequestsData())
    }
  };

  // Payments Filters
  const paymentsData = () => {
    return paymentList?.map((data: any) => ({
      key: data.id,
      agentName: `${data?.booking?.agent?.firstName} ${data?.booking?.agent?.lastName}`,
      address: data?.booking?.property?.addressOne,
      rentPeriod: `${dayjs(data?.booking?.bookingStartDate).format('DD/MM/YYYY')} - ${dayjs(data?.booking?.bookingEndDate).format('DD/MM/YYYY')}`,
      rentAmount: `£${data?.booking?.discountedRent}/${data?.booking?.rentDuration}`,
      date: dayjs(data.createdAt).format('DD/MM/YYYY'),
      status: "Paid"
    })) || [];
  }

  const handleDownloadPayments =  (key:any) => {
    if(key === 'pdf') {
      downloadPaymentsPDF("Payments", paymentsData())
    }
    if(key === 'excel') {
      downloadPaymentsCSV("Payments", paymentsData())
    }
  };

  const handleSearchPaymentAgents = (value:any) => {
    setPaymentFilters((prev) => {
      return {
        ...prev,
        search: value
      }
    })
  }

  const handleFilterPaymentAgents = (value:any) => {
    setPaymentFilters((prev) => {
      return {
        ...prev,
        agentId: value
      }
    })
  }

  const getFilterType = (value:any) => {
    let filterType;
    if (value === "This Week") {
      filterType = 'THIS_WEEK';
    } else if (value === "Last Week") {
      filterType = 'LAST_WEEK';
    } else if (value === "This Month") {
      filterType = 'THIS_MONTH';
    } else if (value === "Last Month") {
      filterType = 'LAST_MONTH';
    } else {
      filterType = 'DATE_RANGE';
    }
    return filterType;
  }

  const handleTimeFrameFilter = (value:any) => {
    let filterType = getFilterType(value);
    const date = dayjs(new Date()).format("YYYY-MM-DD");
    if(filterType === 'DATE_RANGE') {
      const [startDate, endDate] = value.split(",").map((date:any) => date.trim());
      setTimeFrameValue(`${startDate} , ${endDate}`);
      setPaymentFilters((prev) => {
        return {
          ...prev,
          filterType: filterType,
          startDate: startDate,
          endDate: endDate
        }
      })
    } else {
      setTimeFrameValue(value);
      setPaymentFilters((prev) => {
        return {
          ...prev,
          filterType: filterType,
          currentDate: date
        }
      })
    }
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
                <SearchBar value={undefined} handleChange={handleSearchProperties} placeholder="Search by address" />
              </div>
            }
            {location.pathname === '/accommodation/rented-properties' &&
              <div className="searchbar-wrapper">
                <SearchBar handleChange={handleRentedSearch} placeholder="Search by address" />
              </div>
            }
            {location.pathname === '/accommodation/saved-searches' &&
              <div className="searchbar-wrapper">
                <SearchBar value={undefined} handleChange={handleSearchSavedProperties} placeholder="Search by address"/>
              </div>
            }
            {location.pathname === '/accommodation/booking-requests' &&
              <div className="searchbar-wrapper">
                <SearchBar handleChange={handleBookingRequestSearch} placeholder="Search by address"/>
              </div>
            }
            {location.pathname === '/accommodation/payments' &&
              <div className="searchbar-wrapper">
                <SearchBar value={undefined} handleChange={handleSearchPaymentAgents} placeholder="Search by address" />
              </div>
            }
          </div>
          <div className="page-filterbar-right">
            {location.pathname === '/accommodation' &&
              <FiltersButton
                label="Filters"
                onClick={() => openPropertyFilters()}
              />
            }
            {location.pathname === '/accommodation/saved-searches' &&
              <FiltersButton
                label="Filters"
                onClick={() => openSavedFilters()}
              />
            }
            {location.pathname === '/accommodation/booking-requests' &&
            <Space size={20} className="main-filter-btns">
              <div className="requests-filterby-agent">
                <Select 
                  className="filled"
                  placeholder="Agent"
                  onChange={handleFilterAgent}
                  popupClassName={'agents-dropdown'}
                  placement="bottomRight"
                  suffixIcon={<IconAngleDown />}
                  clearIcon={<IconCloseModal />}
                  allowClear
                >
                  {allAgents?.map((agent:any) => {
                    return (
                      <Select.Option value={agent?.id} key={agent?.id}>
                        <div className="agent-option">
                          <Avatar size={24} src={agent?.avatar}>
                            {agent?.firstName.charAt(0)}{agent?.lastName.charAt(0)}
                          </Avatar>
                          {agent?.firstName} {agent?.lastName}
                        </div>
                      </Select.Option>
                    )
                  })}
                </Select>
              </div>

              <div className="requests-filterby-status">
                <Select
                  className="filled"
                  placeholder="Status"
                  onChange={handleFilterStatus}
                  placement="bottomRight"
                  suffixIcon={<IconAngleDown />}
                  clearIcon={<IconCloseModal />}
                  allowClear
                >
                  <Select.Option value="reserved">Reserved</Select.Option>
                  <Select.Option value="pending">Pending</Select.Option>
                  <Select.Option value="rejected">Rejected</Select.Option>
                </Select>
              </div>
              <div className="dropdown-download">
                <Dropdown
                  overlayClassName="shs-dropdown"
                  trigger={['click']}
                  placement="bottomRight"
                  menu={{ 
                    items: downloadItems,
                    onClick: ({key}) => handleDownloadBookingRequest(key)
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
                  onChange={handleFilterPaymentAgents}
                  popupClassName={'agents-dropdown'}
                  placement="bottomRight"
                  suffixIcon={<IconAngleDown />}
                  clearIcon={<IconCloseModal />}
                  allowClear
                >
                  {allAgents?.map((agent:any) => {
                    return (
                      <Select.Option value={agent?.id} key={agent?.id}>
                        <div className="agent-option">
                          <Avatar size={24} src={agent?.avatar}>
                            {agent?.firstName.charAt(0)}{agent?.lastName.charAt(0)}
                          </Avatar>
                          {agent?.firstName} {agent?.lastName}
                        </div>
                      </Select.Option>
                    )
                  })}
                </Select>
              </div>
                
              <div className="dropdown-time-frame">
                <DropDown
                  name="Time Frame"
                  options={["This Week", "Last Week", "This Month", "Last Month", "Date Range"]}
                  showDatePickerOnVal={"Date Range"}
                  setValue={handleTimeFrameFilter}
                  requireRangePicker
                  placement="bottomRight"
                  dateRangePlacement="bottomRight"
                  value={timeFrameValue}
                />
              </div>

              <div className="dropdown-download">
                <Dropdown 
                  overlayClassName="shs-dropdown" 
                  placement="bottomRight"
                  trigger={['click']} 
                  menu={{ 
                    items: downloadItems,
                    onClick: ({key}) => handleDownloadPayments(key)
                  }} 
                >
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
        open={propertyFiltersOpen}
        onClose={closePropertyFilters}
      >
        <div className="shs-filter-form">
          <Form
            form={propertiesFilterForm}
            layout="vertical"
            name="propertiesFilters"
            onFinish={submitFilters}
          >
            <div className="shs-form-group">
              <div className="form-group-title">Price Range</div>
              <Form.Item name="priceRange">
                <Slider
                  range={true}
                  min={0}
                  max={1000}
                  marks={{
                    0: '£0',
                    1000: '£1000',
                  }}
                />
              </Form.Item>
            </div>
            {/* <div className="shs-form-group">

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
            </div> */}

            <Form.Item name="offer" label="Offer">
              <Select placeholder="Select" suffixIcon={<IconAngleDown />} mode="multiple" optionLabelProp="label" popupClassName='offer-filter'>
                <Select.Option value="Discounts">Discounts</Select.Option>
                <Select.Option value="No Deposit">No Deposit</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="accomodationType" label="Accomodation Type">
              <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                <Select.Option value="Entire Property">Entire Property</Select.Option>
                <Select.Option value="Studio">Studio</Select.Option>
                <Select.Option value="Rooms In Shared Property">Rooms In Shared Property</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="facilities" label="Facilities">
              <Select placeholder="Select" suffixIcon={<IconAngleDown />} mode="multiple" optionLabelProp="label">
                <Select.Option value="bills">Bills</Select.Option>
                <Select.Option value="Wi-fi">Wi-fi</Select.Option>
                <Select.Option value="laundary">Laundary</Select.Option>
                {/* <Select.Option value="meals">Meals</Select.Option> */}
              </Select>
            </Form.Item>
            
            <Form.Item style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Space align="end" size={20}>
                <ExtendedButton customType="tertiary" ghost onClick={() => resetFormFields()}>
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
        open={savedFiltersOpen}
        onClose={closeSavedFilters}
      >
        <div className="shs-filter-form">
          <Form
            form={savedFilterForm}
            layout="vertical"
            name="propertiesFilters"
            onFinish={submitSavedFilters}
          >
            <div className="shs-form-group">
              <div className="form-group-title">Price Range</div>
              <Form.Item name="priceRange">
                <Slider
                  range={true}
                  min={0}
                  max={1000}
                  marks={{
                    0: '£0',
                    1000: '£1000',
                  }}
                />
              </Form.Item>
            </div>
            {/* <div className="shs-form-group">

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
            </div> */}

            <Form.Item name="offer" label="Offer">
              <Select placeholder="Select" suffixIcon={<IconAngleDown />} mode="multiple" optionLabelProp="label" popupClassName='offer-filter'>
                <Select.Option value="Discounts">Discounts</Select.Option>
                <Select.Option value="No Deposit">No Deposit</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="accomodationType" label="Accomodation Type">
              <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                <Select.Option value="Entire Property">Entire Property</Select.Option>
                <Select.Option value="Studio">Studio</Select.Option>
                <Select.Option value="Rooms In Shared Property">Rooms In Shared Property</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="facilities" label="Facilities">
              <Select placeholder="Select" suffixIcon={<IconAngleDown />} mode="multiple" optionLabelProp="label">
                <Select.Option value="bills">Bills</Select.Option>
                <Select.Option value="Wi-fi">Wi-fi</Select.Option>
                <Select.Option value="laundary">Laundary</Select.Option>
                {/* <Select.Option value="meals">Meals</Select.Option> */}
              </Select>
            </Form.Item>
            
            <Form.Item style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Space align="end" size={20}>
                <ExtendedButton customType="tertiary" ghost onClick={() => resetSavedFormFields()}>
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