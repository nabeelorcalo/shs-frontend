import { useState } from 'react'
import { calendarMockData } from '../mockData';
import { Button, Radio } from 'antd';
import { Input } from '../../../Input/input';
import { DropDown } from '../../../Dropdown/DropDown';
import TimePickerComp from '../../TimePicker/timePicker';
import { ArrowDownDark, LocationDarkIcon, VideoRecoder } from '../../../../assets/images';
import DropDownNew from '../../../Dropdown/DropDownNew';
import { SearchBar } from '../../../SearchBar/SearchBar';
import { TextArea } from '../../../TextArea';

const EditEvent = (props: any) => {
  const { eventId, onClose } = props;
  const selectedEvent = calendarMockData.find((event) => event.id === eventId);

  const [openPicker, setOpenPicker] = useState({ from: false, to: false });
  const [pickerVal, setPickerVal] = useState({ from: '', to: '' });
  const [location, setLocation] = useState(selectedEvent?.location?.type);

  const attendeesData = [
    {
      label: <SearchBar handleChange={(e) => { }} />, key: 'searchbar'
    },
    {
      label: <>
        {selectedEvent?.attendees?.map((users) => (
          <div className='flex items-center gap-4 mb-[15px]'>
            <img src={users.userProfile} alt='icon' />
            <p>{users.userName}</p>
          </div>
        ))}
      </>,
      key: 'users-list'
    }
  ]

  return (
    <div className='edit-detail-wrapper pt-[30px]'>
      <div className="event-title">
        <label className='label block'>Event Title</label>
        <Input type='text' value={selectedEvent?.title} name='title' handleChange={() => { }} />
      </div>

      <div className="recurrence mt-[25px]">
        <label className='label pb-2 block'>Recurrence</label>
        <DropDown
          name='Daily'
          value={''}
          setValue={() => { }}
          options={['does not repeat', 'every weekday (Mon - Fri)', 'daily', 'weekly']}
        />
      </div>

      <div className='flex items-center gap-4'>
        <div className="time-from mt-[25px] basis-[50%]">
          <TimePickerComp
            label={<p className='pb-[6px]'>Time From</p>}
            open={openPicker.from}
            setOpen={() => setOpenPicker({ from: !openPicker.from, to: false })}
            value={pickerVal.from}
            setValue={(e: string) => setPickerVal({ ...pickerVal, from: e })}
          />
        </div>
        <div className="time-to mt-[25px] basis-[50%]">
          <TimePickerComp
            label={<p className='pb-[6px]'>Time To</p>}
            open={openPicker.to}
            setOpen={() => setOpenPicker({ from: false, to: !openPicker.to })}
            value={pickerVal.to}
            setValue={(e: string) => setPickerVal({ ...pickerVal, to: e })}
          />
        </div>
      </div>

      <div className="location mt-[25px]">
        <label className='label pb-2 block'>Location</label>
        <Radio.Group value={location} onChange={(e: any) => setLocation(e.target.value)}>
          <Radio value={'virtual'} className='mr-[50px]'>Virtual</Radio>
          <Radio value={'on site'}>On Site</Radio>
        </Radio.Group>
        {location === "virtual" ? <div className='virtual-link mt-[20px] rounded-lg p-[15px]'>
          <VideoRecoder className='mr-[15px]' />
          <a href="https://zoom.com/call/0234" target="_blank" rel="noopener noreferrer">
            {selectedEvent?.location.link}
          </a>
        </div> :
          <div className='on-site-address mt-[20px] rounded-lg p-[15px] flex items-center'>
            <LocationDarkIcon className='mr-[20px]' />
            <p className='break-words'>6-9 The Square, Hayes, Uxbridge UB11 1FW, UK</p>
          </div>}
      </div>

      <div className="attendees mt-[25px]">
        <label className='label pb-2 block'>Attendess</label>
        <DropDownNew items={attendeesData}>
          <div className='attendees-dropdown rounded-lg flex items-center h-[48px] cursor-pointer justify-between gap-3 py-2 px-4'>
            <p>Select</p>
            <ArrowDownDark />
          </div>
        </DropDownNew>
        <div className="flex items-center gap-2 mt-[10px] flex-wrap">
          {selectedEvent?.attendees?.map((users, i) => (
            <img key={i} src={users.userProfile} className='h-[32px] w-[32px] rounded-full object-cover' />
          ))}
        </div>
      </div>

      <div className="description mt-[25px]">
        <label className='label pb-2 block'>Description</label>
        <TextArea rows={4} value={selectedEvent?.description} placeholder='write something...' onChange={(e: any) => { }} />
      </div>

      <div className="flex items-center justify-end gap-3 mt-[30px]">
        <Button className='outlined-btn' onClick={() => onClose(false)}>Cancel</Button>
        <Button className='primary-btn' onClick={() => onClose(false)}>Submit</Button>
      </div>

    </div>
  )
}

export default EditEvent