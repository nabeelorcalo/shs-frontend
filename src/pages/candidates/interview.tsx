import React, { useState } from 'react'
import { Schedule, DrawerIcon, } from "../../assets/images/"
import ScheduleModal from "./scheduleModal"

const Interview = () => {
  const [open, setOpen] = useState(false);


  const ReqDocData = [
    {
      image: <DrawerIcon className='h-[60px] w-[60px]' />,
      username: 'Phylis Goadley',
      designation: 'UI UX Designer',
      schBy: 'schedule by Malik Umar',
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
      <div className='main pb-6'>
        {ReqDocData.map((data: any) => (

          <div className='flex justify-between items-center mt-3'>
            <div className="avt-wrap flex items-center">
              <div className="avatar">
                {data.image}
              </div>
              <div className="heading-drawer mt-3 ml-3">
                <p className='heading '>{data.username}</p>
                <p>{data.designation}</p>
              </div>
            </div>
            <div className="sch">
              <p>{data.schBy}</p>
              <p>{data.loc}</p>
            </div>
            <div className="time">
              <p>{data.time}</p>
              <p>{data.timeLine}</p>
            </div>

          </div>

        ))}
      </div>

    </div>
  )
}

export default Interview
