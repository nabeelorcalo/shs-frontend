import { useState } from 'react';
import { Checkbox, Col, Row } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CommonDatePicker } from '../../calendars/CommonDatePicker/CommonDatePicker';
import { Input } from '../../Input/input';
import Model from '../model'

const GoalModal = ({ open, setOpen, onOk }: any) => {

    const [openStartDate, setOpenStartDate] = useState(false);
    const [openEndDate, setOpenEndDate] = useState(false);

    const [goalVal, setGoalVal] = useState({ goalName: '', startDate: "", endDate: "", isMainGoal: false });


    const handleChange = (val: string | boolean | any, type: string) => {
        switch (type) {
            case 'name':
                setGoalVal({ ...goalVal, goalName: val })
                break;
            case 'startDate':
                setGoalVal({ ...goalVal, startDate: val })
                break;
            case 'endDate':
                setGoalVal({ ...goalVal, endDate: val })
                break;
            case 'checkbox':
                setGoalVal({ ...goalVal, isMainGoal: val })
                break;

            default:
                break;
        }
    }

    return (
        <Model title='Set a Goal' open={open} setOpen={setOpen} okText='Add'>
            <Row gutter={20}>
                <Col span={24} className='mt-[25px]'>
                    <Input type='text' className='mt-[25px]' value={goalVal.goalName} name='goalName' label='Goal Name' handleChange={(e: any) => handleChange(e.target.value, 'name')} />
                </Col>
                <Col span={12} className='mt-[25px]'>
                    <CommonDatePicker
                        label='Start Date'
                        open={openStartDate}
                        placement={'bottomLeft'}
                        setOpen={setOpenStartDate}
                        setValue={(val: string) => handleChange(val, 'startDate')}
                    />
                </Col>
                <Col span={12} className='mt-[25px]'>
                    <CommonDatePicker
                        label='End Date'
                        open={openEndDate}
                        placement={'bottomRight'}
                        setOpen={setOpenEndDate}
                        setValue={(val: string) => handleChange(val, 'endDate')}
                    />

                </Col>
            </Row>
            <Checkbox className='checkbox mt-[25px]' onChange={(e) => handleChange(e.target.checked, 'checkbox')}><span style={{ color: '#6E7191' }}>Mark as main goal</span></Checkbox>
        </Model>
    )
}

export default GoalModal
