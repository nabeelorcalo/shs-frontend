import { EditIcon } from '../../../../assets/images';
import Drawer from '../../../Drawer';
import EventDetail from './eventDetail';
import './style.scss';

const Index = (props: any) => {
  const { open, setOpen, type, eventId } = props;

  const renderTitle: any = {
    'eventDetail': <div className='flex items-center gap-3'>
      <p>Event Detail</p>
      <EditIcon className='cursor-pointer' />
    </div>
  }

  return (
    <Drawer
      open={open}
      width={'522px'}
      title={renderTitle[type]}
      className='calendar-drawer-wrapper'
      onClose={() => setOpen(!open)}
    >
      <EventDetail eventId={eventId} />
    </Drawer>
  )
}

export default Index