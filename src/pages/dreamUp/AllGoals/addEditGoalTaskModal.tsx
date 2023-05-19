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
import useCustomHook from '../actionHandler';
// Leave Request Form Select Oprion Array
export const AddEditGoalTaskModal = (props: any) => {
 const {mainGoalId} = props
//  console.log(mainGoalId,"mainGoalId from form ");
 
  const { addGoalTask } = useCustomHook();
  const initailVal = {
    goalId:mainGoalId,
    name: '',
    note: '',
    startingDate: '',
    completed: false,
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
        initialValues={initailVal}
        // onValuesChange={onValueChangesAddGoalTask}
        onFinish={(values) => { addGoalTask(values,formVal), form.resetFields(); setOpenAddEditGoalTask(false); }}
      >
        <Form.Item
          label="Task Name"
          name="name"
        >
          <Input
            id="01"
            type="text"
            name="name"
            value={formVal.name}
            placeholder={"Enter your goal task name"}
            onChange={(e: any) => setFormVal({ ...formVal, name: e.target.value })}
          />
        </Form.Item >
        <Form.Item label="Notes" name="note" >
          <TextArea rows={6}
            placeholder="Type a message"
            maxLength={8} valuue={formVal.note}
            onChange={(e: any) => setFormVal({ ...formVal, name: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          name="startingDate"
          label="Date To"  >
          <CommonDatePicker
            name="Date Picker"
            open={openStartDate}
            setOpen={setOpenStartDate}
            setValue={(e: any) => setFormVal({ ...formVal, startingDate: e })}
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
              // onClick={submitGoalTask}
              type="primary"
              htmlType="submit"
            />
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}
