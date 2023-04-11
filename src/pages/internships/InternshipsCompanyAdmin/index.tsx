import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InternshipsIcon } from '../../../assets/images'
import {
  DropDown,
  SearchBar,
  FiltersButton,
  PageHeader,
  InternshipProgressCard,
  BoxWrapper
} from '../../../components'
import Drawer from '../../../components/Drawer'
import { Button, Col, Row } from 'antd'
import '../../../scss/global-color/Global-colors.scss'
import '../style.scss'
const mapArray: any = [1, 2, 3, 4]

const InternshipsCompanyAdmin = () => {
  const navigate = useNavigate()
  const [showDrawer, setShowDrawer] = useState(false)
  return (
    <>
      <PageHeader bordered title="Internships" />
      <div className="flex flex-col gap-5 internship-details">
        <Row gutter={[20, 20]}>
          <Col xxl={6} xl={6} md={24} sm={24} xs={24}>
            <SearchBar handleChange={() => { }} name="search bar" placeholder="Search" size="middle" />
          </Col>
          <Col xxl={18} xl={18} md={24} sm={24} xs={24} className="flex justify-end gap-4 internship-right-sec">
            <FiltersButton
              label="Filters"
              onClick={() => { setShowDrawer(true) }}
            />
            <Drawer closable   open={showDrawer} onClose={() => { setShowDrawer(false) }} title="Filters" >
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
                        'Draft'
                      ]}
                      setValue={() => { }}
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value=""
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
                        'Virtual'
                      ]}
                      setValue={() => { }}
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value=""
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
                        'HR Cordinator'
                      ]}
                      setValue={() => { }}
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value=""
                    />
                  </div>
                  <div className="flex flex-row gap-3 justify-end">
                    <Button
                      size="middle"
                      className="flex gap-2 white-bg-color teriary-color"
                      onClick={() => { navigate("new-internship"); }}
                    >
                      Reset
                    </Button>
                    <Button
                      size="middle"
                      className="flex gap-2 teriary-bg-color white-color"
                      onClick={() => { navigate("new-internship"); }}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </React.Fragment>
            </Drawer>
            <Button
              size="middle"
              className="flex gap-2 teriary-bg-color white-color main-btn"
              onClick={() => { navigate("new-internship"); }}
            >
              <InternshipsIcon />
              New Internship
            </Button>
          </Col>
        </Row>
        {
          mapArray.map((item: any, idx: any) => {
            return (
              <BoxWrapper key={idx}>
                <InternshipProgressCard />
              </BoxWrapper>
            )
          })
        }
      </div>
    </>
  )
}

export default InternshipsCompanyAdmin
