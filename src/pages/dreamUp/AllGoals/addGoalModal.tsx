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
import useCustomHook from '../actionHandler';
// Leave Request Form Select Oprion Array
export const SetGoal = (props: any) => {
  const {addGoals} =useCustomHook();
  const initailVal = {
    name: '',
    startDate: '',
    endDate: '',
    mainGoal: true,
  }
  const { title, open, setOpenAddGoal, data } = props;
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [formVal, setFormVal] = useState(initailVal)
  // const [date, setDate] = useState({startDate:"",endDate:""})
  // console.log(date,"date from calander");
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
        initialValues={initailVal}
        // onValuesChange={onValueChangesAddGoal}
        onFinish={ (values) => { addGoals(values), form.resetFields(); setOpenAddGoal(false); }}
      >
        <Form.Item
          label="Goal Name"
          name="name"
        >
          <Input
            id="01"
            type="text"
            value={formVal.name} placeholder={"Enter Goal Name"}
            onChange={(e: any) => setFormVal({ ...formVal, name: e.target.value })}
          />
        </Form.Item>
        <Row gutter={[10, 10]}>
          <Col lg={12}>
            <Form.Item name="startDate" label="Start Date">
              <CommonDatePicker
                name={formVal.startDate}
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
                name={formVal.endDate}
                open={openEndDate}
                setOpen={setOpenEndDate}
                setValue={(e: any) => setFormVal({ ...formVal, endDate: e })}
                placement={'bottomLeft'}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="mainGoal"  >
          <Checkbox onChange={(e: any) => setFormVal({ ...formVal, mainGoal: e.target.checked })} checked ={formVal.mainGoal}>Mark as main goal.</Checkbox>
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
              label="Submit"
              // onClick={submitAddGoal}
              type="primary"
              htmlType="submit"
            />
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}