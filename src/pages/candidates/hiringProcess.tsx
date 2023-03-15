import React, { useState } from 'react'
import HiringPipeline from '../../components/HiringPIpeline/hiringPipeline'
import DocAvatar from "../../assets/images/doc-avatar.png"
import { Col, Row } from 'antd/es/grid'
import BtnIcon from "../../assets/images/Button-icon.png"
import { Input } from 'antd'
import RequestDocModel from './requestDocModel'
import RejectModal from './RejectModal'
const detailsData = [
  { title: 'Source', value: 'Career Website' },
  { title: 'Owner', value: 'David Miler', image: DocAvatar },
  { title: 'Internship Type', value: 'Paid' },
  { title: 'Applied Date', value: '04/12/1996' },
]
const HiringProcess = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="hiring-wrapper">
      <div className='hiring flex justify-between'>
        <div>
          <p className='heading mt-5'>UI UX Designer</p>
        </div>
        <div className="rej-mov mt-4 gap-2 flex">

        <button onClick={() => setOpen(true)} className='rej-btn cursor-pointer'>
        Reject
      </button>
      <RejectModal setOpen={setOpen} open={open} />
          <button className='move-btn'>Move</button>
        </div>
      </div>

      <div className="pipeline mt-10 ml-8">
        <HiringPipeline />
      </div>

      <div className="details mt-7 ">
        <div className="heading">
          <p>Details</p>
        </div>
        <div className='mt-3'>
          <Row gutter={[30, 35]}>
            {detailsData.map((item: any) => (
              <Col xl={8} lg={8} md={8} sm={12} xs={24} >
                <div>
                  <h2 className='m-0 font-medium text-base title'>{item.title}</h2>
                  <div className="flex">
                    <img className='' src={item.image} alt="" />
                    <p className=''>{item.value}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

        </div>
      </div>

      <div className="cmnt-wrapper mt-8">
        <p className='heading'>Comments</p>
      </div>

      <div className='Comments flex justify-between mt-6'>
        <div className="icon ">
          <img className='h-[48px] w-[48px]' src={DocAvatar} alt="" />
        </div>

        <div className="Input">
          <Input className='ant-inp' placeholder='Write anything here...'>
          </Input>
        </div>

        <button className='btn-icon'>
          <img src={BtnIcon} alt="" />
        </button>

      </div>

      <div className="cmnt-main gap-5 mt-6">
        <div className="avatar mt-2">
          <img src={DocAvatar} alt="" />
        </div>
        <div className="text flex gap-3">
          <p className='font-medium'>Albert John</p>
          <p className='mt-1 txt-p'>15.45 . 10 Nov 2022</p>
        </div>
        <div >
          <p>I have interviewed the candidate and I recommend her to be added as part of design team.</p>
        </div>
      </div>
     

    </div>
  )
}

export default HiringProcess
