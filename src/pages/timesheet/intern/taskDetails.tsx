import React, { useState } from 'react'
import { BoxWrapper, Button, CommonDatePicker, DropDown, Input, TimesheetCategories } from '../../../components';
import { TagPrimaryIcon, TagSuccessIcon, TagWarningIcon } from '../../../assets/images';
import { Row, Col } from 'antd';
import TimePickerComp from '../../../components/calendars/TimePicker/timePicker';

const TaskDetails = () => {

  const [taskDetailVal, setTaskDetailVal] = useState({
    taskName: "UI UX design",
    date: '',
    category: 'Design',
    startTime: '',
    endTime: '',
    categoriesList: [
      { id: '1', title: 'design task', hours: '21h:29m' },
      { id: '2', title: 'outdoor activities', hours: '21h:29m' },
      { id: '3', title: 'research', hours: '21h:29m' },
    ]
  });

  const [openTime, setOpenTime] = useState({ start: false, end: false });

  const categories = ['design', 'research/R&D', 'requirement on confluence', 'user stories on jira', 'others'];

  const [openDatePicker, setOpenDatePicker] = useState(false);

  const handleChange = (e: string, type: string) => { }

  return (
    <BoxWrapper boxShadow='0px 0px 8px 1px rgba(9, 161, 218, 0.1)' className='intern-task-detail'>
      <p className='font-medium text-xl task-heading mb-[20px]'>Task Details</p>

      <Input
        type='text'
        className='task-name mb-[30px]'
        name='taskName'
        placeholder='Task Name'
        value={taskDetailVal.taskName}
        handleChange={(e: any) => handleChange(e.target.value, 'taskName')}
      />

      <CommonDatePicker
        className='task-date-picker mb-[30px]'
        open={openDatePicker}
        setOpen={setOpenDatePicker}
        setValue={(e: string) => handleChange(e, 'datePicker')}
      />

      <DropDown
        options={categories}
        value={taskDetailVal.category}
        setValue={(e: string) => handleChange(e, 'category')}
      />

      <Row className='mb-[30px]' gutter={[20, 20]}>
        <Col lg={12}>
          <TimePickerComp
            label={'Start Time'}
            open={openTime.start}
            setOpen={() => setOpenTime({ start: !openTime.start, end: false })}
            setValue={(val: string) => setTaskDetailVal({ ...taskDetailVal, startTime: val })}
          />
        </Col>
        <Col lg={12}>
          <TimePickerComp
            label={'End Time'}
            open={openTime.end}
            setOpen={() => setOpenTime({ end: !openTime.end, start: false })}
            setValue={(val: string) => setTaskDetailVal({ ...taskDetailVal, endTime: val })}
          />
        </Col>
      </Row>
      <div className='task-categories'>
        <p className='font-medium text-xl task-heading mb-[20px]'>Categories</p>

        {taskDetailVal.categoriesList.map((category, i) => (
          <div
            key={i}
            className='flex items-center justify-between flex-wrap gap-3'
          >
            <div className='flex items-center  gap-3 capitalize mb-[20px]'>
              {category.title === 'design task' ?
                <TagPrimaryIcon /> :
                category.title === 'outdoor activities' ?
                  <TagSuccessIcon /> :
                  <TagWarningIcon />
              }
              <p className='task-category-title'>{category.title}</p>
            </div>
            <p className='text-xs task-category-hours'>{category.hours}</p>
          </div>
        ))
        }
        <div className="text-center">
          <Button
            label='Load More'
            className='load-more text-input-bg-color light-grey-color my-[20px]'
          />
          <TimesheetCategories
            legend={''}
            color={['#5D89F4', '#E76864', '#FFC200']}
            height={250} width={250}
          />
        </div>
      </div>
    </BoxWrapper >
  )
}

export default TaskDetails