import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InternshipsIcon } from '../../../assets/images'
import {
  DropDown, SearchBar, FiltersButton, PageHeader, InternshipProgressCard,
  BoxWrapper, NoDataFound
} from '../../../components'
import Drawer from '../../../components/Drawer'
import { Button, Col, Row, Spin, Select } from 'antd'
import { ROUTES_CONSTANTS } from '../../../config/constants'
import useCustomHook from '../actionHandler'
import '../style.scss'

const InternshipsCompanyAdmin = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    showDrawer: false,
    status: undefined,
    location: undefined,
    department: undefined
  });

  const { getAllInternshipsData, internshipData, changeHandler, isLoading,
    getAllDepartmentData, getAllLocationsData, departmentsData, locationsData }: any = useCustomHook();

  useEffect(() => {
    getAllInternshipsData(state.status, state.location, state.department);
    getAllDepartmentData();
    getAllLocationsData();
  }, [])

  const handleDrawer = () => {
    setState((prevState) => ({
      ...prevState,
      showDrawer: !state.showDrawer
    }))
  }
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
  const handleApplyFilter = () => {
    getAllInternshipsData(state.status, state.location, state.department);
    setState((prevState) => ({
      ...prevState,
      showDrawer: false
    }))
  }
  const handleResetFilter = () => {
    setState((prevState) => ({
      ...prevState,
      status: undefined,
      location: undefined,
      department: undefined
    }))
  }
  return (
    <>
      <PageHeader bordered title="Internships" />
      <div className="flex flex-col gap-8 internship-details">
        <Row gutter={[20, 20]}>
          <Col xl={6} lg={9} md={24} sm={24} xs={24}>
            <SearchBar handleChange={changeHandler} name="search bar" placeholder="Search" size="middle" />
          </Col>
          <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex justify-end gap-4">
            <FiltersButton label="Filters" onClick={handleDrawer} />
            <Drawer closable open={state.showDrawer} onClose={handleDrawer} title="Filters" >
              <>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label>Status</label>
                    <Select
                      className='my-select'
                      placeholder="Select"
                      value={state.status}
                      onChange={(event: any) => {  handleStatus(event) }}
                      options={internshipData?.map((item: any) => {
                        return { value: item?.status, label: item?.status }
                      })}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>Location</label>
                    <Select
                      className='my-select'
                      placeholder="Select"
                      value={state.location}
                      onChange={(event: any) => { handleLocation(event) }}
                      options={locationsData?.map((item: any) => {
                        return { value: item?.id, label: item?.name }
                      })}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>Department</label>
                    <Select
                      className='my-select'
                      placeholder="Select"
                      value={state.department}
                      onChange={(event: any) => { handleDepartment(event) }}
                      options={departmentsData?.map((item: any) => {
                        return { value: item?.id, label: item?.name }
                      })}
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
          {internshipData.length !== 0 ?
            internshipData?.map((item: any, idx: any) => {
              return (
                <BoxWrapper key={idx} boxShadow>
                  <InternshipProgressCard
                    item={item}
                    title={item.title}
                    status={item.status}
                    department={item.department.name}
                    internType={item.internType}
                    postedBy={item.postedBy}
                    locationType={item.locationType}
                    location={item.location.name}
                    createdAt={item.createdAt}
                    closingDate={item.closingDate}
                    interns={item.interns}
                  />
                </BoxWrapper>
              )
            }) : <NoDataFound />
          }
        </div> : <Spin tip="Processing...." />}
      </div>
    </>
  )
}

export default InternshipsCompanyAdmin
