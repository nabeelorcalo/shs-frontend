import { Modal, Tabs } from 'antd';
import { CloseCircleIcon } from '../../../../assets/images';
import type { TabsProps } from 'antd';
import './style.scss';
import Meeting from './meeting';
import Reminder from './reminder';

const CalendarModalBox = (props: any) => {
  const { open, setOpen } = props;

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Meeting',
      children: <Meeting onClose={setOpen} />
    },
    {
      key: '2',
      label: 'Reminder',
      children: <Reminder onClose={setOpen} />
    },
  ]

  return (
    <Modal
      open={open}
      width={'700px'}
      className='calendar-modal-box'
      closable
      onCancel={() => setOpen(!open)}
      title='Add Event'
      footer=''
      closeIcon={<img src={CloseCircleIcon} />}
    >
      <Tabs defaultActiveKey="1" items={items}></Tabs>
    </Modal>
  )
}

export default CalendarModalBox