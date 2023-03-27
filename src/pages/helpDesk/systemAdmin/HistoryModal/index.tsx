import React, { useState } from 'react'
import { PopUpModal } from '../../../../components'
import { EditHistoryIcon, ReTime, UserAddIcon, MessageGreen, YellowErrow, RestartRed } from "../../../../assets/images"
import { Divider } from "antd"

const HistoryData = [
  {
    img: <EditHistoryIcon />,
    date: "3 November 2022",
    time: "2:48 PM",
    title: "Natalia assigned the issue to Kristy.",
    status: "Issue creation",
  },
  {
    img: <UserAddIcon />,
    date: "3 November 2022",
    time: "2:48 PM",
    title: "Kristy moved the issue to In-Progress.",
    status: "Changed Statusn",
  },
  {
    img: <MessageGreen />,
    date: "3 November 2022",
    time: "2:48 PM",
    title: "Kristy commented on the issue.",
    status: "Commented",
  },
  {
    img: <YellowErrow />,
    date: "3 November 2022",
    time: "2:48 PM",
    title: "Kristy moved the issue to Resolved.",
    status: "Change Status",
  },
  {
    img: <RestartRed />,
    date: "3 November 2022",
    time: "2:48 PM",
    title: "Kristy Re-opened the issue.",
    status: "Re-opened",
  },
]

const HistoryModal = (props: any) => {
  const { history, setHistory } = props

  return (
    <div>
      <PopUpModal close={() => setHistory(false)} width={500} footer={false} title="Issue History" open={history}>

        {
          HistoryData.map((item: any) => {
            return (
              <>
                <div className='flex pt-16'>
                  {item.img}

                  <div className='pl-4'>
                    <div className='flex'>
                      <div className='text-teriary-color text-xs font-normal pr-10'>{item.date}</div>
                      <div className='text-xs text-[#A0A3BD] font-normal'>{item.time}</div>
                    </div>

                    <div className='font-medium text-base text-secondary-color '>{item.title}</div>

                    <div className='flex items-center'>
                      <ReTime />
                      <p className='pl-2 text=[#6E7191] text-xs font-normal'>{item.status}</p>
                    </div>
                  </div>
                </div>

              </>
            )
          })
        }

      </PopUpModal>
    </div>
  )
}

export default HistoryModal