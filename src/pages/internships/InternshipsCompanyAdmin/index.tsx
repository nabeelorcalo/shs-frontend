import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InternshipsIcon } from '../../../assets/images'
import { DropDown, SearchBar, FiltersButton, PageHeader, InternshipProgressCard, BoxWrapper} from '../../../components'
import Drawer from '../../../components/Drawer'
import { Button, Col, Row } from 'antd'
import '../../../scss/global-color/Global-colors.scss'
import '../style.scss'
import { ROUTES_CONSTANTS } from '../../../config/constants'
// import UploadDocument from '../../../components/UploadDocument';

const dummyResponse = {
  "statusCode": 200,
  "message": "Success",
  "data": [{
    "id": 1,
    "companyId": 1,
    "postedBy": 4,
    "title": "Node JS",
    "department": 1,
    "description": "internship for Node JS position",
    "responsibilities": "Backend development",
    "requirements": "coding basic concepts",
    "internType": "FULL_TIME",
    "locationType": "ONSITE",
    "locationName": "UK",
    "salaryType": "PAID",
    "salaryFrequency": "MONTHLY",
    "salaryCurrency": "$",
    "salaryAmount": 2000,
    "totalPositions": 10,
    "closingDate": "2023-04-30",
    "duration": "6 months",
    "status": "Pending",
    "isDeleted": false,
    "createdAt": "2023-03-21T14:02:11.136Z",
    "updatedAt": "2023-03-21T14:02:11.136Z",
    "interns": [{
      "id": 1,
      "companyId": 1,
      "internshipId": 1,
      "userId": 3,
      "rating": null,
      "stage": "interviewed",
      "offerLetter": null,
      "userType": "Intern",
      "joiningDate": "2023-03-21T14:02:11.136Z",
      "internStatus": "employed",
      "internshipEndDate": null,
      "terminationReason": null,
      "assignedManager": 4,
      "createdAt": "2023-03-21T14:12:13.800Z",
      "updatedAt": "2023-03-21T14:12:13.800Z"
    }, {
      "id": 2,
      "companyId": 1,
      "internshipId": 1,
      "userId": 4,
      "rating": null,
      "stage": "applied",
      "offerLetter": null,
      "userType": "candidate",
      "joiningDate": null,
      "internStatus": null,
      "internshipEndDate": null,
      "terminationReason": null,
      "assignedManager": null,
      "createdAt": "2023-04-05T04:39:35.253Z",
      "updatedAt": "2023-04-05T04:39:35.253Z"
    },
    {
      "id": 3,
      "companyId": 1,
      "internshipId": 2,
      "userId": 7,
      "rating": null,
      "stage": "hired",
      "offerLetter": null,
      "userType": "candidate",
      "joiningDate": null,
      "internStatus": null,
      "internshipEndDate": null,
      "terminationReason": null,
      "assignedManager": null,
      "createdAt": "2023-04-07T05:37:40.188Z",
      "updatedAt": "2023-04-07T05:37:40.188Z"
    },
    {
      "id": 3,
      "companyId": 1,
      "internshipId": 2,
      "userId": 7,
      "rating": null,
      "stage": "hired",
      "offerLetter": null,
      "userType": "candidate",
      "joiningDate": null,
      "internStatus": null,
      "internshipEndDate": null,
      "terminationReason": null,
      "assignedManager": null,
      "createdAt": "2023-04-07T05:37:40.188Z",
      "updatedAt": "2023-04-07T05:37:40.188Z"
    }]
  }, {
    "id": 2,
    "companyId": 1,
    "postedBy": 4,
    "title": "React JS",
    "department": 1,
    "description": "Description",
    "responsibilities": "Responsibilities",
    "requirements": "Requirements",
    "internType": "PART_TIME",
    "locationType": "ONSITE",
    "locationName": "UK",
    "salaryType": "PAID",
    "salaryFrequency": "monthly",
    "salaryCurrency": "$",
    "salaryAmount": 200,
    "totalPositions": 10,
    "closingDate": "2023-05-22",
    "duration": "6 months",
    "status": "Published",
    "isDeleted": false,
    "createdAt": "2023-04-07T05:06:56.094Z",
    "updatedAt": "2023-04-07T05:09:14.180Z",
    "interns": [{
      "id": 3,
      "companyId": 1,
      "internshipId": 2,
      "userId": 7,
      "rating": null,
      "stage": "applied",
      "offerLetter": null,
      "userType": "candidate",
      "joiningDate": null,
      "internStatus": null,
      "internshipEndDate": null,
      "terminationReason": null,
      "assignedManager": null,
      "createdAt": "2023-04-07T05:37:40.188Z",
      "updatedAt": "2023-04-07T05:37:40.188Z"
    },
    {
      "id": 3,
      "companyId": 1,
      "internshipId": 2,
      "userId": 7,
      "rating": null,
      "stage": "hired",
      "offerLetter": null,
      "userType": "candidate",
      "joiningDate": null,
      "internStatus": null,
      "internshipEndDate": null,
      "terminationReason": null,
      "assignedManager": null,
      "createdAt": "2023-04-07T05:37:40.188Z",
      "updatedAt": "2023-04-07T05:37:40.188Z"
    },
    {
      "id": 3,
      "companyId": 1,
      "internshipId": 2,
      "userId": 7,
      "rating": null,
      "stage": "hired",
      "offerLetter": null,
      "userType": "candidate",
      "joiningDate": null,
      "internStatus": null,
      "internshipEndDate": null,
      "terminationReason": null,
      "assignedManager": null,
      "createdAt": "2023-04-07T05:37:40.188Z",
      "updatedAt": "2023-04-07T05:37:40.188Z"
    },
    {
      "stage": "applied",
    },
    {
      "stage": "applied",
    },
    {
      "stage": "reject",
    },]
  }, {
    "id": 3,
    "companyId": 1,
    "postedBy": 6,
    "title": "Node JS",
    "department": 2,
    "description": "Description",
    "responsibilities": "Responsibilities",
    "requirements": "Requirements",
    "internType": "PART_TIME",
    "locationType": "ONSITE",
    "locationName": "UK",
    "salaryType": "PAID",
    "salaryFrequency": "monthly",
    "salaryCurrency": "$",
    "salaryAmount": 200,
    "totalPositions": 10,
    "closingDate": "2023-05-12",
    "duration": "6 months",
    "status": "Draft",
    "isDeleted": false,
    "createdAt": "2023-04-11T06:02:42.025Z",
    "updatedAt": "2023-04-11T06:02:42.025Z",
    "interns": [
      {
        "id": 3,
        "companyId": 1,
        "internshipId": 2,
        "userId": 7,
        "rating": null,
        "stage": "applied",
        "offerLetter": null,
        "userType": "candidate",
        "joiningDate": null,
        "internStatus": null,
        "internshipEndDate": null,
        "terminationReason": null,
        "assignedManager": null,
        "createdAt": "2023-04-07T05:37:40.188Z",
        "updatedAt": "2023-04-07T05:37:40.188Z"
      },
      {
        "id": 3,
        "companyId": 1,
        "internshipId": 2,
        "userId": 7,
        "rating": null,
        "stage": "hired",
        "offerLetter": null,
        "userType": "candidate",
        "joiningDate": null,
        "internStatus": null,
        "internshipEndDate": null,
        "terminationReason": null,
        "assignedManager": null,
        "createdAt": "2023-04-07T05:37:40.188Z",
        "updatedAt": "2023-04-07T05:37:40.188Z"
      }
    ]
  },
  {
    "id": 2,
    "companyId": 1,
    "postedBy": 4,
    "title": "React JS",
    "department": 1,
    "description": "Description",
    "responsibilities": "Responsibilities",
    "requirements": "Requirements",
    "internType": "PART_TIME",
    "locationType": "ONSITE",
    "locationName": "UK",
    "salaryType": "PAID",
    "salaryFrequency": "monthly",
    "salaryCurrency": "$",
    "salaryAmount": 200,
    "totalPositions": 10,
    "closingDate": "2023-05-22",
    "duration": "6 months",
    "status": "Closed",
    "isDeleted": false,
    "createdAt": "2023-04-07T05:06:56.094Z",
    "updatedAt": "2023-04-07T05:09:14.180Z",
    "interns": [{
      "id": 3,
      "companyId": 1,
      "internshipId": 2,
      "userId": 7,
      "rating": null,
      "stage": "reject",
      "offerLetter": null,
      "userType": "candidate",
      "joiningDate": null,
      "internStatus": null,
      "internshipEndDate": null,
      "terminationReason": null,
      "assignedManager": null,
      "createdAt": "2023-04-07T05:37:40.188Z",
      "updatedAt": "2023-04-07T05:37:40.188Z"
    },
    {
      "stage": "reject",
    },
    {
      "stage": "reject",
    },
    {
      "stage": "applied",
    },
    {
      "stage": "reject",
    },
    ]
  }],
  "count": 4,
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalPages": 1,
    "resultCount": 3,
    "totalResult": 4
  },
  "error": null
}

const InternshipsCompanyAdmin = () => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    showDrawer: false,
    status: "",
    location: "",
    department: ""
  })

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
            <SearchBar handleChange={() => { }} name="search bar" placeholder="Search" size="middle" />
          </Col>
          <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex justify-end gap-4 internship-right-sec">
            <FiltersButton
              label="Filters"
              onClick={handleDrawer}
            />
            <Drawer closable open={state.showDrawer} onClose={handleDrawer} title="Filters" >
              <React.Fragment key=".0">
                <div className="flex flex-col gap-12">
                  <div className="flex flex-col gap-2">
                    <p>Status</p>
                    <DropDown
                      name="name"
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
                      name="name"
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
                      name="name"
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
          {
            dummyResponse.data.map((item: any, idx: any) => {
              return (
                <BoxWrapper key={idx} boxShadow>
                  <InternshipProgressCard
                    title={item.title}
                    status={item.status}
                    department={item.department}
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
