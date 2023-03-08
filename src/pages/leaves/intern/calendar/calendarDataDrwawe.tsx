import { CloseCircleFilled } from '@ant-design/icons'
import { Col, Divider, Drawer, Row } from 'antd'
import "./style.scss"
import { LeaveProfileImg } from '../../../../assets/images'

const CalendarDataDrwawe = (props: any) => {
    const { eventData, setIsEditModalOpen, isEditModalOpen } = props;
    const events = eventData?.event?._def
    // console.log('events', events);
    return (
            <Drawer
                // title={title}
                className={`drawar_main_calendar `}
                placement="right"
                onClose={() => setIsEditModalOpen(false)}
                open={isEditModalOpen}
                closeIcon={false}
            >
                <div className='main_calender_drawer_data_wrapper'>
                    <div className='user_profile  '>
                        <div className=' profilData_wrapper flex items-center'>
                            <div className='img_wrapper w-[80px] h-[80px] rounded-full mr-8'>
                                <img src={LeaveProfileImg} alt='profile image ' className='  w-full h-full object-cover rounded-full ' />
                            </div>
                            <div className='details'>
                                <p className=" name_of_person font-semibold text-base ">Maria Sanoid</p>
                                <p className=' text-sm font-normal designation '>UI UX Designer</p>
                                <p className='email text-sm font-medium '> maria@Student Help Squad.com </p>

                            </div>

                        </div>

                        <Row className='mt-10 ' gutter={[20, 20]}>
                            <Col lg={12}>
                                <div className='request_data'>
                                    <h4 className=' font-medium text-base  '>Requested on</h4>
                                    <p className=' text-base font-normal  '>03-11-22 </p>
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className='request_data'>
                                    <h4 className=' font-medium text-base  '>Approver </h4>
                                    <p className=' text-base font-normal  '>Amelia Clark</p>
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className='request_data'>
                                    <h4 className=' font-medium text-base  '>Approved by</h4>
                                    <p className=' text-base font-normal  '>Amelia Clark</p>
                                </div>
                            </Col>
                            <Divider />
                        </Row>
                        <h4 className='leaveType font-semibold text-xl py-[10px] pl-4 relative ' style={{
                            backgroundColor: events?.title === "Sick" ?
                                "rgba(76, 164, 253, 0.25)" : events?.title === "casual" ?
                                    "rgba(255, 193, 93, 0.25)" : events?.title === "work from home" ? "rgba(233, 111, 124, 0.25)" : "rgba(106, 173, 142, 0.25)"
                        }}> <span className=' absolute top-0 left-0 bottom-0 w-[5px] rounded-tr-md rounded-br-md ' style={{
                            backgroundColor: events?.title === "Sick" ?
                                "rgba(76, 164, 253, 1)" : events?.title === "casual" ?
                                    "rgba(255, 193, 93, 1)" : events?.title === "work from home" ? "rgba(233, 111, 124, 1)" : "rgba(106, 173, 142, 1)"
                        }}></span> {events?.title}</h4>
                        <Row className='mt-10 ' gutter={[20, 20]}>
                            <Col lg={12}>
                                <div className='request_data'>
                                    <h4 className=' font-medium text-base  '>Requested on</h4>
                                    <p className=' text-base font-normal  '>03-11-22 </p>
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className='request_data'>
                                    <h4 className=' font-medium text-base  '>Approver </h4>
                                    <p className=' text-base font-normal  '>Amelia Clark</p>
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className='request_data'>
                                    <h4 className=' font-medium text-base  '>Approved by</h4>
                                    <p className=' text-base font-normal  '>Amelia Clark</p>
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className='request_data'>
                                    <h4 className=' font-medium text-base  '>Approved by</h4>
                                    <p className=' text-base font-normal  '>Amelia Clark</p>
                                </div>
                            </Col>
                            <Divider />
                        </Row>
                        <div className='request_data'>
                            <h4 className=' font-medium text-base  '>Description</h4>
                            <p className=' text-base font-normal  '>As you know I don't have a car, and as it was announced there will be a strike the entire day within the public Transportation. As I'm using the metro service to arrive at the office, this will not be possible for me tomorrow; however, I will be online during working hours, focusing on [Task a and b], answering emails, and answering any calls that might arrive.</p>
                        </div>
                        <Divider />
                        <div className='File_wrapper py-2 pl-3 rounded-md '>
                            <h4 className=' font-medium text-base  '>Document.pdf</h4>
                            <p className=' text-base font-normal  '>2 MB</p>
                        </div>
                    </div>
                </div>
            </Drawer>
    )
}
export default CalendarDataDrwawe