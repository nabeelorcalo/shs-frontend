import { Button, Form } from 'antd'
import React, { useState } from 'react'
import { Input } from '../../../Input/input'
import { calendarMockData } from '../mockData';
import { CommonDatePicker } from '../../CommonDatePicker/CommonDatePicker';
import TimePickerComp from '../../TimePicker/timePicker';
import { TextArea } from '../../../TextArea';

const EditReminder = (props: any) => {
    const { eventId, onClose } = props;
    const [openDateTime, setOpenDateTime] = useState({ date: false, time: false });
    const [vals, setVals] = useState({
        title: '',
        date: '',
        time: '',
        description: ''
    })
    const findReminder = calendarMockData.find(event => event.id === eventId);
    return (
        <div className='edit-reminder-wrapper'>
            <Form layout='vertical'>
                <Form.Item rules={[{ required: true }]} label='Event Title'>
                    <Input type='text' value={findReminder?.title} handleChange={(e: any) => { setVals({ ...vals, title: e.target.value }) }} />
                </Form.Item>
                <Form.Item rules={[{ required: true }]} label='Date'>
                    <CommonDatePicker
                        open={openDateTime.date}
                        setValue={(val: string) => setVals({ ...vals, date: val })}
                        setOpen={() => setOpenDateTime({ date: !openDateTime.date, time: false })}
                    />
                </Form.Item>
                <Form.Item rules={[{ required: true }]} label='Time'>
                    <TimePickerComp
                        open={openDateTime.time}
                        setValue={(val: string) => setVals({ ...vals, time: val })}
                        setOpen={() => setOpenDateTime({ date: false, time: !openDateTime.time })}
                    />
                </Form.Item>

                <Form.Item rules={[{ required: true }]} label='Description'>
                    <TextArea 
                    className='description' 
                    value={findReminder?.description} 
                    onChange={(e: any) => setVals({ ...vals, description: e.target.value })}
                    rows={4}
                    />
                </Form.Item>

                <div className="flex justify-end gap-3">
                    <Button className='outlined-btn'>Cancel</Button>
                    <Button className='primary-btn'>Submit</Button>
                </div>
            </Form>
        </div>
    )
}

export default EditReminder