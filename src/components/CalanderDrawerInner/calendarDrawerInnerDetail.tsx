import { Col, Divider, Row, Button } from 'antd';
import dayjs from 'dayjs';
import './style.scss';

const CalendarDrawerInnerDetail = (props: any) => {
  const {
    img,
    name,
    designation,
    email,
    requestedOn,
    aprover,
    ApprovedBy,
    backgroundColor,
    spanBG,
    title,
    dateFrom,
    dateTo,
    timeFrom,
    timeTo,
    leaveTypeDay,
    hours,
    dur,
    reqStatus,
    description,
    approveDeclineRequest = () => {}
  } = props;

  const renderStatusColor: any = {
    'PENDING': 'rgba(255, 193, 93, 1)',
    'APPROVED': '#4ED185',
    'DECLINED': '#D83A52',
  }

  const formatDate = (time: any, format: string) => dayjs(time).format(format)

  return (
    <div className='main_calender_drawer_data_wrapper'>
      <div className='user_profile'>
        <div className=' profilData_wrapper flex items-center'>
          <div className='img_wrapper w-[80px] h-[80px] rounded-full mr-8'>
            <img src={img} alt='profile image ' className='w-full h-full object-cover rounded-full ' />
          </div>
          <div className='details'>
            <p className=" name_of_person font-semibold text-base ">{name}</p>
            <p className=' text-sm font-normal designation '>{designation}</p>
            <p className='email text-sm font-medium '>{email}</p>

          </div>

        </div>

        <Row className='mt-10 ' gutter={[20, 20]}>
          <Col lg={12}>
            <div className='request_data'>
              <h4 className=' font-medium text-base'>Requested on</h4>
              <p className=' text-base font-normal'>{formatDate(requestedOn, 'DD-MM-YYYY')}</p>
            </div>
          </Col>
          <Col lg={12}>
            <div className='request_data'>
              <h4 className=' font-medium text-base'>Approver</h4>
              <p className=' text-base font-normal'>{aprover}</p>
            </div>
          </Col>
          <Col lg={12}>
            <div className='request_data'>
              <h4 className=' font-medium text-base'>Approved by</h4>
              <p className=' text-base font-normal'>{ApprovedBy}</p>
            </div>
          </Col>
          <Divider />
        </Row>
        <h4 className='leaveType font-semibold text-xl py-[10px] pl-4 relative capitalize ' style={{ backgroundColor: backgroundColor }}>
          <span
            className=' absolute top-0 left-0 bottom-0 w-[5px] rounded-tr-md rounded-br-md '
            style={{ backgroundColor: spanBG }}
          >
          </span> {title}
        </h4>
        <Row className='mt-10 ' gutter={[20, 20]}>
          <Col lg={12}>
            <div className='request_data'>
              <h4 className=' font-medium text-base'>Date From</h4>
              <p className=' text-base font-normal'>{formatDate(dateFrom, 'DD-MM-YYYY')}</p>
            </div>
          </Col>
          <Col lg={12}>
            <div className='request_data'>
              <h4 className=' font-medium text-base'>Date To </h4>
              <p className=' text-base font-normal'>{formatDate(dateTo, 'DD-MM-YYYY')}</p>
            </div>
          </Col>
          {leaveTypeDay &&
            <>
              <Col lg={12}>
                <div className='request_data'>
                  <h4 className=' font-medium text-base'>Time From </h4>
                  <p className=' text-base font-normal'>{formatDate(timeFrom, 'hh:mm a')}</p>
                </div>
              </Col>
              <Col lg={12}>
                <div className='request_data'>
                  <h4 className=' font-medium text-base'>Time To</h4>
                  <p className=' text-base font-normal'>{formatDate(timeTo, "hh:mm a")}</p>
                </div>
              </Col> </>
          }
          <Col lg={12}>
            <div className='request_data'>
              <h4 className=' font-medium text-base'>{leaveTypeDay ? "Hours" : "Duration"}</h4>
              <p className=' text-base font-normal'>{leaveTypeDay ? hours : dur} </p>
            </div>
          </Col>
          <Col lg={12}>
            <div className='request_data'>
              <h4 className=' font-medium text-base'>Status</h4>
              <p
                className=' text-base text-sm font-normal inline p-1 rounded-lg status_style mt-2 Status capitalize'
                style={{ backgroundColor: renderStatusColor[reqStatus] }}
              >
                {reqStatus}
              </p>
            </div>
          </Col>
          <Divider />
        </Row>
        <div className='request_data'>
          <h4 className=' font-medium text-base'>Description</h4>
          <p className=' text-base font-normal'>{description}</p>
        </div>
        <Divider />

        <div className='File_wrapper py-2 pl-3 rounded-md '>
          <h4 className=' font-medium text-base'>Document.pdf</h4>
          <p className=' text-base font-normal'>2 MB</p>
        </div>

        <div className='flex flex-row justify-end gap-4 mt-4 btn-section'>
          {
            (reqStatus === "PENDING" || reqStatus === "APPROVED") ?
              <Button
                size='small'
                onClick={approveDeclineRequest}
                className='light-red-bg-color text-error-color decline-btn'
              >
                Decline
              </Button>
              :
              <></>
          }
          {
            (reqStatus === "PENDING" || reqStatus === "DECLINED") ?
              <Button
                size='small'
                onClick={approveDeclineRequest}
                className='reset-bg-color text-green-color approve-btn'
              >
                Approve
              </Button>
              :
              <></>
          }
        </div>
      </div>
    </div>
  )
}

export default CalendarDrawerInnerDetail