import { useState } from 'react'
import { CloseCircleFilled } from '@ant-design/icons'
import { Modal, Form, Row, Col, Input, } from 'antd'
import { CommonDatePicker } from '../../../components';
import "./style.scss"
import { Button } from '../../../components';
import { DEFAULT_VALIDATIONS_MESSAGES } from '../../../config/validationMessages';
// const { RangePicker } = DatePicker;
// import { Input } from '../../../components';
import Checkbox from 'antd/es/checkbox';
// Leave Request Form Select Oprion Array
export const SetGoal = (props: any) => {
  const initailVal = {
    goalName: '',
    startDate: '',
    endDate: '',
    MainGoal: '',
  }
  const { title, open, setOpenAddGoal, submitAddGoal, data } = props;
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [formVal, setFormVal] = useState(initailVal)
  const [form] = Form.useForm();
  console.log(formVal);

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
      >
        <Form.Item
          label="Goal Name"
          name="goalName"
        >
          <Input
            id="01"
            type="text"
            name="goalName"
            value={formVal.goalName} placeholder={"Enter Goal Name"}
            onChange={(e: any) => setFormVal({ ...formVal, goalName: e.target.value })}
          />
        </Form.Item>
        <Row gutter={[10, 10]}>
          <Col lg={12}>
            <Form.Item name="startDate" label="Start Date">
              <CommonDatePicker
                name="Date Picker1"
                open={openStartDate}
                setOpen={setOpenStartDate}
                setValue={(e: any) => setFormVal({ ...formVal, startDate: e })}
                placement={'bottomLeft'}
              />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item name="endDate" label="End Date"  >
              <CommonDatePicker
                name="Date Picker"
                open={openEndDate}
                setOpen={setOpenEndDate}
                setValue={(e: any) => setFormVal({ ...formVal, endDate: e })}
                placement={'bottomLeft'}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item  >
          <Checkbox onChange={(e: any) => setFormVal({ ...formVal, MainGoal: e.target.checked })}>Mark as main goal.</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 13, span: 11 }}>
          <div className='flex items-center justify-between'>
            <Button
              className='Leave_request_Canclebtn'
              label="Cancle"
              onClick={() => { setOpenAddGoal(false); form.resetFields() }}
              type="primary"
              htmlType="button"
            />
            <Button
              className='Leave_request_SubmitBtn'
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