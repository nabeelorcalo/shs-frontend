import { NoDataFound, PopUpModal } from '../../../../components'
import {
  EditHistoryIcon,
  ReTime,
  UserAddIcon,
  MessageGreen,
  YellowErrow,
  RestartRed
} from "../../../../assets/images"
import useCustomHook from '../../actionHandler'
import dayjs from 'dayjs'
import { Timeline } from 'antd'
import "./style.scss"

const HistoryModal = (props?: any) => {
  const { state, setHistory } = props
  const { helpDeskDetail }: any = useCustomHook();

  const imageHandler: any = (status: any) => {
    switch (status) {
      case 'UPDATE': return <UserAddIcon />
      case 'Issue creation': return <EditHistoryIcon />
      case 'Commented': return <MessageGreen />
      case 'Changed Priority': return <YellowErrow />
      case 'Re-Opened': return <RestartRed />
      case 'Moved To': return <YellowErrow />
      case 'Assigned To': return <UserAddIcon />
      default: <MessageGreen />
    }
  }

  return (
    <div>
      <PopUpModal
        close={() => setHistory(false)}
        width={500}
        footer={false}
        title="Issue History"
        open={state?.history}
        wrapClassName='history-popup'
      >
        {helpDeskDetail.result?.length === 0 ? <NoDataFound /> : <Timeline
          className='pl-4'
          items={
            helpDeskDetail.result?.map((item: any) => {
              return {
                children: <div className='flex flex-row mb-5'>
                  <div className='pl-4'>
                    <div className='flex'>
                      <div className='text-teriary-color text-xs font-normal pr-10'>
                        {dayjs(item.createdAt).format('YYYY-MM-DD')}
                      </div>
                      <div className='text-xs light-grey-color font-normal'>
                        {dayjs(item.createdAt).format('hh:mm:A')}
                      </div>
                    </div>
                    <div className='font-medium text-base text-secondary-color '>
                      {`${item.user?.firstName} ${item?.user?.lastName} ${item.operation} record`}
                    </div>
                    <div className='flex items-center'>
                      <ReTime />
                      <p className='pl-2 text=[#6E7191] text-xs font-normal'>{item.type}</p>
                    </div>
                  </div>
                </div>,
                dot: imageHandler(item.type)
              }
            }
            )}
        />}
      </PopUpModal>
    </div>
  )
}

export default HistoryModal