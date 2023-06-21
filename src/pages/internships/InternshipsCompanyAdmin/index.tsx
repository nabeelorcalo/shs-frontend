import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InternshipsIcon } from '../../../assets/images'
import {
  FiltersButton, PageHeader, InternshipProgressCard,
  BoxWrapper, NoDataFound, Loader
} from '../../../components'
import Drawer from '../../../components/Drawer'
import { Button, Col, Row, Input } from 'antd'
import { ROUTES_CONSTANTS } from '../../../config/constants'
import useCustomHook from '../actionHandler'
import { GlassMagnifier } from "../../../assets/images";
import UserSelector from '../../../components/UserSelector'
import '../style.scss'

const InternshipsCompanyAdmin = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [state, setState] = useState({
    showDrawer: false,
    status: undefined,
    location: undefined,
    department: undefined,
  });

  const statusArr = [
    { value: "All", label: "All" },
    { value: "PUBLISHED", label: "Published" },
    { value: "REJECTED", label: "Rejected" },
    { value: "CLOSED", label: "Closed" },
    { value: "PENDING", label: "Pending" },
    { value: "DRAFT", label: "Draft" },
  ]

  const { getAllInternshipsData, internshipData, isLoading,
    getAllDepartmentData, getAllLocationsData, departmentsData,
    locationsData, debouncedSearch }: any = useCustomHook();

  useEffect(() => {
    getAllDepartmentData();
    getAllLocationsData();
  }, [])
  
  useEffect(() => {
    getAllInternshipsData(state, searchValue);
  }, [searchValue])


  const handleDrawer = () => {
    setState((prevState) => ({
      ...prevState,
      showDrawer: !state.showDrawer
    }))
  }
  // getting filters data
  const handleStatus = (event: any) => {
    setState((prevState) => ({
      ...prevState,
      status: event
    }))
  }

  const handleLocation = (event: any) => {
    setState((prevState) => ({
      ...prevState,
      location: event
    }))
  }
  
  const handleDepartment = (event: any) => {
    setState((prevState) => ({
      ...prevState,
      department: event
    }))
  }
  // handle apply filters 
  const handleApplyFilter = () => {
    getAllInternshipsData(state);
    setState((prevState) => ({
      ...prevState,
      showDrawer: false
    }))
  }
  // handle reset filters 
  const handleResetFilter = () => {
    getAllInternshipsData();
    setState((prevState) => ({
      ...prevState,
      status: undefined,
      location: undefined,
      department: undefined,
    }))
  }
  // handle search internships 
  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };
  const filteredStatusData = statusArr?.map((item: any, index: any) => {
    return (
      {
        key: index,
        value: item?.value,
        label: item?.label
      }
    )
  })

  const filteredLocationData = locationsData?.map((item: any, index: any) => {
    return (
      {
        key: index,
        value: item?.id,
        label: item?.name
      }
    )
  })
  filteredLocationData?.unshift({ key: 'all', value: 'All', label: 'All' })
  
  const filteredDeparmentsData = departmentsData?.map((item: any, index: any) => {
    return (
      {
        key: index,
        value: item?.id,
        label: item?.name
      }
    )
  })
  filteredDeparmentsData?.unshift({ key: 'all', value: 'All', label: 'All' })

  return (
    <>
      <PageHeader bordered title="Internships" />
      <div className="flex flex-col gap-8 internship-details">
        <Row gutter={[20, 20]}>
          <Col xl={6} lg={9} md={24} sm={24} xs={24} className='input-wrapper'>
            <Input
              className='search-bar'
              placeholder="Search by name"
              onChange={debouncedResults}
              prefix={<GlassMagnifier />}
            />
          </Col>
          <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex justify-end gap-4">
            <FiltersButton label="Filters" onClick={handleDrawer} />
            <Drawer closable open={state.showDrawer} onClose={handleDrawer} title="Filters" >
              <>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <UserSelector
                      label='Status'
                      placeholder='Select'
                      value={state.status}
                      onChange={(event: any) => { handleStatus(event) }}
                      options={filteredStatusData}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <UserSelector
                      label="Location"
                      placeholder="Select"
                      value={state.location}
                      onChange={(event: any) => { handleLocation(event) }}
                      options={filteredLocationData}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <UserSelector
                      label="Department"
                      placeholder="Select"
                      value={state.department}
                      onChange={(event: any) => { handleDepartment(event) }}
                      options={filteredDeparmentsData}
                    />
                  </div>
                  <div className="flex flex-row gap-3 justify-end">
                    <Button type="default" size="middle"
                      className="button-default-tertiary" onClick={handleResetFilter}>Reset</Button>
                    <Button type="primary" size="middle" className="button-tertiary"
                      onClick={handleApplyFilter}>Apply</Button>
                  </div>
                </div>
              </>
            </Drawer>
            <Button
              type="primary"
              size="middle"
              icon={<InternshipsIcon />}
              className="button-tertiary"
              onClick={() => { navigate(ROUTES_CONSTANTS.NEW_INTERNSHIP); }}
            >
              New Internship
            </Button>
          </Col>
        </Row>
        {isLoading ? <div className='flex flex-col gap-7'>
          {internshipData?.length !== 0 ?
            internshipData?.map((item: any, index: any) => {
              return (
                <BoxWrapper key={index} boxShadow>
                  <InternshipProgressCard
                    item={item}
                    title={item?.title}
                    status={item?.status}
                    department={item?.department?.name}
                    internType={item?.internType}
                    postedBy={`${item?.jobPoster?.firstName} ${item?.jobPoster?.lastName}`}
                    locationType={item?.locationType}
                    location={item?.location?.name}
                    createdAt={item?.createdAt}
                    closingDate={item?.closingDate}
                    interns={item?.interns}
                  />
                </BoxWrapper>
              )
            }) : <NoDataFound />
          }
        </div> : <Loader />}
      </div>
    </>
  )
}

export default InternshipsCompanyAdmin
