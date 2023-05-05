import { useState } from 'react'
import { Button, Col, Divider, Row, Radio, Space, Select, Input, Form } from 'antd'
import {
  CommonDatePicker,
  PageHeader,
  BoxWrapper,
  Breadcrumb,
} from '../../components'
import { useNavigate } from 'react-router-dom';
import type { RadioChangeEvent } from 'antd';
import { ROUTES_CONSTANTS } from '../../config/constants';
import useCustomHook from './actionHandler';
const { TextArea } = Input;

const departmentOptions = [
  { value: 'Bussiness Analyst', label: "Bussiness Analyst" },
  { value: 'Research', label: "Research" },
  { value: 'Accounting', label: "Accounting" },
  { value: 'Human Resources', label: "Human Resources" },
  { value: 'Administration', label: "Administration" },
  { value: 'Project Management', label: "Project Management" }
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
  { valeu: 'Eidinburg', label: "Eidinburg" },
  { value: 'Glasgow', label: "Glasgow" },
  { value: 'London', label: "London" },
]
const durationOptions = [
  { value: '1 month', label: '1 month' },
  { value: '2 months', label: '2 months' },
  { value: '3 months', label: '3 months' },
  { value: '4 months', label: '4 months' },
  { value: '5 months', label: '5 months' },
  { value: '6 months', label: '6 months' },
  { value: '7 months', label: '7 months' },
  { value: '8 months', label: '8 months' },
  { value: '9 months', label: '9 months' },
  { value: '10 months', label: '10 months' },
  { value: '11 months', label: '11 months' },
  { value: '12 months', label: '12 months' }
]
const frequencyOptions = [
  { value: 'HOURLY', label: 'Hourly' },
  { value: 'DAILY', label: 'Daily' },
  { value: 'WEEKLY', label: 'Weekly' },
  { value: 'MONTHLY', label: 'Monthly' },
  { value: 'QUARTERLY', label: 'Quarterly' },
  { value: 'ANNUALLY', label: 'Annually' }
]

