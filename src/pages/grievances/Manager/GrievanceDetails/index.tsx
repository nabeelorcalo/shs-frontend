import { CheckOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { Col, Divider, Form, Row, Typography, Input, } from 'antd'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { GrievancesDocDownload, GrievancesDocPDF, SettingHorizontalLine, SettingTimesheetIcon } from '../../../../assets/images'
import { Alert, Button, DropDown, PageHeader } from '../../../../components'
import { BoxWrapper } from '../../../../components/BoxWrapper/BoxWrapper'
import { ROUTES_CONSTANTS } from '../../../../config/constants';
import './style.scss';
const { Text } = Typography;
const { TextArea } = Input;

const index = () => {
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  return (
    <div className='grievance-details'>


      <PageHeader title={<>Grievances Details{<SettingHorizontalLine className="mx-2" />}
        <span className='text-base font-medium '>
          <NavLink to="/grievances">
            <span className='dashboard-primary-color'>
              Grievances
            </span>
          </NavLink>
          <span className='mx-1'>/</span>
          <NavLink to={ROUTES_CONSTANTS.ALL_GRIEVANCES}>
            <span className='dashboard-primary-color'>  All Grievances  </span>
          </NavLink>
        </span>
      </>} />
      <Divider className="my-1 mb-2" />
      <Row gutter={[16, 16]}>
        <Col lg={18}>
          <BoxWrapper>
            <div className='flex justify-between'>
              <Text className='text-xl font-medium'>Attendance Log Issue</Text>
              <Text onClick={() => { setShowSuccess(!showSuccess) }} className=' font-medium text-base px-1 attandance-button text-input-bg-color cursor-pointer  '>
                <CheckOutlined /> Attendance Log Issue</Text>
            </div>
            <Text className="text-[#a0a3bd]"  >
              <ClockCircleOutlined />
              <span className='text-sm px-2'>Last Updated 26 minutes ago</span>
            </Text>
            <Text className='flex md:mt-5 text-base font-normal'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lobortis ante non lectus porta, eu tincidunt massa pulvinar. Duis dignissim vel dui ac efficitur. Nunc consectetur pulvinar eros, vel commodo neque condimentum sed. Duis ultricies, purus maximus mollis commodo, ipsum nibh tincidunt ex, eu laoreet elit nibh vitae sapien. Integer a mattis odio, non fringilla massa. In et ligula at sapien ultrices varius in et orci.
            </Text>
            <Row>
              <Col span={24}>
                <div className='Attactments md:mt-5'>
                  <Text className='text-base text-lg text-teriary-color'>Attachments</Text>
                </div>
              </Col>
              <Row gutter={[16, 16]} className="w-full">
                <Col lg={8} className="gutter-row text-input-bg-color mx-2">
                  <div className='flex py-2'>
                    <GrievancesDocPDF className='mt-1' />
                    <div className='flex '>
                      <div className='flex flex-col px-1'>
                        <Text className='text-sm font-normal'>Document0023.pdf</Text>
                        <Text className='text-xs font-normal'>2 MB</Text>

                      </div>
                      <span className='ml-5'> <GrievancesDocDownload /></span>

                    </div>

                  </div>

                </Col>
                <Col lg={8} className=" gutter-row text-input-bg-color">
                  <div className='flex py-2'>
                    <GrievancesDocPDF className='mt-1' />
                    <div className='flex '>
                      <div className='flex flex-col px-1'>
                        <Text className='text-sm font-normal'>Document0023.pdf</Text>
                        <Text className='text-xs font-normal'>2 MB</Text>

                      </div>
                      <span className='ml-5'> <GrievancesDocDownload /></span>

                    </div>

                  </div>

                </Col>
              </Row>
            </Row>



          </BoxWrapper>
          <BoxWrapper className='mt-5'>
            <Text className='text-xl font-medium'>Reply To Grievance</Text>
            <Form>
              <Form.Item
                className="mt-3"
                name="description"
              >
                <TextArea className='text-input-bg-color' rows={6} placeholder="Write Something..." maxLength={6} />
              </Form.Item>
              <div className='flex justify-end'>    <Button className=' teriary-bg-color'
                label="Replay"
                onClick={() => { }}
                type="primary"
              /></div>

            </Form>
          </BoxWrapper>
        </Col>
        <Col lg={6}>
          <BoxWrapper>
            <Text className='text-xl font-medium'>Grievance Information</Text>
            <div className='flex justify-between font-normal py-2'>
              <Text >Created on</Text>
              <Text>28 Nov, 2022</Text>
            </div>
            <Divider className='mt-2 mb-1' />
            <div className='flex justify-between font-normal py-2'>
              <Text >Type</Text>
              <Text>Other</Text>
            </div>
            <Divider className='mt-2 mb-1' />
            <div className='flex justify-between font-normal py-2'>
              <Text >Status</Text>
              <Text className='bg-[#FF6F31] rounded-md px-3 white-color '>New</Text>
            </div>
            <Divider className='mt-2 mb-1' />
            <div className='flex justify-between font-normal py-2'>
              <Text >Escalated To</Text>

              <DropDown
                name="this month"
                options={[
                  'search',
                  'item 1',
                  'item 2'
                ]}
                setValue={() => { }}
                value=""
              />
            </div>
            <Divider className='mt-2 mb-1' />


          </BoxWrapper>
        </Col>

      </Row>
      <Alert
        cancelBtntxt="Cancel"
        okBtntxt="Proceed"
        state={showSuccess}
        setState={setShowSuccess}
        type="success"
        width={500}
        title=""
      >
        <p>Do you want to mark this grievance as mark as resolved</p>
      </Alert>

    </div>
  )
}

export default index