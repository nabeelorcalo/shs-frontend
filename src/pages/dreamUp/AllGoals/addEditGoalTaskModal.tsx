import { useState } from 'react'
import { CloseCircleFilled } from '@ant-design/icons'
import { Modal, Form, Input, } from 'antd'
import { CommonDatePicker, TextArea } from '../../../components';
import "./style.scss"
import { Button } from '../../../components';
import { DEFAULT_VALIDATIONS_MESSAGES } from '../../../config/validationMessages';
import useCustomHook from '../actionHandler';
import dayjs from 'dayjs';
// Leave Request Form Select Oprion Array
export const AddEditGoalTaskModal = (props: any) => {

  const action = useCustomHook();
  const { title, open, setOpenAddEditGoalTask, goalData, initValues, setInitValues } = props;
  const [openStartDate, setOpenStartDate] = useState(false);
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const dateFormat = 'YYYY/MM/DD';
  const addGoalTaskHandle = async () => {
      const values = await form.validateFields();
      console.log(goalData.id);
      const data = {
        goalId: goalData.id,
        startingDate: dayjs(values.startingDate).toISOString().split('T')[0],
        note: values.note,
        name: values.name,
        completed: false,
      }
      setLoading(true);
      console.log(data, "======================"); 
      await action.addGoalTask(data);
      setDisabled(true)
      setLoading(false);
      setInitValues({});
      setOpenAddEditGoalTask(false);
      form.resetFields();
  };

  return (
    <Modal
      title={title}
      open={open}
      onCancel={() => {setInitValues({}); setOpenAddEditGoalTask(false);}}
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
        initialValues={initValues}
        validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
        onValuesChange={() => setDisabled(false)}
        onFinish={addGoalTaskHandle}
      >
        <Form.Item
          label="Task Name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input
            id="01"
            type="text"
            name="taskName"
            placeholder={"Enter your goal task name"}
          />
        </Form.Item >
        <Form.Item 
          label="Notes" 
          name="note"
          rules={[{ required: true }]} 
        >
          <TextArea rows={6} placeholder="Type a message" maxLength={100} />
        </Form.Item>
        <Form.Item
          name="startingDate"
          label="Date To" 
          rules={[{ required: true }]} 
        >  
          <CommonDatePicker
            name="Date Picker"
            open={openStartDate}
            setOpen={setOpenStartDate}
            setValue={(e: any) => console.log(e)}
            placement={'bottomLeft'}
            format={dateFormat}
          />
        </Form.Item>
        <Form.Item >
          <div className='flex items-center justify-end gap-3'>
            <Button
              className='Leave_request_Canclebtn'
              label="Cancel"
              onClick={() => { setInitValues({}); setOpenAddEditGoalTask(false); form.resetFields(); }}
              type="primary"
              htmlType="button"
            />
            <Button
              className='Leave_request_SubmitBtn'
              label="Submit"
              disabled= {disabled}
              loading={loading}
              type="primary"
              htmlType="submit"
            />
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}
