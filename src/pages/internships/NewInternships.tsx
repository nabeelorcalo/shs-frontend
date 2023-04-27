import { useState } from 'react'
import { Button, Col, Divider, Row, Radio, Space, Select, Input } from 'antd'
import {
  CommonDatePicker,
  DropDown,
  PageHeader,
  BoxWrapper,
} from '../../components'

import type { RadioChangeEvent } from 'antd';
const { TextArea } = Input;
const departmentOptions = [
  'search',
  'Bussiness Analyst',
  'Research',
  'Accounting',
  'Human Resources',
  'Administration',
  'Project Management'
]
const amountOptions = [
  {
    value: 'GBP',
    label: 'GBP',
  },
  {
    value: 'USD',
    label: 'USD',
  },
]
const locationOptions = [
  'Eidinburg',
  'Glasgow',
  'London',
]
const durationOptions = [
  '1 month',
  '2 months',
  '3 months',
  '4 months',
  '5 months',
  '6 months',
  '7 months',
  '8 months',
  '9 months',
  '10 months',
  '11 months',
  '12 months'
]
const frequencyOptions = [
  'Hourly',
  'Daily',
  'Weekly',
  'Monthly',
  'Quarterly',
  'Annually'
]

const NewInternships = () => {
  // const [showState, setshowState] = useState(false)
  // const [alertState, setAlertState] = useState(false)
  const [partAndFullTime, setPartAndFullTime] = useState(null);
  const [paidAndUnpaid, setPaidAndUnpaid] = useState(null);
  const [remoteOnsite, setRemoteOnsite] = useState(null);
  const [state, setState] = useState({
    department: "",
    frequency:"",
    internshipDuration: "",
    location: "",
    expectedClosingDate: ""
  })

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setPartAndFullTime(e.target.value);
  };

  const onChange1 = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setPaidAndUnpaid(e.target.value);
  };

  const onChange2 = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setRemoteOnsite(e.target.value);
  };

  const updateDepartment = (event: any) => {
    const value = event.target.innerText;
    setState((prevState) => ({
      ...prevState,
      department: value
    }))
  }

  const updateFrequency = (event: any) => {
    const value = event.target.innerText;
    setState((prevState) => ({
      ...prevState,
      frequency: value
    }))
  }

  const updateLocation = (event: any) => {
    const value = event.target.innerText;
    setState((prevState) => ({
      ...prevState,
      location: value
    }))
  }

  const updateInternshipDuration = (event: any) => {
    const value = event.target.innerText;
    setState((prevState) => ({
      ...prevState,
      internshipDuration: value
    }))
  }

  return (
    <>
      <PageHeader title="New Internship" />
      <Divider />
      <BoxWrapper className='new-intern-main'>
        <h4 className='upcomming_Holiday font-medium text-xl mb-4 '>Internship Details</h4>
        <p>This information will be displayed publicly so be careful what you share</p>
        <Divider />
        <Row className='flex flex-row flex-wrap'>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} className='p-4'>
            <h4 className='upcomming_Holiday font-medium text-xl mb-4 '>Description</h4>
            <p>Describe the details of internship that will be reflected on internship portal</p>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} className="flex flex-col gap-6 p-4">
            <div className='flex flex-col gap-2'>
              <p>Title <span className='text-error-color'>*</span></p>
              <Input
                className="input"
                onChange={() => { }}
                id=""
                name="name"
                required
                placeholder="Enter Title"
                size="large"
                type="text"
              />
            </div>
            <div className='flex flex-col gap-2'>
              <p>Department <span className='text-error-color'>*</span></p>
              <DropDown
                name="Select"
                options={departmentOptions}
                setValue={() => {updateDepartment(event)}}
                value={state.department}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <p>Discription <span className='text-error-color'>*</span></p>
              <TextArea
                rows={6}
                placeholder="Write your discription of internship"
                maxLength={8}
              />
            </div>
          </Col>
          <Col lg={{ span: 8 }} className='p-4'></Col>
        </Row>
        <Divider />
        <Row>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} className='p-4'>
            <h4 className='upcomming_Holiday font-medium text-xl mb-4 '>Responsibilities and Requirements</h4>
            <p>Briefly define the responsibilities and requirements of the internship</p>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} className='flex flex-col gap-6 p-4'>
            <div className='flex flex-col gap-2'>
              <p>Responsibilities <span className='text-error-color'>*</span></p>
              <TextArea
                rows={6}
                placeholder="Write about responsibilies of internship"
                maxLength={8}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <p>Requirements <span className='text-error-color'>*</span></p>
              <TextArea
                rows={6}
                placeholder="Write about requirements of internship"
                maxLength={8}
              />
            </div>
          </Col>
          <Col span={8} className='p-4'></Col>
        </Row>
        <Divider />
        <Row>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} className='p-4'>
            <h4 className='upcomming_Holiday font-medium text-xl mb-4 '>General</h4>
            <p>Provide the details of internship</p>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} className='flex flex-col gap-8 p-4'>
            <div className='flex flex-col gap-2'>
              <p>Type of work</p>
              <Radio.Group onChange={onChange} value={partAndFullTime} className='flex flex-col lg:flex-row gap-5 lg:gap-24'>
                <Radio value={'parttime'}>Part Time</Radio>
                <Radio value={'fulltime'}>Full Time</Radio>
              </Radio.Group>
            </div>
            <div className='flex flex-col gap-2'>
              <p>Internship Type</p>
              <Radio.Group onChange={onChange1} value={paidAndUnpaid} className='flex flex-col lg:flex-row gap-5 lg:gap-24'>
                <Radio value={'unpaid'}>Unpaid</Radio>
                <Radio value={'paid'}>Paid</Radio>
              </Radio.Group>
            </div>
            {partAndFullTime === "fulltime" ?
              <div className='flex flex-col gap-2'>
                <p>Frequency <span className='text-error-color'>*</span></p>
                <DropDown
                  name="Select"
                  options={frequencyOptions}
                  setValue={() => {updateFrequency(event)}}
                  value={state.frequency}
                />
              </div>
              :
              null
            }
            {paidAndUnpaid === "paid" ?
              <div className='flex flex-col gap-2'>
                <p>Amount <span className='text-error-color'>*</span></p>
                <Space.Compact>
                  <Select
                    defaultValue="GBP"
                    options={amountOptions} />
                  <Input defaultValue="0.00" />
                </Space.Compact>
              </div>
              :
              null
            }
            <div className='flex flex-col gap-2'>
              <p>Nature of work</p>
              <Radio.Group onChange={onChange2} value={remoteOnsite} className='flex flex-col lg:flex-row gap-5 lg:gap-24'>
                <Radio value={'virtual'}>Virtual</Radio>
                <Radio value={'onsite'}>On site</Radio>
                <Radio value={'hybrid'}>Hybrid</Radio>
              </Radio.Group>
            </div>
            {remoteOnsite === "onsite" ?
              <div className='flex flex-col gap-2'>
                <p>Location <span className='text-error-color'>*</span></p>
                <DropDown
                  name="Select"
                  options={locationOptions}
                  setValue={() => {updateLocation(event)}}
                  value={state.location}
                />
              </div>
              :
              null
            }
          </Col>
          <Col span={8} className='p-4'></Col>
        </Row>
        <Divider />
        <Row>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} className='p-4'>
            <h4 className='upcomming_Holiday font-medium text-xl mb-4 '>Additional Information</h4>
            <p>Enter the additional information related to internship</p>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} className='flex flex-col gap-4 p-4'>
            <div className='flex flex-col gap-2'>
              <p>Total positions <span className='text-error-color'>*</span></p>

              <Input
                className="input"
                onChange={() => { }}
                id=""
                // label="Title"
                name="name"
                required
                placeholder="Enter number of positions"
                size="large"
                type="text"
              />
            </div>
            <div className='flex flex-col gap-2'>
              <p>Expected Closing Date<span className='text-error-color'>*</span></p>

              <CommonDatePicker
                name="Date Picker"
                onBtnClick={() => { }}
                setOpen={function noRefCheck() { }}
                setValue={function noRefCheck() { }}
              />
            </div>
            <p>Internship Duration<span className='text-error-color'>*</span></p>
            <div className='flex flex-col gap-5'>
              <DropDown
                name="Select"
                options={durationOptions}
                setValue={() => {updateInternshipDuration(event)}}
                value={state.internshipDuration}
              />
            </div>
          </Col>
          <Col span={8}></Col>
        </Row>
        <Divider />
        <Row className="flex my-3 flex-row gap-4 md:justify-end">
          <Button type="link" size="middle" className="new-intern-btn white-bg-color teriary-color main-btn" onClick={() => { }}>
            Save Draft
          </Button>
          <Button type="default" size="middle" className="button-default-tertiary main-btn" onClick={() => { }}>Cancel</Button>
          <Button type="primary" size="middle" className="button-tertiary main-btn" onClick={() => { }}>Submit</Button>
        </Row>
      </BoxWrapper>
    </>
  )
}

export default NewInternships;
