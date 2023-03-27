import { useState } from 'react'
import { Input } from '../../../Input/input'
import { Col, Form, Row, Radio, Button } from 'antd';
import DropDownNew from '../../../Dropdown/DropDownNew';
import { ArrowDownDark, UserAvatar } from '../../../../assets/images';
import { SearchBar } from '../../../SearchBar/SearchBar';
import { DropDown } from '../../../Dropdown/DropDown';
import { CommonDatePicker } from '../../CommonDatePicker/CommonDatePicker';
import TimePickerComp from '../../TimePicker/timePicker';
import { TextArea } from '../../../TextArea';

const Meeting = () => {

  const [formValues, setFormValues] = useState({
    title: '',
    attendees: '',
    recurrence: '',
    dateFrom: '',
    dateTo: '',
    startTime: '',
    endTime: '',
    location: '',
  });

  const [openDate, setOpenDate] = useState({ from: false, to: false });
  const [openTime, setOpenTime] = useState({ start: false, end: false });
  const [activeDay, setActiveDay] = useState('');

  const recurrenceData = ['does not repeat', 'every weekday (mon-fri)', 'daily', 'weekly'];
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  console.log(formValues);


  return (
    <div className='meeting-wrapper'>
      <Form>
        <Form.Item required>
          <Input
            label='Title'
            value={formValues.title}
            name='title'
            required
            type='text'
            placeholder='Select'
            handleChange={(e: any) => setFormValues({ ...formValues, title: e.target.value })} />
        </Form.Item>
        <Form.Item required className='attendees'>
          <label className='label'>Attendees <span className='text-[#E95060]'>*</span></label>
          <DropDownNew items={[
            { key: '1', label: <SearchBar handleChange={(e) => { }} /> },
            {
              key: '2', label: <div className='flex items-center gap-3'>
                <img src={UserAvatar} className='h-[25px] w-[25px]' />
                <p>user name</p>
              </div>
            },
            {
              key: '3', label: <div className='flex items-center gap-3'>
                <img src={UserAvatar} className='h-[25px] w-[25px]' />
                <p>user name</p>
              </div>
            }
          ]}>
            <div className="users-list flex items-center justify-between">
              <p>Select</p>
              <ArrowDownDark />
            </div>
          </DropDownNew>
        </Form.Item>

        <Form.Item required className='recurrence'>
          <label className='label'>Recurrence <span className='text-[#E95060]'>*</span></label>
          <DropDown
            value={formValues.recurrence}
            options={recurrenceData}
            setValue={(e: string) => setFormValues({ ...formValues, recurrence: e })}
            name='Select'
          />
        </Form.Item>
        {formValues.recurrence !== '' &&
          <Row gutter={[15, 15]}>
            <Col xs={12}>
              <Form.Item className='date-from'>
                <CommonDatePicker
                  label='Date From'
                  open={openDate.from}
                  setOpen={() => setOpenDate({ from: !openDate.from, to: false })}
                />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item className='date-to'>
                <CommonDatePicker
                  label='Date To'
                  open={openDate.to}
                  setOpen={() => setOpenDate({ from: false, to: !openDate.to })}
                />
              </Form.Item>
            </Col>
          </Row>
        }

        {(formValues.recurrence === 'every weekday (mon-fri)' ||
          formValues.recurrence === 'weekly') &&
          <Form.Item>
            <div className='repeat-weekday'>
              <label className='label'>Repeat Every</label>
              <div className='flex items-center gap-3'>
                <p className='total-count rounded-[8px] flex items-center justify-center'>1</p>
                <p className='weeks'>Week(s)</p>
              </div>
              <div className="flex items-center gap-3 mt-3">
                {days.map(day => <p onClick={() => setActiveDay(day)}
                  className={`day capitalize rounded-full cursor-pointer flex items-center justify-center 
                  ${activeDay === day ? 'active' : ''}
                  `}
                >{day.substring(0, 1)}</p>)}
              </div>
            </div>
          </Form.Item>
        }

        <Row gutter={[15, 15]}>
          <Col xs={12}>
            <Form.Item>
              <TimePickerComp
                label='Start Time'
                open={openTime.start}
                setOpen={() => setOpenTime({ start: !openTime.start, end: false })}
                setValue={(e: string) => setFormValues({ ...formValues, startTime: e })}
                value={formValues.startTime}
              />
            </Form.Item>
          </Col>

          <Col xs={12}>
            <Form.Item>
              <TimePickerComp
                label='End Time'
                open={openTime.end}
                setOpen={() => setOpenTime({ start: false, end: !openTime.end })}
                setValue={(e: string) => setFormValues({ ...formValues, endTime: e })}
                value={formValues.endTime}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <label className="label">Location</label>
          <Radio.Group
            value={formValues.location}
            onChange={(e) => setFormValues({ ...formValues, location: e.target.value })}
          >
            <Radio value={'virtual'} className='mr-[20px]'>Virtual</Radio>
            <Radio value={'on site'}>On Site</Radio>
          </Radio.Group>
          <div className='location-link'>
          </div>
        </Form.Item>
        <Form.Item>
          <label className="label">Description (Optional)</label>
          <TextArea rows={5} />
        </Form.Item>
        <div className="flex gap-4 justify-end">
          <Button className='cancel-btn'>Cancel</Button>
          <Button className='add-btn green-graph-tooltip-bg text-white'>Add</Button>
        </div>
      </Form>
    </div>
  )
}

export default Meeting