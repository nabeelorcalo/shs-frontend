import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InternshipsIcon } from '../../assets/images'
import {
  DropDown,
  SearchBar,
  FiltersButton,
  PageHeader,
  InternshipProgressCard,
  BoxWrapper
} from '../../components'
import Drawer from '../../components/Drawer'
import { Button } from 'antd'
import '../../scss/global-color/Global-colors.scss'

const mapArray: any = [1, 2, 3, 4]

const CMInternships = () => {
  const navigate = useNavigate()
  const [showDrawer, setShowDrawer] = useState(false)
  return (
    <>
      <PageHeader bordered title="Internships for Company Admin" />
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between">
          <SearchBar
            className=""
            handleChange={() => { }}
            name="search bar"
            placeholder="search"
            size="middle"
          />
          <div className="flex flex-row gap-4">
            <FiltersButton
              label="Filters"
              onClick={() => { setShowDrawer(true) }}
            />
            <Drawer
              closable
              open={showDrawer}
              onClose={() => { setShowDrawer(false) }}
              title="Filters"
            >
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
              className="flex gap-2 teriary-bg-color white-color"
              onClick={() => { navigate("new-internship"); }}
            >
              <InternshipsIcon />
              New Internship
            </Button>
          </div>
        </div>
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

export default CMInternships
