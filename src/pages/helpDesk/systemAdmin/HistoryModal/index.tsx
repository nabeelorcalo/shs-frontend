import React, { useState } from 'react'
import { PopUpModal } from '../../../../components'
import { EditHistoryIcon, ReTime, UserAddIcon, MessageGreen, YellowErrow, RestartRed } from "../../../../assets/images"
import useCustomHook from '../../actionHandler'
import dayjs from 'dayjs'

const HistoryModal = (props?: any) => {
  const { state, setHistory } = props
  const { helpDeskDetail }: any = useCustomHook();

  const imageHandler: any = (status: any) => {
    switch (status) {
      case 'UPDATE': return <UserAddIcon />
      case 'CREATE': return <EditHistoryIcon />
      case 'COMMENTED': return <MessageGreen />
      default: <RestartRed />
    }
  }

  return (
    <div>
      <PopUpModal close={() => setHistory(false)} width={500} footer={false} title="Issue History" open={state?.history}>
        {helpDeskDetail.result !== 'No Data Found' && helpDeskDetail.result?.map((item: any) => {
          return (
            <>
              <div className='flex pt-16'>
                {imageHandler(item.operation)}
                <div className='pl-4'>
                  <div className='flex'>
                    <div className='text-teriary-color text-xs font-normal pr-10'>{dayjs(item.createdAt).format('YYYY-MM-DD')}</div>
                    <div className='text-xs light-grey-color font-normal'>{dayjs(item.createdAt).format('hh:mm:A')}</div>
                  </div>

                  <div className='font-medium text-base text-secondary-color '>{`${item.user?.firstName} ${item?.user?.lastName} ${item.operation} record`}</div>

                  <div className='flex items-center'>
                    <ReTime />
                    <p className='pl-2 text=[#6E7191] text-xs font-normal'>{item.operation}</p>
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