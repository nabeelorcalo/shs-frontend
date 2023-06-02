import { useState } from 'react'
import { CloseCircleFilled } from '@ant-design/icons'
import { Modal, Form, Row, Col, Input, } from 'antd'
import { CommonDatePicker } from '../../../components';
import "./style.scss"
import { Button } from '../../../components';
import { DEFAULT_VALIDATIONS_MESSAGES } from '../../../config/validationMessages';
import Checkbox from 'antd/es/checkbox';
import dayjs from 'dayjs';
import useCustomHook from '../actionHandler';
export const SetGoal = (props: any) => {
  const action = useCustomHook();
  const { title, open, setOpenAddGoal, submitAddGoal } = props;
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const addGoalHandle = async () => {
      const values = await form.validateFields();
      values.endDate = dayjs(values.endDate).toISOString().split('T')[0];
      values.startDate = dayjs(values.startDate).toISOString().split('T')[0];
      values.mainGoal = values.mainGoal || false;
      const data = {
        endDate: values.endDate,
        startDate: values.startDate,
        mainGoal: values.mainGoal,
        name: values.name,
      }
      setLoading(true);
      await action.addGoals(data);
      setDisabled(true)
      setLoading(false);
      setOpenAddGoal(false);
      form.resetFields()
  };

  return (
    <Modal
      title={title}
      open={open}
      onCancel={() => setOpenAddGoal(false)}
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
        onValuesChange={() => setDisabled(false)}
        onFinish={addGoalHandle}
      >
        <Form.Item
          label="Goal Name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input
            id="01"
            type="text"
            name="name"
          />
        </Form.Item>
        <Row gutter={[10, 10]}>
          <Col lg={12}>
            <Form.Item name="startDate" label="Start Date" rules={[{ required: true }]}>
              <CommonDatePicker
                name="Date Picker1"
                open={openStartDate}
                setOpen={setOpenStartDate}
                placement={'bottomLeft'}
              />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item name="endDate" label="End Date" rules={[{ required: true }]} >
              <CommonDatePicker
                name="Date Picker"
                open={openEndDate}
                setOpen={setOpenEndDate}
                placement={'bottomLeft'}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name='mainGoal' valuePropName='checked' >
          <Checkbox>Mark as main goal.</Checkbox>
        </Form.Item>
        <Form.Item >
          <div className='flex items-center justify-end gap-3'>
            <Button
              className='Leave_request_Canclebtn'
              label="Cancel"
              onClick={() => { setOpenAddGoal(false); form.resetFields() }}
              type="primary"
              htmlType="button"
            />
            <Button
              className='Leave_request_SubmitBtn'
              disabled= {disabled}
              loading={loading}
              label="Submit"
              onClick={submitAddGoal}
              type="primary"
              htmlType="submit"
            />
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}