import { useState } from 'react'
import { CloseCircleFilled } from '@ant-design/icons'
import { Modal, Form, Input, } from 'antd'
import { CommonDatePicker, TextArea } from '../../../components';
import "./style.scss"
import { Button } from '../../../components';
import { DEFAULT_VALIDATIONS_MESSAGES } from '../../../config/validationMessages';
// const { RangePicker } = DatePicker;
// import { Input } from '../../../components';
import Checkbox from 'antd/es/checkbox';
// Leave Request Form Select Oprion Array
export const AddEditGoalTaskModal = (props: any) => {
  const initailVal = {
    taskName: '',
    notes: '',
    date: '',
  }
  const { title, open, setOpenAddEditGoalTask, submitGoalTask, data } = props;
  const [openStartDate, setOpenStartDate] = useState(false);
  const [formVal, setFormVal] = useState(initailVal)
  const [form] = Form.useForm();
  // console.log(formVal);

  // const handleTimeChange = (time: any) => {
  //   const selectedHour = dayjs(time).format('h');
  //   console.log(selectedHour);
  // }
  // const [requestLeave, setRequestLeave] = useState('');
  // console.log(requestLeave, 'from modal box');

  return (
    <Modal
      title={title}
      open={open}
      onCancel={() => setOpenAddEditGoalTask(false)}
      width={600}
      className="leave_modal_main"
      maskClosable={true}
      closeIcon={<CloseCircleFilled className=' text-xl text-[#A3AED0]' />}
      footer={false}
      centered
    >
      <Form
        layout='vertical'
        form={form}
        validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
      >
        <Form.Item
          label="Task Name"
          name="taskName"
        >
          <Input
            id="01"
            type="text"
            name="taskName"
            value={formVal.taskName} placeholder={"Enter your goal task name"}
          // onChange={(e: any) => setFormVal({ ...formVal, goalName: e.target.value })}
          />
        </Form.Item >
        <Form.Item label="Notes" >
          <TextArea rows={6} placeholder="Type a message" maxLength={8} valuue={formVal.notes} />
        </Form.Item>
        <Form.Item
          name="dateTo"
          label="Date To"  >
          <CommonDatePicker
            name="Date Picker"
            open={openStartDate}
            setOpen={setOpenStartDate}
            setValue={(e: any) => console.log(e)}
            placement={'bottomLeft'}
          />
        </Form.Item>
        <Form.Item >
          <div className='flex items-center justify-end gap-3'>
            <Button
              className='Leave_request_Canclebtn'
              label="Cancel"
              onClick={() => { setOpenAddEditGoalTask(false); form.resetFields() }}
              type="primary"
              htmlType="button"
            />
            <Button
              className='Leave_request_SubmitBtn'
              label="Submit"
              onClick={submitGoalTask}
              type="primary"
              htmlType="submit"
            />
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}
