import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InternshipsIcon } from '../../../assets/images'
import { DropDown, SearchBar, FiltersButton, PageHeader, InternshipProgressCard, BoxWrapper, NoDataFound } from '../../../components'
import Drawer from '../../../components/Drawer'
import { Button, Col, Row } from 'antd'
import { ROUTES_CONSTANTS } from '../../../config/constants'
import useCustomHook from '../actionHandler'
import '../style.scss'

const InternshipsCompanyAdmin = () => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    showDrawer: false,
    status: "",
    location: "",
    department: ""
  })

  const { getAllInternshipsData, internshipData, changeHandler } = useCustomHook()
  useEffect(() => {
    getAllInternshipsData()
  }, [])
  
  const handleDrawer = () => {
    setState((prevState) => ({
      ...prevState,
      showDrawer: !state.showDrawer
    }))
  }
  const updateStatus = (event: any) => {
    const value = event.target.innerText;
    setState((prevState) => ({
      ...prevState,
      status: value
    }))
  }
  const updateLocation = (event: any) => {
    const value = event.target.innerText;
    setState((prevState) => ({
      ...prevState,
      location: value
    }))
  }
  const updateDepartment = (event: any) => {
    const value = event.target.innerText;
    setState((prevState) => ({
      ...prevState,
      department: value
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
          <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex justify-end gap-4 internship-right-sec">
            <FiltersButton label="Filters" onClick={handleDrawer} />
            <Drawer closable open={state.showDrawer} onClose={handleDrawer} title="Filters" >
              <React.Fragment key=".0">
                <div className="flex flex-col gap-12">
                  <div className="flex flex-col gap-2">
                    <p>Status</p>
                    <DropDown
                      name="Select"
                      options={[
                        'Published',
                        'Closed',
                        'Pending',
                        'Draft',
                        'All'
                      ]}
                      setValue={() => { updateStatus(event) }}
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value={state.status}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Location</p>
                    <DropDown
                      name="Select"
                      options={[
                        'EidinBurg',
                        'Glasgow',
                        'London',
                        'Virtual',
                        'All'
                      ]}
                      setValue={() => { updateLocation(event) }}
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value={state.location}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Department</p>
                    <DropDown
                      name="Select"
                      options={[
                        'Business analyst',
                        'Research analyst',
                        'Accountant',
                        'Administrator',
                        'HR Cordinator',
                        'All'
                      ]}
                      setValue={() => { updateDepartment(event) }}
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value={state.department}
                    />
                  </div>
                  <div className="flex flex-row gap-3 justify-end">
                    <Button type="default" size="middle" className="button-default-tertiary" onClick={() => navigate("#")}>Reset</Button>
                    <Button type="primary" size="middle" className="button-tertiary" onClick={() => navigate("#")}>Apply</Button>
                  </div>
                </div>
              </React.Fragment>
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
        <div className='flex flex-col gap-7'>
          {internshipData.length === 0 ? <NoDataFound /> :
            internshipData?.map((item: any, idx: any) => {
              return (
                <BoxWrapper key={idx} boxShadow>
                  <InternshipProgressCard
                    id={item.id}
                    title={item.title}
                    status={item.status}
                    department={item.departmentData.name}
                    internType={item.internType}
                    postedBy={item.postedBy}
                    locationType={item.locationType}
                    locationName={item.locationName}
                    createdAt={item.createdAt}
                    closingDate={item.closingDate}
                    interns={item.interns}
                  />
                </BoxWrapper>
              )
            })
          }

        </div>
      </div>
    </>
  )
}

export default InternshipsCompanyAdmin
