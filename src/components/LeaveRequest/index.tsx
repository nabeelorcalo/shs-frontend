import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { leavesTypesState } from "../../store";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Modal, Select, Radio, DatePicker, Input, UploadProps, TimePicker, Form, Row, Col, message, Upload } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import { DocumentUpload, IconDatePicker, IconCloseModal } from "../../assets/images";
import { Button } from "../Button";
import { ROUTES_CONSTANTS } from "../../config/constants";
import TimePickerComp from "../calendars/TimePicker/timePicker";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../config/validationMessages";
import "./style.scss";
import TimePickerFormat from "../calendars/TimePicker/timePickerFormat";
import { timeValidator } from "../../helpers/dateTimeValidator";

dayjs.extend(duration);

const { TextArea } = Input;
const { Dragger } = Upload;

export const LeaveRequest = (props: any) => {
  const initailVal = {
    type: "",
    durationType: "FULL_DAY",
    dateFrom: "",
    dateTo: "",
    days: "",
    timeFrom: "",
    timeTo: "",
    hours: "",
    reason: "",
    media: "",
  };
  const { title, open, setIsAddModalOpen, onsubmitLeaveRequest, data, getLeaveTypes, fetchLeaveCalendar, getLeaveHistoryList } = props;
  const [disabledInDate, setDisabledInDate]: any = useState(null);
  const [disabledOutDate, setDisabledOutDate]: any = useState(null);
  const [time, setTime] = useState({ from: false, to: false });
  const [loading, setLoading] = useState(false);
  const [formVal, setFormVal] = useState(data ? data : initailVal);
  const [requestLeave, setRequestLeave] = useState(data && data?.durationType ? data.durationType : "");
  const [timeDuration, setTimeDuration] = useState("00:00");
  const allLeaves = useRecoilValue(leavesTypesState);
  const [form] = Form.useForm();

  useEffect(() => {
    if (data?.timeFrom) calculateTimeDifference();
    if (!allLeaves?.length) getLeaveTypes();
  }, [data]);

  const disabledMoveinDate = (current: any) => {
    if (current && current.isBefore(dayjs().startOf("day"))) {
      return true;
    }

    if (current && disabledOutDate && current.isAfter(disabledOutDate.endOf("day"))) {
      return true;
    }
    return false;
  };

  const disabledMoveOutDate = (current: any) => {
    if (current && current.isBefore(dayjs().startOf("day"))) {
      return true;
    }

    if (current && disabledInDate && current.isBefore(disabledInDate.startOf("day"))) {
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

  const calculateDays = () => {
    const startDate = form.getFieldValue("dateFrom");
    const endDate = form.getFieldValue("dateTo");
    if (requestLeave === "HALF_DAY") {
      return 0;
    }
    return startDate && endDate ? dayjs(endDate).diff(startDate, "days") + 1 : startDate ? 1 : data?.days;
  };

  const calculateTimeDifference = () => {
    const startTime = form.getFieldValue("timeFrom");
    const endTime = form.getFieldValue("timeTo");
    if (startTime && endTime) {
      const startMoment = dayjs(startTime, "HH:mm");
      const endMoment = dayjs(endTime, "HH:mm");
      const duration = dayjs?.duration(endMoment.diff(startMoment)).format("HH:mm");
      setTimeDuration(duration);
    } else {
      setTimeDuration("00:00");
    }
  };

  const onLeaveSubmitSuccess = () => {
    if (getLeaveHistoryList) getLeaveHistoryList();
    else if (fetchLeaveCalendar) fetchLeaveCalendar();
    form.resetFields();
    setRequestLeave("");
  }

  const onSubmit = (values: any) => {
    setLoading(true);

    const payload = {
      ...values,
      duration: calculateDays(),
    };

    if (values?.durationType === "HALF_DAY") {
      payload["dateTo"] = values?.dateFrom;
      payload.timeFrom = dayjs(values?.timeFrom, "HH:mm").toISOString();
      payload.timeTo = dayjs(values?.timeTo, "HH:mm").toISOString();
    }

    if (!values?.media) {
      delete payload["media"];
    }

    if (data?.id) {
      payload["id"] = data?.id;
      payload["edit"] = true;
    }

    onsubmitLeaveRequest(payload, setIsAddModalOpen, onLeaveSubmitSuccess).then(() => {
      setLoading(false);
    });
  };

  const handleModalCancel = () => {
    setIsAddModalOpen(false);
    setRequestLeave("");
    setTimeDuration("00:00");
    form.resetFields();
    setLoading(false);
  }

  return (
    <Modal
      centered
      width={600}
      open={open}
      title={title}
      footer={false}
      maskClosable={true}
      className="leave_modal_main"
      onCancel={handleModalCancel}
      closeIcon={<CloseCircleFilled className=" text-xl text-[#A3AED0]" />}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={formVal}
        onFinish={(values) => onSubmit(values)}
        validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
      >
        <Form.Item label="Leave Type" name="type" rules={[{ required: true }]}>
          <Select
            placeholder="Select"
            // optionFilterProp="children"
            // filterOption={(input, option) => (option?.label ?? '').includes(input)}
            options={allLeaves}
          />
        </Form.Item>

        <Form.Item name="durationType">
          <Radio.Group onChange={(e: any) => setRequestLeave(e.target.value)} defaultValue="FULL_DAY">
            <Radio value="FULL_DAY" defaultChecked>
              Full Day
            </Radio>
            <Radio value="HALF_DAY">Half Day</Radio>
          </Radio.Group>
        </Form.Item>

        <Row gutter={[10, 10]} className="flex items-center">
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
            <Form.Item name="dateTo" label="Date To" rules={[{ required: requestLeave !== "HALF_DAY" }]}>
              {
                requestLeave === "HALF_DAY" ?
                  <div>
                    <DatePicker disabled suffixIcon={<IconDatePicker />} />
                  </div>
                  :
                  <DatePicker
                    disabled={requestLeave === "HALF_DAY"}
                    suffixIcon={<IconDatePicker />}
                    disabledDate={disabledMoveOutDate}
                    showToday={false}
                    placement="bottomRight"
                    onChange={handleDateOutChange}
                    clearIcon={<IconCloseModal />}
                    value={undefined}
                  />
              }
            </Form.Item>
          </Col>

          <Col lg={8}>
            <Form.Item label="Days">
              <Input
                maxLength={16}
                disabled
                value={calculateDays()}
              />
            </Form.Item>
          </Col>
        </Row>
        {requestLeave === "HALF_DAY" && (
          <Row gutter={[10, 10]} className="flex items-center">
            <Col lg={8}>
              <Form.Item name="timeFrom" label="Time From" rules={[{ required: true }]}>
                <TimePickerFormat
                  popupclassName={"leave-time-picker"}
                  open={time.from}
                  setValue={(value: any) => {
                    form.setFieldValue("timeFrom", value);
                    calculateTimeDifference();
                  }}
                  setOpen={() => setTime({ from: !time.from, to: false })}
                  optionalTime={formVal?.timeFrom || null}
                />
              </Form.Item>
            </Col>
            <Col lg={8}>
              <Form.Item
                name="timeTo"
                label="Time To"
                rules={[
                  () => ({
                    validator(_, value: any) {
                      const startTime = form.getFieldValue("timeFrom");
                      return timeValidator(startTime, value);
                    },
                  }),
                ]}
              >
                <TimePickerFormat
                  popupclassName={"leave-time-picker"}
                  open={time.to}
                  setOpen={() => setTime({ to: !time.to, from: false })}
                  optionalTime={formVal.timeTo || null}
                  setValue={(value: any) => {
                    form.setFieldValue("timeTo", value);
                    calculateTimeDifference();
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={8}>
              <Form.Item label="Hours">
                <Input placeholder="enter a number " maxLength={16} disabled value={timeDuration} />
              </Form.Item>
            </Col>
          </Row>
        )}

        <Form.Item name="reason" label="Reason" rules={[{ required: true }]}>
          <TextArea rows={4} placeholder="Enter reason for leave" />
        </Form.Item>

        <Form.Item label="Attachment" name="media">
          <Dragger
            accept={ROUTES_CONSTANTS.AcceptedFileTyp}
            beforeUpload={() => false}
            className="FileUploder"
            // iconRender={iconRender}
            {...props}
          >
            <div className="File_info_wraper">
              <p className="ant-upload-text">
                Drag & drop files or <span>Browse</span>{" "}
              </p>
              <p className="ant-upload-hint">Support jpeg,pdf and doc files</p>
            </div>
            <p className="ant-upload-drag-icon">
              <DocumentUpload />
            </p>
          </Dragger>
        </Form.Item>

        <div className="flex items-center justify-end gap-[20px]">
          <Button
            className="Leave_request_Canclebtn"
            label="Cancel"
            onClick={() => {
              setIsAddModalOpen(false);
              form.resetFields();
              setFormVal({
                type: "",
                durationType: "FULL_DAY",
                dateFrom: "",
                dateTo: "",
                days: "",
                timeFrom: "",
                timeTo: "",
                hours: "",
                reason: "",
                media: "",
              });
              setRequestLeave("");
            }}
            type="primary"
            htmlType="button"
          />

          <Button
            type="primary"
            label="Submit"
            htmlType="submit"
            loading={loading}
            className="Leave_request_SubmitBtn"
          />
        </div>
      </Form>
    </Modal>
  );
};
