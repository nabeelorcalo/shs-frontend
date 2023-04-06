import { CheckOutlined, ClockCircleOutlined, DownOutlined } from '@ant-design/icons'
import { Col, Divider, Form, Row, Typography, Input, Select } from 'antd'
import { useState } from 'react'
import {
  GrievancesAvater, GrievancesCall,
  GrievancesDocDownload, GrievancesDocJPG,
  GrievancesDocPDF, GrievancesInbox, GrievancesLocation,
  GrievancesSidebarAvater
} from '../../../assets/images'
import { Alert, Breadcrumb, Button, BoxWrapper } from '../../../components'
import DragAndDropWide from '../../../components/DragAndDrop'
import './style.scss';

const { Text } = Typography;
const { TextArea } = Input;

function handleChange(value: any) { }

const GrievancesDetails = () => {
  const breadcrumbArray = [
    { name: "Grievances Details" },
    { name: "Grievances", onClickNavigateTo: "/grievances" },
    { name: "All Grievances", onClickNavigateTo: "/grievances/all-grievance" },
  ];
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  return (
    <div className='grievance-details'>
      <Breadcrumb breadCrumbData={breadcrumbArray} />
      <Divider />
      <Row gutter={[16, 16]}>
        <Col sm={24} md={24} lg={16} xl={16} xxl={18}>
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
              <Row gutter={[16, 16]} className="w-full gap-2">
                <Col sm={12} md={10} lg={10} xl={10} xxl={6} className=" gutter-row text-input-bg-color">
                  <div className='flex justify-between py-2'>
                    <div className='flex flex-row'><GrievancesDocPDF className='mt-1' />
                      <div className='flex flex-col px-1'>
                        <Text className='text-sm font-normal'>Document0023.pdf</Text>
                        <Text className='text-xs font-normal'>2 MB</Text>
                      </div>
                    </div>
                    <div className='float-right'>
                      <span className='ml-5'> <GrievancesDocDownload /></span>
                    </div>
                  </div>
                </Col>
                <Col sm={12} md={10} lg={10} xl={10} xxl={6} className="gutter-row text-input-bg-color">
                  <div className='flex justify-between py-2'>
                    <div className='flex flex-row'><GrievancesDocJPG className='mt-1' />
                      <div className='flex flex-col px-1'>
                        <Text className='text-sm font-normal'>Document0023.pdf</Text>
                        <Text className='text-xs font-normal'>2 MB</Text>
                      </div>
                    </div>

                    <div className='float-right'>
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
              <Form.Item
                className="mt-3"
                name="description"
              >
                <DragAndDropWide />
              </Form.Item>
              <div className='flex justify-end'>
                <Button className='teriary-bg-color replay-btn'
                  label="Replay"
                  onClick={() => { }}
                  type="primary"
                />
              </div>

            </Form>
          </BoxWrapper>
        </Col>
        <Col span={24} md={24} lg={8} xl={8} xxl={6}>

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
            <div className='flex justify-between font-normal'>
              <Text className='pt-2 w-[130px]' >Escalated To</Text>

              <Select defaultValue="Jessica Alba" className='w-full lg:w-[200px] border-none' onChange={handleChange}
                options={[{
                  value: "Gregory Maxwell Hall",
                  label: <>
                    <GrievancesAvater className='w-[48px] px-2' />
                    <span>Jessica Alba</span>
                  </>,
                },
                {
                  value: <>
                    <GrievancesAvater className='w-[48px] px-2' />
                    <span>Jessica Alba</span></>,
                  label: <>
                    <GrievancesAvater className='w-[48px] px-2' />
                    <span>Jessica Alba</span></>,
                },]} />
            </div>

          </BoxWrapper>
          <BoxWrapper className='my-2 pb-0'>
            <Text className='text-xl font-medium'>Escalated By</Text>
            <div className='flex items-center flex-col'>
              <span><GrievancesSidebarAvater /></span>
              <Text className='text-xl font-semibold'>Maria Sanoid</Text>
              <Text className='font-medium text-base'>UI UX Designer</Text>
              <Text className='text-base font-normal'>Design</Text>
            </div>
            <Divider className='mt-2 mb-1' />
            <div className='flex flex-col'>
              <span className='p-3'><GrievancesInbox />
                <span className='text-sm px-3 font-normal'>maria@Student Help Squad.com</span>
              </span>
              <span className='p-3'> <GrievancesCall />
                <span className='text-sm px-3 font-normal'>+44 7700 900077</span>
              </span>
              <span className='p-3'>  <GrievancesLocation />
                <span className='text-sm px-3 font-normal'>263 Eversholt St, London NW11NB, UK</span>
              </span>
            </div>
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
        children={<p>Do you want to mack thid grievance as mark as resolved?</p>}
      />

    </div>
  )
}

export default GrievancesDetails