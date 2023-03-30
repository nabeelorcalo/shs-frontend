import { CalendarIcon, CalendarSearch, CalUserIcon, ClockDarkIcon, CopyPasteIcon, LocationDarkIcon } from '../../../../assets/images';
import { eventsMockData } from '../mockData';
import { Button } from 'antd';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

const EventDetail = (props: any) => {

  dayjs.extend(weekOfYear);

  const { eventId } = props;

  const selectedEvent = eventsMockData.find(event => event.id === eventId);

  const formatTimeDate = (value: string | any, format: string) => {
    return dayjs(value).format(format);
  }

  const hourDiff = (startTime: string | any, endTime: string | any) => {
    return dayjs(endTime).diff(dayjs(startTime), 'hour', true).toFixed(1);
  }

  const renderStatusColor: any = {
    'accepted': '#4A9D77',
    'declined': '#D83A52'
  }

  return (
    <div className='event-detail-wrapper'>
      <div className='event-detail'>
        <p className='font-medium text-xl heading mb-[16px]'>{selectedEvent?.title}</p>

        <div className="flex items-center gap-3">
          <img src={CalendarIcon} />
          <p className='event-info'>
            {formatTimeDate(selectedEvent?.start, 'dddd, MM MMM YYYY')}
            &nbsp;-&nbsp;
            {formatTimeDate(selectedEvent?.end, 'dddd, MM MMM YYYY')}
          </p>
        </div>
        <div className="flex items-center gap-3 my-[20px]">
          <ClockDarkIcon />
          <p className='event-info'>
            {formatTimeDate(selectedEvent?.start, 'HH:MM A')}
            &nbsp;-&nbsp;
            {formatTimeDate(selectedEvent?.end, 'HH:MM A')}
            &nbsp;
            {`(${hourDiff(selectedEvent?.start, selectedEvent?.end)} hours) `}
          </p>
        </div>

        <div className="flex items-center gap-3 my-[20px]">
          <CalUserIcon />
          <p className='capitalize'>
            {selectedEvent?.userName}
            <span className='user-role'>&nbsp;(organizer)</span>
          </p>
        </div>
      </div>
      <div className="event-type">
        <p className='font-medium text-xl heading mb-[16px]'>Event Type</p>
        <div className="flex items-center gap-3 my-[20px]">
          <CalendarSearch />
          <p className='capitalize'>{selectedEvent?.category}</p>
        </div>
      </div>
      <div className="onsite">
        <p className='font-medium text-xl heading mb-[16px]'>Onsite</p>
        <div className="flex items-center justify-between gap-3 rounded-lg my-[20px]">
          <LocationDarkIcon />
          <p className='capitalize'>{selectedEvent?.siteAddress}</p>
          <CopyPasteIcon />
        </div>
      </div>
      <div className="attendees">
        <p className='font-medium text-xl heading'>Attendees</p>
        <div className="user-list">
          {selectedEvent?.attendees?.map((users, i) => (
            <div className="flex items-center gap-5 my-[20px]" key={i}>
              <img src={users?.userProfile} className='h-[48px] w-[48px] rounded-full object-cover' alt='icon' />
              <div className='capitalize'>
                <p>{users?.userName}</p>
                <p className='text-xs' style={{ color: renderStatusColor[users?.status] }}>{users?.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="description">
        <p className='font-medium text-xl heading mb-[16px]'>Description</p>
        <p className='font-normal text-sm'>{selectedEvent?.description}</p>
      </div>
      <div className="flex justify-end gap-3 mt-[20px] event-actions">
        <Button className='outlined-btn rounded-lg'>Cancel Meeting</Button>
        <Button className='primary-btn rounded-lg green-graph-tooltip-bg'>Notify Attendees</Button>
      </div>
    </div>
  )
}

export default EventDetail