import { useState } from 'react'
import { CloseCircleFilled } from '@ant-design/icons'
import { Modal, Select, Radio, DatePicker, Input, UploadProps, TimePicker, Form, Row, Col, message, Upload } from 'antd'
import { CommonDatePicker } from '../calendars/CommonDatePicker/CommonDatePicker';
import "./style.scss"
import dayjs from 'dayjs';
import { DocumentUpload } from '../../assets/images';
import { Button } from '../Button';
import { DEFAULT_VALIDATIONS_MESSAGES } from '../../config/validationMessages';
import { AcceptedFileTyp } from '../../config/leaveRequestFileConstant';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Dragger } = Upload;
const props: UploadProps = {
  name: 'file',
  multiple: false,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    // console.log('Dropped files', e.dataTransfer.files);
  },
};
// Leave Request Form Select Oprion Array
const leavRequestOptionDAta = [
  { value: '1', label: 'Sick' },
  { value: '2', label: 'Casual' },
  { value: '3', label: 'Work From Home' },
  { value: '4', label: 'Medical' },
]

//  Function to Change Uploaded  File Icon inLeave Request Form  
// const iconRender = (file: any, listType: any) => {
//   return <UploadOutlined />;
// };
export const LeaveRequest = (props: any) => {
  const initailVal = {
    leaveType: '',
    leaveTypeDay: '',
    start: '',
    end: '',
    days: '',
    timeFrom: '',
    timeTo: "",
    hours: '',
    reason: "",
    attachment: ''

  }
  
  const { title, open, setIsAddModalOpen, subMitLeaveBtn, data } = props;
  // console.log(openModal);
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [formVal, setFormVal] = useState(data ? data : initailVal)
  const [form] = Form.useForm();
  // const handleTimeChange = (time: any) => {
  //   const selectedHour = dayjs(time).format('h');
  //   console.log(selectedHour);
  // }
  const [requestLeave, setRequestLeave] = useState('');
  console.log(requestLeave, 'from modal box');

  return (
    <Modal
      title={title}
      open={open}
      onCancel={() => setIsAddModalOpen(false)}
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
          label="Leave Type"
          name="leavetype"
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            placeholder="Select"
            // optionFilterProp="children"
            // filterOption={(input, option) => (option?.label ?? '').includes(input)}
            options={leavRequestOptionDAta}
          />
        </Form.Item>
        <Form.Item
          name="radio"
        >
          <Radio.Group onChange={(e:any) => setRequestLeave(e.target.value)} defaultValue= "FullDay">
            <Radio value="FullDay">Full Day</Radio>
            <Radio value="HalfDay">Half Day</Radio>
          </Radio.Group>
        </Form.Item>
        <Row gutter={[10, 10]}>
          <Col lg={8}>
            <Form.Item name="datefrom" label="Date From" rules={[{ required: true }]}>
              <CommonDatePicker
                name="Date Picker1"
                open={openStartDate}
                setOpen={setOpenStartDate}
                setValue={(e: any) => console.log(e)}
                placement={'bottomLeft'}
              />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item name="dateTo" label="Date To" rules={[{ required: true }]} >
              <CommonDatePicker
                name="Date Picker"
                open={openEndDate}
                setOpen={setOpenEndDate}
                setValue={(e: any) => console.log(e)}
                placement={'bottomLeft'}
              />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item name="days" label="Days ">
              <Input
                placeholder="enter a number "
                maxLength={16}
                disabled
              />
            </Form.Item>
          </Col>
        </Row>
        {requestLeave === "HalfDay" && 
          <Row gutter={[10, 10]}>
            <Col lg={8}>
              <Form.Item name="timeFrom" label="Time From" rules={[{ required: true }]}>
                <TimePicker
                  minuteStep={60}
                  secondStep={60}
                // onChange={handleTimeChange}
                />
              </Form.Item>
            </Col>
            <Col lg={8}>
              <Form.Item name="timeTo" label="Time To" rules={[{ required: true }]}>
                <TimePicker
                  minuteStep={60}
                  secondStep={60}
                // onChange={handleTimeChange}
                />
              </Form.Item>
            </Col>
            <Col lg={8}>
              <Form.Item name="hours" label="Hours">
                <Input
                  placeholder="enter a number "
                  maxLength={16}
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>
        }
        <Form.Item name="reason" label='Reason' rules={[{ required: true }]} >
          <TextArea rows={4} placeholder="Enter reason for leave" maxLength={6} />
        </Form.Item>
        <Form.Item label="Attachment" name='attachment'>
          <Dragger
            accept={AcceptedFileTyp}
            beforeUpload={() => false}
            className="FileUploder"
            // iconRender={iconRender}
            {...props}
          >
            <div className='File_info_wraper'  >
              <p className="ant-upload-text">Drag & drop files or <span>Browse</span> </p>
              <p className="ant-upload-hint">Support jpeg,pdf and doc files</p>
            </div>
            <p className="ant-upload-drag-icon"><DocumentUpload /></p>
          </Dragger>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 13, span: 11 }}>
          <div className='flex items-center justify-between'>
            <Button

              className='Leave_request_Canclebtn'
              label="Cancle"
              onClick={() => { setIsAddModalOpen(false); form.resetFields() }}
              type="primary"
              htmlType="button"
            />
            <Button
              className='Leave_request_SubmitBtn'
              label="Submit"
              onClick={subMitLeaveBtn}
              type="primary"
              htmlType="submit"
            />
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}