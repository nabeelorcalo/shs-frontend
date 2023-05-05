import { CheckOutlined, ClockCircleOutlined, } from '@ant-design/icons'
import { Col, Divider, Form, Row, Typography, Input, } from 'antd'
import { useState } from 'react'
import {
  ArrowDownDark,
  GrievancesCall,
  GrievancesDocDownload, GrievancesDocJPG,
  GrievancesDocPDF,
  GrievancesInbox,
  GrievancesLocation,
  GrievancesSidebarAvater,
  UserAvatar
} from '../../../assets/images'
import { Alert, Breadcrumb, Button, BoxWrapper } from '../../../components'
import DragAndDropWide from '../../../components/DragAndDrop'
import DropDownNew from '../../../components/Dropdown/DropDownNew'
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
  const detailsData = [
    {
      userImg: UserAvatar,
      userName: 'john doe'
    },
    {
      userImg: UserAvatar,
      userName: 'mina marino'
    },
    {
      userImg: UserAvatar,
      userName: 'clark'
    },
    {
      userImg: UserAvatar,
      userName: 'sarah joe'
    },
  ]
  const [filterValue, setFilterValue] = useState({
    escalatedBy: "Select",
    userImg: UserAvatar,
    userName: 'john doe',
    showSuccess: false
  });
  return (
    <div className='grievance-details'>
      <Breadcrumb breadCrumbData={breadcrumbArray} />
      <Divider />
      <Row gutter={[16, 16]}>
        <Col sm={24} md={24} lg={16} xl={16} xxl={18} className='grievance-details-scroll '>
          <BoxWrapper className='p-3'>
            <div className='flex max-sm:flex-col justify-between'>
              <Text className='text-lg sm:text-xl font-medium text-primary-color'>
                Attendance Log Issue
              </Text>
              <Text onClick={
                () => { setFilterValue({ ...filterValue, showSuccess: !filterValue.showSuccess }) }}
                className=' font-medium text-base px-1 attandance-button text-input-bg-color cursor-pointer  '>
                <CheckOutlined />
                <span className='mx-2'>
                  Mark as resolved
                </span>
              </Text>
            </div>
            <Text className="flex items-center mt-2"  >
              <span className='text-success-placeholder-color  '>
                <ClockCircleOutlined />
              </span>
              <span className='text-sm sm:mt-0 pl-3 text-success-placeholder-color '>
                Last Updated
              </span>
              <span className='text-sm sm:mt-0 pl-1 text-teriary-color '>
                26 minutes ago
              </span>
            </Text>
            <Text className='flex md:mt-5 xs:text-sm sm:text-base font-normal px-2 text-secondary-color'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lobortis ante non lectus porta, eu tincidunt massa pulvinar. Duis dignissim vel dui ac efficitur. Nunc consectetur pulvinar eros, vel commodo neque condimentum sed. Duis ultricies, purus maximus mollis commodo, ipsum nibh tincidunt ex, eu laoreet elit nibh vitae sapien. Integer a mattis odio, non fringilla massa. In et ligula at sapien ultrices varius in et orci.            </Text>
            <Row>
              <Col span={24}>
                <div className='Attactments md:mt-5'>
                  <Text className='xs:text-base sm:text-base text-lg text-teriary-color mt-3 sm:mt-0'>
                    Attachments
                  </Text>
                </div>
              </Col>
              <Row gutter={[16, 16]} className="w-full gap-2 p-2">
                <Col sm={12} lg={11} xl={10} xxl={6} className=" gutter-row text-input-bg-color">
                  <div className='flex justify-between py-2'>
                    <div className='flex flex-row'>
                      <GrievancesDocPDF className='mt-1' />
                      <div className='flex flex-col sm:px-1'>
                        <Text className='text-sm font-normal'>
                          Document0023.pdf
                        </Text>
                        <Text className='text-xs font-normal'>
                          2 MB
                        </Text>
                      </div>
                    </div>
                    <div className='float-right'>
                      <span className='ml-5'>
                        <GrievancesDocDownload />
                      </span>
                    </div>
                  </div>
                </Col>
                <Col sm={12} lg={11} xl={10} xxl={6} className="gutter-row text-input-bg-color">
                  <div className='flex justify-between py-2'>
                    <div className='flex flex-row'>
                      <GrievancesDocJPG className='mt-1' />
                      <div className='flex flex-col sm:px-1'>
                        <Text className='text-sm font-normal'>
                          Document0023.pdf
                        </Text>
                        <Text className='text-xs font-normal'>
                          2 MB
                        </Text>
                      </div>
                    </div>
                    <div className='float-right'>
                      <span className='ml-5'>
                        <GrievancesDocDownload />
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            </Row>
          </BoxWrapper>
          <BoxWrapper className='xs:mt-2 sm:mt-5 p-3'>
            <Text className='text-lg sm:text-xl font-medium'>
              Reply To Grievance
            </Text>
            <Form>
              <Form.Item
                className="mt-3"
                name="description"
              >
                <TextArea className='text-input-bg-color'
                  rows={6} placeholder="Write Something here..."
                  maxLength={6} />
              </Form.Item>
              <Text className='font-normal text-base text-teriary-color'>
                Attachment
              </Text>
              <Form.Item
                className="mt-3"
                name="description"
              >
                <DragAndDropWide />
              </Form.Item>
              <div className='flex justify-end'>
                <Button className='teriary-bg-color replay-btn'
                  label="Reply"
                  onClick={() => { }}
                  type="primary"
                />
              </div>
            </Form>
          </BoxWrapper>
        </Col>
        <Col span={24} md={24} lg={8} xl={8} xxl={6}>

          <BoxWrapper className='grievancesDetails-boxWrapper'>
            <Text className='text-lg sm:text-xl font-medium'>
              Grievance Information
            </Text>
            <div className='flex justify-between  font-normal py-1 mt-1'>
              <Text className='text-sm sm:text-base'>
                Created on
              </Text>
              <Text className='text-sm sm:text-base'>
                28 Nov, 2022
              </Text>
            </div>
            <Divider className='mt-2 mb-1' />
            <div className='flex justify-between font-normal py-1'>
              <Text className='text-sm sm:text-base'>
                Type
              </Text>
              <Text className='text-sm sm:text-base'>
                Other
              </Text>
            </div>
            <Divider className='mt-2 mb-1' />
            <div className='flex justify-between font-normal py-1'>
              <Text className='text-sm sm:text-base'>
                Status
              </Text>
              <Text className='organ-status-bg rounded-md px-3 font-medium text-sm center white-color'>
                New
              </Text>
            </div>
            <Divider className='mt-2 mb-1' />
            <div className='flex justify-between font-normal'>
              <Text className='pt-2 w-[130px] text-sm sm:text-base mt-1.5 sm:mt-0'>
                Escalated To
              </Text>

              <div className='asignee-wrap w-[70%]'>
                <DropDownNew
                  placement={'bottomRight'}
                  items={[
                    {
                      label: <div>
                        {detailsData.map((item: any, index: any) => (
                          <div key={index} className="flex items-center gap-3 mb-[20px]"
                            onClick={
                              () => setFilterValue({ ...filterValue, userName: item.userName, userImg: item.userImg })}
                          >
                            <img src={item.userImg}
                              className='h-[20px] w-[20px] rounded-full object-cover'
                            />
                            <p>{item.userName}</p>
                          </div>))}
                      </div>,
                      key: 'users'
                    }]}>
                  <div className="drop-down-with-imgs flex items-center gap-3">
                    <div className="flex items-center gap-3 mr-[40px]">
                      <img src={filterValue.userImg} />
                      <p className='text-primary-color'>
                        {filterValue.userName}</p>
                    </div>
                    <ArrowDownDark />
                  </div>
                </DropDownNew>
              </div>
            </div>

          </BoxWrapper>
          <BoxWrapper className='my-5 pb-0'>
            <Text className='text-lg sm:text-xl font-medium'>
              Escalated By
            </Text>
            <div className='flex items-center flex-col'>
              <span className='my-3'>
                <GrievancesSidebarAvater />
              </span>
              <Text className='text-lg sm:text-xl font-semibold text-primary-color'>
                Maria Sanoid
              </Text>
              <Text className='font-medium text-base'>
                UI UX Designer
              </Text>
              <Text className='text-base font-normal'>
                Design
              </Text>
            </div>
            <Divider className='mt-2 mb-1' />
            <div className='flex flex-col'>
              <span className='py-2 sm:p-3'><GrievancesInbox />
                <span className='text-xs sm:text-sm px-3 font-normal'>
                  maria@Student Help Squad.com
                </span>
              </span>
              <span className='py-2 sm:p-3'> <GrievancesCall />
                <span className='text-xs sm:text-sm px-3 font-normal'>
                  +44 7700 900077
                </span>
              </span>
              <span className='py-2 sm:p-3'>  <GrievancesLocation />
                <span className='text-xs sm:text-sm px-3 font-normal'>
                  263 Eversholt St, London NW11NB, UK
                </span>
              </span>
            </div>
          </BoxWrapper>
        </Col>

      </Row>
      <Alert
        cancelBtntxt="Cancel"
        okBtntxt="Proceed"
        state={filterValue.showSuccess}
        setState={setFilterValue}
        type="success"
        width={570}
        title=""
        children={<p>Do you want to mark this grievance as resolved?</p>}
      />

    </div>
  )
}

export default GrievancesDetails