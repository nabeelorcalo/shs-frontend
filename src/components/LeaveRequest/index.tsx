import { useState } from 'react'
import { useRecoilValue } from 'recoil';
import { leavesTypesState } from '../../store';
import dayjs from 'dayjs';
import { Modal, Select, Radio, DatePicker, Input, UploadProps, TimePicker, Form, Row, Col, message, Upload } from 'antd'
import { CloseCircleFilled } from '@ant-design/icons'
import { DocumentUpload, IconDatePicker, IconCloseModal } from '../../assets/images';
import { Button } from '../Button';
import { ROUTES_CONSTANTS } from '../../config/constants';
import TimePickerComp from '../calendars/TimePicker/timePicker';
import { DEFAULT_VALIDATIONS_MESSAGES } from '../../config/validationMessages';
import "./style.scss"

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

export const LeaveRequest = (props: any) => {
  const initailVal = {
    type: '',
    durationType: 'FULL_DAY',
    dateFrom: '',
    dateTo: '',
    days: '',
    timeFrom: '',
    timeTo: "",
    hours: '',
    reason: "",
    media: ''
  }
  const { title, open, setIsAddModalOpen, onsubmitLeaveRequest, data } = props;
  const [disabledInDate, setDisabledInDate]: any = useState(null);
  const [disabledOutDate, setDisabledOutDate]: any = useState(null);
  const [time, setTime] = useState({ from: false, to: false });
  const [formVal, setFormVal] = useState(data ? data : initailVal)
  const [requestLeave, setRequestLeave] = useState('');
  const allLeaves = useRecoilValue(leavesTypesState);
  const [form] = Form.useForm();

  // const handleTimeChange = (time: any) => {
  //   const selectedHour = dayjs(time).format('h');
  //   console.log(selectedHour);
  // }

  const disabledMoveinDate = (current: any) => {
    if (current && current.isBefore(dayjs().startOf('day'))) {
      return true;
    }

    if (current && disabledOutDate && current.isAfter(disabledOutDate.endOf('day'))) {
      return true;
    }
    return false;
  };

  const disabledMoveOutDate = (current: any) => {
    if (current && current.isBefore(dayjs().startOf('day'))) {
      return true;
    }

    if (current && disabledInDate && current.isBefore(disabledInDate.startOf('day'))) {
      return true;
    }

    return false;
  };

  const handleDateOutChange = (date: any) => {
    if (date) {
      setDisabledOutDate(date);
    } else {
      setDisabledOutDate(null);
    }
  };

  const handleDateInChange = (date: any) => {
    if (date) {
      setDisabledInDate(date);
    } else {
      setDisabledInDate(null);
    }
  };

  const onSubmit = (values: any) => {
    onsubmitLeaveRequest(values, setIsAddModalOpen);
    form.resetFields();
  }

  return (
    <Modal
      title={title}
      open={open}
      onCancel={() => { setIsAddModalOpen(false), form.resetFields() }}
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
        // onValuesChange={onLeaveFormValuesChange}
        onFinish={(values) => onSubmit(values)}
      >
        <Form.Item
          label="Leave Type"
          name="type"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select"
            // optionFilterProp="children"
            // filterOption={(input, option) => (option?.label ?? '').includes(input)}
            options={allLeaves}
          />
        </Form.Item>
        
        <Form.Item name="durationType">
          <Radio.Group onChange={(e: any) => setRequestLeave(e.target.value)} defaultValue="FULL_DAY">
            <Radio value="FULL_DAY" defaultChecked>Full Day</Radio>
            <Radio value="HALF_DAY">Half Day</Radio>
          </Radio.Group>
        </Form.Item>

        <Row gutter={[10, 10]} className='flex items-center'>

          <Col lg={8}>
            <Form.Item name="dateFrom" label="Date From" rules={[{ required: true }]}>
              <DatePicker
                suffixIcon={<IconDatePicker />}
                disabledDate={disabledMoveinDate}
                showToday={false}
                onChange={handleDateInChange}
                clearIcon={<IconCloseModal />}
                value={undefined}
              />
            </Form.Item>
          </Col>

          <Col lg={8}>
            <Form.Item name="dateTo" label="Date To" rules={[{ required: true }]} >
              <DatePicker
                suffixIcon={<IconDatePicker />}
                disabledDate={disabledMoveOutDate}
                showToday={false}
                placement="bottomRight"
                onChange={handleDateOutChange}
                clearIcon={<IconCloseModal />}
                value={undefined}
              />
            </Form.Item>
          </Col>

          <Col lg={8}>
            <Form.Item label="Days">
              <Input
                placeholder={'0'}
                maxLength={16}
                disabled
              />
            </Form.Item>
          </Col>
        </Row>
        {requestLeave === "HALF_DAY" &&
          <Row gutter={[10, 10]} className='flex items-center'>
            <Col lg={8}>
              <Form.Item name="timeFrom" label="Time From" rules={[{ required: true }]}>
                <TimePickerComp
                  popupclassName={'leave-time-picker'}
                  open={time.from}
                  setValue={(value: any) => console.log(value)}
                  setOpen={() => setTime({ from: !time.from, to: false })}
                  value={dayjs(initailVal.timeFrom).format()}
                />
              </Form.Item>
            </Col>
            <Col lg={8}>
              <Form.Item name="timeTo" label="Time To" rules={[{ required: true }]}>
                <TimePickerComp
                  popupclassName={'leave-time-picker'}
                  open={time.to}
                  setOpen={() => setTime({ to: !time.to, from: false })}
                  value={dayjs(initailVal.timeTo).format()}
                  setValue={(value: any) => console.log(value)}
                />
              </Form.Item>
            </Col>
            <Col lg={8}>
              <Form.Item label="Hours">
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
          <TextArea rows={4} placeholder="Enter reason for leave" />
        </Form.Item>

        <Form.Item label="Attachment" name='media'>
          <Dragger
            accept={ROUTES_CONSTANTS.AcceptedFileTyp}
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

        <div className='flex items-center justify-end gap-[20px]'>
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
            type="primary"
            htmlType="submit"
          />
        </div>
      </Form>
    </Modal>
  )
}