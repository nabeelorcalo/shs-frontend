import { CalendarIcon, CalendarSearch, CalUserIcon, ClockDarkIcon, CopyPasteIcon, LocationDarkIcon, VideoRecorder } from '../../../../assets/images';
import { calendarMockData } from '../mockData';
import { Button } from 'antd';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { Alert } from '../../../Alert';
import { useState } from 'react';

const EventDetail = (props: any) => {

  dayjs.extend(weekOfYear);

  const { eventId, eventCategory, eventStatus } = props;
  const [isReminder, setIsReminder] = useState(false);

  const selectedEvent = calendarMockData.find(event => event.id === eventId);

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
        <p className='font-medium text-xl heading mb-[16px] capitalize'>{selectedEvent?.title}</p>

        <div className="flex items-center gap-3">
          <img src={CalendarIcon} />
          {eventCategory !== 'reminder' ? <p className='event-info'>
            {formatTimeDate(selectedEvent?.start, 'dddd, MM MMM YYYY')}
            &nbsp;-&nbsp;
            {formatTimeDate(selectedEvent?.end, 'dddd, MM MMM YYYY')}
          </p>
            :
            <p>{formatTimeDate(selectedEvent?.end, 'dddd, MM MMM YYYY')}</p>
          }
        </div>
        <div className="flex items-center gap-3 my-[20px]">
          <ClockDarkIcon />
          {eventCategory === 'reminder' ? <p>{formatTimeDate(selectedEvent?.end, 'HH:MM A')}</p> :
            <p className='event-info'>
              {formatTimeDate(selectedEvent?.start, 'HH:MM A')}
              &nbsp;-&nbsp;
              {formatTimeDate(selectedEvent?.end, 'HH:MM A')}
              &nbsp;
              {`(${hourDiff(selectedEvent?.start, selectedEvent?.end)} hours) `}
            </p>
          }
        </div>

        {selectedEvent?.userName && <div className="flex items-center gap-3 my-[20px]">
          <CalUserIcon />
          <p className='capitalize'>
            {selectedEvent?.userName}
            <span className='user-role'>&nbsp;(organizer)</span>
          </p>
        </div>}
      </div>
      <div className="event-type">
        <p className='font-medium text-xl heading mb-[16px]'>Event Type</p>
        <div className="flex items-center gap-3 my-[20px]">
          <CalendarSearch />
          <p className='capitalize'>{selectedEvent?.category}</p>
        </div>
      </div>
      {
        selectedEvent?.location.type === 'virtual' ?
          <div className="virtual">
            <p className='font-medium text-xl heading'>Virtual</p>
            <div className="flex items-center gap-3">
              <div className="link flex flex-1 items-center justify-between gap-3 rounded-lg my-[20px]">
                <VideoRecorder />
                <p>{selectedEvent?.location?.link}</p>
                <CopyPasteIcon />
              </div>
              <Button className='primary-btn rounded-lg green-graph-tooltip-bg'>Join Call</Button>
            </div>
          </div>
          :
          <div className="onsite">
            <p className='font-medium text-xl heading mb-[16px]'>Onsite</p>
            <div className="flex items-center justify-between gap-3 rounded-lg my-[20px]">
              <LocationDarkIcon />
              <p className='capitalize'>{selectedEvent?.location?.link}</p>
              <CopyPasteIcon />
            </div>
          </div>
      }
      {selectedEvent?.attendees && <div className="attendees">
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
      </div>}
      <div className="description">
        <p className='font-medium text-xl heading mb-[16px]'>Description</p>
        <p className='font-normal text-sm'>{selectedEvent?.description}</p>
      </div>
      <div className="flex justify-end gap-3 mt-[20px] event-actions">

        {eventCategory === 'reminder' ? <Button className='outlined-btn rounded-lg' onClick={() => setIsReminder(!isReminder)}>Delete Reminder</Button> :

          eventCategory === 'meeting' ? <>
            <Button className='outlined-btn rounded-lg capitalize'>
              {eventStatus === 'pending' ? 'cancel meeting' : 'decline'}
            </Button>
            <Button className='primary-btn rounded-lg green-graph-tooltip-bg capitalize'>
              {eventStatus === 'pending' ? 'notify attendees' : eventStatus === 'accept' ? 'accept' : 'accepted'}
            </Button>
          </> :
            <>
              <Button className='outlined-btn rounded-lg capitalize'>Decline</Button>
              <Button className='primary-btn rounded-lg green-graph-tooltip-bg capitalize'>Accept</Button>
            </>
        }
      </div>
      <Alert
        type={'warning'}
        state={isReminder}
        setState={setIsReminder}
        okBtnFunc={() => { }}
        cancelBtntxt={'Cancel'}
        okBtntxt={'Delete'}
        children={<p>Are you sure you want to delete this event?</p>}
      />
    </div>
  )
}

export default EventDetail