const NewInternships = () => {
  const navigate = useNavigate()
  const [partAndFullTime, setPartAndFullTime] = useState(null);
  const [paidAndUnpaid, setPaidAndUnpaid] = useState(null);
  const [remoteOnsite, setRemoteOnsite] = useState(null);
  const [openDataPicker, setOpenDataPicker] = useState(false);
  // const [state, setState] = useState({
  //   department: "",
  //   frequency: "",
  //   internshipDuration: "",
  //   location: "",
  //   expectedClosingDate: ""
  // })
  const { postNewInternshipsData } = useCustomHook()
  console.log(postNewInternshipsData);
  const tempArray = [
    { name: "New Internship" },
    {
      name: "Internships",
      onClickNavigateTo: `/${ROUTES_CONSTANTS.INTERNSHIPS}`,
    },
  ];

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

  // const updateDepartment = (event: any) => {
  //   const value = event.target.innerText;
  //   setState((prevState) => ({
  //     ...prevState,
  //     department: value
  //   }))
  // }

  // const updateFrequency = (event: any) => {
  //   const value = event.target.innerText;
  //   setState((prevState) => ({
  //     ...prevState,
  //     frequency: value
  //   }))
  // }

  // const updateLocation = (event: any) => {
  //   const value = event.target.innerText;
  //   setState((prevState) => ({
  //     ...prevState,
  //     location: value
  //   }))
  // }

  // const updateInternshipDuration = (event: any) => {
  //   const value = event.target.innerText;
  //   setState((prevState) => ({
  //     ...prevState,
  //     internshipDuration: value
  //   }))
  // }

  const onFinish = (values: any) => {
    console.log('Success:', values);
    postNewInternshipsData(values)
  };
  // const { Option } = Select;
  const onGenderChange = (value: string) => {
    console.log('hjkjhkj');
  };
  return (
    <>
      <PageHeader bordered title={<Breadcrumb breadCrumbData={tempArray} />} />
      <BoxWrapper className='new-intern-main'>
        <Form layout='vertical' onFinish={onFinish} initialValues={{ title: "", Select: "" }}>
          <h4 className='upcomming_Holiday font-medium text-xl mb-4 '>Internship Details</h4>
          <p>This information will be displayed publicly so be careful what you share</p>
          <Divider />
          <Row className='flex flex-row flex-wrap'>
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} className='p-4'>
              <h4 className='upcomming_Holiday font-medium text-xl mb-4 '>Description</h4>
              <p >Describe the details of internship that will be reflected on internship portal</p>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} className="flex flex-col gap-6 p-4">
              {/* <div className='flex flex-col gap-2'> */}
              {/* <p>Title <span className='text-error-color'>*</span></p> */}
              <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Required Field' }]}>
                <Input
                  className="input"
                  placeholder="Enter Title"
                  // size="large"
                  type="text"
                />
              </Form.Item>

              {/* </div> */}
              {/* <div className='flex flex-col gap-2'> */}
              {/* <p>Department <span className='text-error-color'>*</span></p> */}
              <Form.Item name="department" label="Department" rules={[{ required: true, message: 'Required Field' }]}>
                <Select
                  placeholder="Select"
                  onChange={onGenderChange}
                  allowClear
                  options={departmentOptions}
                />
                {/* <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option> */}
                {/* </Select> */}
                {/* <DropDown
                    name="Select"
                    options={departmentOptions}
                    setValue={() => { updateDepartment(event) }}
                    value={state.department}
                  /> */}
              </Form.Item>

              {/* </div> */}
              <div className='flex flex-col gap-2'>
                {/* <p>Discription <span className='text-error-color'>*</span></p> */}
                <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Required Field' }]}>
                  <TextArea
                    rows={6}
                    placeholder="Write your discription of internship"
                    // maxLength={8}
                  />
                </Form.Item>
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
              {/* <div className='flex flex-col gap-2'> */}
              {/* <p>Responsibilities <span className='text-error-color'>*</span></p> */}
              <Form.Item label="Responsibilities" name="responsibilities" rules={[{ required: true, message: 'Required Field' }]}>
                <TextArea
                  rows={6}
                  placeholder="Write about responsibilies of internship"
                  // maxLength={8}
                />
              </Form.Item>
              {/* </div> */}
              {/* <div className='flex flex-col gap-2'> */}
              {/* <p>Requirements <span className='text-error-color'>*</span></p> */}
              <Form.Item label="Requirements" name="requirements" rules={[{ required: true, message: 'Required Field' }]}>
                <TextArea
                  rows={6}
                  placeholder="Write about requirements of internship"
                  // maxLength={8}
                />
              </Form.Item>
              {/* </div> */}
            </Col>
            {/* <Col span={8} className='p-4'></Col> */}
          </Row>
          <Divider />
          <Row>
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} className='p-4'>
              <h4 className='upcomming_Holiday font-medium text-xl mb-4 '>General</h4>
              <p>Provide the details of internship</p>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} className='flex flex-col gap-8 p-4'>
              {/* <div className='flex flex-col gap-2'> */}
              {/* <p>Type of work</p> */}
              <Form.Item label="Type of work" name="typeofwork" >
                <Radio.Group onChange={onChange} value={partAndFullTime} className='flex flex-col lg:flex-row gap-5 lg:gap-24'>
                  <Radio value={'PART_TIME'}>Part Time</Radio>
                  <Radio value={'FULL_TIME'}>Full Time</Radio>
                </Radio.Group>
              </Form.Item>

              {/* </div> */}
              {/* <div className='flex flex-col gap-2'> */}
              {/* <p>Internship Type</p> */}
              <Form.Item label="Internship Type" name="internshiptype" >
                <Radio.Group onChange={onChange1} value={paidAndUnpaid} className='flex flex-col lg:flex-row gap-5 lg:gap-24'>
                  <Radio value={'UNPAID'}>Unpaid</Radio>
                  <Radio value={'PAID'}>Paid</Radio>
                </Radio.Group>
              </Form.Item>
              {/* </div> */}
              {partAndFullTime === "FULL_TIME" ?
                <div className='flex flex-col gap-2'>
                  {/* <p>Frequency <span className='text-error-color'>*</span></p> */}
                  <Form.Item name="frequency" label="Frequency" >
                    <Select
                      placeholder="Select"
                      onChange={onGenderChange}
                      allowClear
                      options={frequencyOptions}
                    />
                  </Form.Item>
                  {/* <DropDown
                    name="Select"
                    options={frequencyOptions}
                    setValue={() => { updateFrequency(event) }}
                    value={state.frequency}
                  /> */}
                </div>
                :
                null
              }
              {paidAndUnpaid === "PAID" ?
                <div className='flex flex-col gap-2'>
                  <Form.Item label="Amount" name="amount">
                    <Space.Compact>
                      <Select
                        className='w-full'
                        defaultValue="GBP"
                        options={amountOptions} />
                      <Input defaultValue="0.00" />
                    </Space.Compact>
                  </Form.Item>
                  {/* <p>Amount <span className='text-error-color'>*</span></p>
                  <Space.Compact>
                    <Select
                      className='w-full'
                      defaultValue="GBP"
                      options={amountOptions} />
                    <Input defaultValue="0.00" />
                  </Space.Compact> */}
                </div>
                :
                null
              }
              <div className='flex flex-col gap-2'>
                {/* <p>Nature of work</p> */}
                <Form.Item name="natureofwork" label="Nature of work">
                  <Radio.Group onChange={onChange2} value={remoteOnsite} className='flex flex-col lg:flex-row gap-5 lg:gap-24'>
                    <Radio value={'VIRTUAL'}>Virtual</Radio>
                    <Radio value={'ONSITE'}>On site</Radio>
                    <Radio value={'HYBRIDE'}>Hybrid</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              {remoteOnsite === "ONSITE" ?
                <div className='flex flex-col gap-2'>
                  {/* <p>Location <span className='text-error-color'>*</span></p> */}
                  <Form.Item name="location" label="Location">
                    <Select
                      placeholder="Select"
                      onChange={onGenderChange}
                      allowClear
                      options={locationOptions}
                    />
                  </Form.Item>
                  {/* <DropDown
                    name="Select"
                    options={locationOptions}
                    setValue={() => { updateLocation(event) }}
                    value={state.location}
                  /> */}
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
              {/* <div className='flex flex-col gap-2'> */}
              <Form.Item label="Total positions" name="positions" rules={[{ required: true, message: 'Required Field' }]}>
                <Input
                  className="input"
                  // label="Title"
                  // name="name"
                  // required
                  placeholder="Enter number of positions"
                  // size="large"
                  type="text"
                />
              </Form.Item>
              {/* <p>Total positions <span className='text-error-color'>*</span></p>
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
                /> */}
              {/* </div> */}
              {/* <div className='flex flex-col gap-2'> */}
              <Form.Item label="Date">
                <CommonDatePicker
                  name="datePicker"
                  onBtnClick={() => { }}
                  open={openDataPicker}
                  setOpen={setOpenDataPicker}
                  setValue={function noRefCheck() { }}
                />
              </Form.Item>
              {/* <p>Expected Closing Date<span className='text-error-color'>*</span></p>
                <CommonDatePicker
                  name="Date Picker"
                  onBtnClick={() => { }}
                  setOpen={function noRefCheck() { }}
                  setValue={function noRefCheck() { }}
                /> */}
              {/* </div> */}
              {/* <p>Internship Duration<span className='text-error-color'>*</span></p> */}
              {/* <div className='flex flex-col gap-5'> */}
              <Form.Item label="Internship Duration" name="duration" rules={[{ required: true, message: 'Required Field' }]}>
                <Select
                  placeholder="Select"
                  onChange={onGenderChange}
                  allowClear
                  options={durationOptions}
                />
              </Form.Item>
              {/* <DropDown
                name="Select"
                options={durationOptions}
                setValue={() => { updateInternshipDuration(event) }}
                value={state.internshipDuration}
              /> */}
              {/* </div> */}
            </Col>
            <Col span={8}></Col>
          </Row>
          <Divider />
          <Row className="flex my-3 flex-row gap-4 md:justify-end">
            <Button type="link" size="middle" className="new-intern-btn white-bg-color teriary-color main-btn">
              Save Draft
            </Button>
            <Button type="default" size="middle" className="button-default-tertiary main-btn"
              onClick={() => { navigate("/" + ROUTES_CONSTANTS.INTERNSHIPS) }}>Cancel</Button>
            <Button type="primary" htmlType="submit" size="middle" className="button-tertiary main-btn">Submit</Button>
          </Row>
        </Form>
      </BoxWrapper>
    </>
  )
}

export default NewInternships;
