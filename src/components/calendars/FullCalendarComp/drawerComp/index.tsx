import { useState } from 'react';
import { EditIcon } from '../../../../assets/images';
import Drawer from '../../../Drawer';
import EventDetail from './eventDetail';
import './style.scss';

const Index = (props: any) => {
  const { open, setOpen, category, eventId, status } = props;
  const [toggle, setToggle] = useState(false);

  const renderTitle: any = {
    'meeting': <div className='flex items-center gap-3'>
      <p>Event Detail</p>
      <EditIcon className='cursor-pointer' onClick={() => { setToggle(!toggle) }} />
    </div>,
    'interview': <p>Interview Detail</p>,
    'reminder': <p>Event Detail</p>
  };

  return (
    <Drawer
      open={open}
      width={'522px'}
      title={renderTitle[category]}
      className='calendar-drawer-wrapper'
      onClose={() => setOpen(!open)}
    >
      {!toggle ? <EventDetail eventId={eventId} eventCategory={category} eventStatus={status} /> : 'not'}
    </Drawer>
  )
}

export default Index