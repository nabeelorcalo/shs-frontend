import { Button, Col, Form, Row } from "antd";
import { Input } from "../../../Input/input";
import React, { useState } from "react";
import { DropDown } from "../../../Dropdown/DropDown";
import { CommonDatePicker } from "../../CommonDatePicker/CommonDatePicker";
import { TextArea } from "../../../TextArea";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../config/validationMessages";
import { ButtonThemePrimary, ButtonThemeSecondary, TimePickerFormat } from "../../../../components";
import dayjs from "dayjs";
import { dateValidator } from "../../../../helpers/dateTimeValidator";

const Reminder = (props: any) => {
  const { onClose, addReminder, getData, form } = props;
  // const [form] = Form.useForm();

  const [formValues, setFormValues] = useState({
    title: "",
    reminder: "",
    recurrence: "",
    dateForm: "",
    dateTo: "",
    time: "",
  });

  const [openDate, setOpenDate] = useState({ from: false, to: false });
  const [openTime, setOpenTime] = useState(false);
  const [activeDay, setActiveDay] = useState<string[]>([]);
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const recurrencePayload: any = {
    "does not repeat": "DOES_NOT_REPEAT",
    "every weekday (mon-fri)": "EVERY_WEEK_DAY",
    daily: "DAILY",
    weekly: "WEEKLY",
  };
  const handleSubmitForm = (values: any) => {
    const payload = {
      ...values,
      recurrence: recurrencePayload[values?.recurrence],
      dateFrom: values?.dateFrom?.format("YYYY-MM-DD"),
      dateTo: values?.dateTo?.format("YYYY-MM-DD"),
      time: dayjs(values?.time, "HH:mm").year(values?.dateFrom?.year()).month(values?.dateFrom?.month()).date(values?.dateFrom?.date()),
      reminder: values?.reminder?.toUpperCase(),
      repeatDay: values?.repeatDay || [],
    };
    addReminder(payload, () => {
      onClose(false);
      form.resetFields();
      getData();
    });
  };
  const handleDisableDate = (current: any) => {
    return current.isBefore(dayjs().startOf("day"));
  };

  return (
    <div className="remindar-wrapper">
      <Form form={form} layout="vertical" onFinish={handleSubmitForm} validateMessages={DEFAULT_VALIDATIONS_MESSAGES}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input
            // label="Title"
            type="text"
            value={formValues.title}
            handleChange={(e: any) => setFormValues({ ...formValues, title: e.target.value })}
            placeholder="Title"
          />
        </Form.Item>

        <Row gutter={[20, 20]}>
          <Col xs={12}>
            <Form.Item className="reminder" label="Reminder" name="reminder" rules={[{ required: true }]}>
              {/* <label className="label block mb-[5px]">Reminder</label> */}
              <DropDown
                name="Select"
                options={["0 minutes", "5 minutes", "15 minutes", "30 minutes"]}
                value={formValues.reminder}
                setValue={(val: string) => {
                  setFormValues({ ...formValues, reminder: val });
                  form.setFieldValue("reminder", val);
                }}
              />
            </Form.Item>
          </Col>

          <Col xs={12}>
            <Form.Item className="recurrence" label="Recurrence" name="recurrence" rules={[{ required: true }]}>
              {/* <label className="label block mb-[5px]">Recurrence</label> */}
              <DropDown
                name="Select"
                options={["does not repeat", "every weekday (mon-fri)", "daily", "weekly"]}
                value={formValues.recurrence}
                setValue={(val: string) => {
                  setFormValues({ ...formValues, recurrence: val });
                  form.setFieldValue("recurrence", val);
                  if (val === "every weekday (mon-fri)") {
                    const updatedDays = ["mon", "tue", "wed", "thu", "fri"];
                    setActiveDay(updatedDays);
                    form.setFieldValue(
                      "repeatDay",
                      updatedDays.map((active) => days.indexOf(active).toString())
                    );
                  } else setActiveDay([]);
                }}
              />
            </Form.Item>
          </Col>

          <Col xs={12}>
            <Form.Item className="mt-[-25px]" label="Date From" name="dateFrom" rules={[{ required: true }]}>
              <CommonDatePicker
                className="date-from"
                // label="Date From"
                open={openDate.from}
                disabledDates={handleDisableDate}
                setOpen={() => setOpenDate({ from: !openDate.from, to: false })}
                setValue={(val: string) => {
                  setFormValues({ ...formValues, dateForm: val });
                  form.setFieldValue("dateFrom", val);
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
              className="mt-[-25px]"
              label="Date To"
              name="dateTo"
              rules={[
                { required: true, message: "" },
                () => ({
                  validator(_, value: any) {
                    const startTime = form.getFieldValue("dateFrom");
                    return dateValidator(startTime, value);
                  },
                }),
              ]}
            >
              <CommonDatePicker
                className="date-to"
                // label="Date To"
                open={openDate.to}
                disabledDates={handleDisableDate}
                setOpen={() => setOpenDate({ from: false, to: !openDate.to })}
                setValue={(val: string) => setFormValues({ ...formValues, dateTo: val })}
              />
            </Form.Item>
          </Col>

          {(formValues.recurrence === "every weekday (mon-fri)" || formValues.recurrence === "weekly") && (
            <Col xs={24} className="mt-[-25px]">
              <Form.Item name="repeatDay" rules={[{ required: true }]}>
                <div className="repeat-weekday">
                  <label className="label">Repeat Every</label>
                  <div className="flex items-center gap-3">
                    <p className="total-count rounded-[8px] flex items-center justify-center">1</p>
                    <p className="weeks">Week(s)</p>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    {days.map((day: any, index: number) => (
                      <p
                        key={day}
                        onClick={() => {
                          if (formValues.recurrence !== "every weekday (mon-fri)") {
                            const updatedActiveDays = activeDay.includes(day) ? activeDay.filter((active) => active !== day) : [...activeDay, day];
                            setActiveDay(updatedActiveDays);
                            form.setFieldValue(
                              "repeatDay",
                              updatedActiveDays.map((active) => days.indexOf(active).toString())
                            );
                          }
                        }}
                        className={`day capitalize rounded-full cursor-pointer flex items-center justify-center 
                  ${activeDay.includes(day) ? "active" : ""} ${formValues.recurrence === "every weekday (mon-fri)" ? "cursor-not-allowed" : ""}
                  `}
                      >
                        {day.substring(0, 1)}
                      </p>
                    ))}
                  </div>
                </div>
              </Form.Item>
            </Col>
          )}

          <Col xs={24} className="mt-[-25px]">
            <Form.Item label="Time" name="time" rules={[{ required: true }]}>
              <TimePickerFormat
                // label="Time"
                open={openTime}
                setOpen={() => setOpenTime(!openTime)}
                setValue={(val: string) => {
                  setFormValues({ ...formValues, time: val });
                  form.setFieldValue("time", val);
                }}
                value={formValues.time}
              />
            </Form.Item>
          </Col>
          <Col xs={24} className="mt-[-25px]">
            <Form.Item name="description" label="Description">
              {/* <label className="label">Description (Optional)</label> */}
              <TextArea rows={5} placeholder="Write Something..." />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-end gap-4">
          <ButtonThemeSecondary
            className="cancel-btn"
            onClick={() => {
              onClose(false);
              form.resetFields();
            }}
          >
            Cancel
          </ButtonThemeSecondary>
          <ButtonThemePrimary htmlType="submit" className="add-btn green-graph-tooltip-bg text-white">
            Add
          </ButtonThemePrimary>
        </div>
      </Form>
    </div>
  );
};

export default Reminder;
