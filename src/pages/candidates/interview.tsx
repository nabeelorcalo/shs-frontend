import React, { useState } from 'react'
import { DeleteFilled } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { Schedule, DrawerIcon, IconEdit, } from "../../assets/images/"
import { Alert } from '../../components';
import ScheduleModal from "./scheduleModal"

const Interview = () => {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false)


  const openModal = () => {

    setAlert(true)
  }

  const ReqDocData = [
    {
      image: <DrawerIcon className='h-[60px] w-[60px]' />,
      username: 'Phylis Goadley',
      designation: 'UI UX Designer',
      schBy: 'Malik Umar',
      loc: 'Onsite',
      time: '15:30-16:00',
      timeLine: 'Half Hour Interview'

    },
  ]
  return (
    <div className=''>
      <div className="btn-wrap flex justify-end mt-3 ">
        <button onClick={() => setOpen(true)} className='req-btn flex items-center justify-center cursor-pointer'>
          <Schedule />
          <p className='btn-text'>Schedule</p>
        </button>
        <ScheduleModal setOpen={setOpen} open={open} />
      </div>

      <div className="onTime mt-8 mb-5">21 November 2022</div>

      <div className='main-wrapperr pb-6 relative '>
        {ReqDocData.map((data: any) => (
          <div className='interview-content px-4 py-4'>
            <Row gutter={[20, 20]} align="middle">
              <Col xl={6} lg={6} md={6}>
                <div className='inteview-wrapper flex items-center gap-2'>
                  <div>{data.image}</div>
                  <div>
                    <h2 className='m-0 text-sm headingg'>{data.username}</h2>
                    <p className='bottom-heading '>{data.designation}</p>
                  </div>
                </div>
              </Col>
              <Col xl={6} lg={6} md={6}>
                <div className='inteview-wrapper '>
                  <h2 className='text-sm m-0 headingg'>Suhedule by <span>{data.schBy}</span></h2>
                  <p className='bottom-heading'>{data.loc}</p>
                </div>
              </Col>
              <Col xl={6} lg={6} md={6}>
                <div className='inteview-wrapper '>
                  <h2 className='text-sm	m-0 headingg'>{data.time}</h2>
                  <p className='bottom-heading'>{data.timeLine}</p>
                </div>
              </Col>
              <Col xl={6} lg={6} md={6}>
                <div className="hover-effect ">
                  <div className=' flex gap-4 items-center h-[55px]'>
                    <div className="edit-icon h-[40px] w-[40px] flex justify-center items-center ">
                      <IconEdit onClick={() => setOpen(true)} className='cursor-pointer' />
                    </div>
                    <div onClick={openModal} className=" delete-icon edit-icon h-[40px] w-[40px] flex justify-center items-center cursor-pointer">
                      <DeleteFilled />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        ))}
        <Alert
          open={alert}
          setOpen={setAlert}
          cancelBtntxt={'No'}
          okBtntxt={'Yes'}
          children={'Are you sure you want to cancel this meeting.'}
          type={'error'}
        />
      </div>
    </div>
  )
}

export default Interview
