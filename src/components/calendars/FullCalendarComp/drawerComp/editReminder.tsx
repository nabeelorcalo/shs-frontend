import { Button, Form, Input } from "antd";
import React, { useState } from "react";
// import { Input } from "../../../Input/input";
import { calendarMockData } from "../mockData";
import { CommonDatePicker } from "../../CommonDatePicker/CommonDatePicker";
import { TextArea } from "../../../TextArea";
import { calendarListState } from "../../../../store";
import { useRecoilState } from "recoil";
import dayjs from "dayjs";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../config/validationMessages";
import { TimePickerFormat } from "../../../../components";

const EditReminder = (props: any) => {
  const { eventId, onClose, updateReminder, getData } = props;
  const [listCalendar, setListCalendar] = useRecoilState(calendarListState);
  const [openDateTime, setOpenDateTime] = useState({ date: false, time: false });
  const [vals, setVals] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
  });
  const [form] = Form.useForm();
  const findReminder: any = listCalendar.find(
    (event: any) => event.id === parseInt(eventId) && event.category === "reminder"
  );
  if (findReminder) {
    form.setFields([
      {
        name: "title",
        value: findReminder?.title,
      },
      {
        name: "dateFrom",
        value: dayjs(findReminder?.dateFrom),
      },
      {
        name: "time",
        value: findReminder?.time,
      },
      {
        name: "description",
        value: findReminder?.description,
      },
    ]);
  }

  const handleSubmitForm = (values: any) => {
    let time: any = null;
    let dateFrom: any = null;
    let changedDate: any = vals.date ? dayjs(vals.date) : dayjs(values.dateFrom);
    if (vals.time)
      time = dayjs(vals.time, "hh:mm").date(changedDate.date()).month(changedDate.month()).year(changedDate.year());
    if (vals.date) dateFrom = dayjs(vals.date).format("YYYY-MM-DD");
    const payload = {
      ...values,
      time: time ?? findReminder?.time,
      dateFrom: changedDate?.format("YYYY-MM-DD"),
    };
    updateReminder(payload, findReminder?.id, () => {
      onClose(false);
      getData();
    });
  };
  return (
    <div className="edit-reminder-wrapper">
      <Form layout="vertical" form={form} onFinish={handleSubmitForm} validateMessages={DEFAULT_VALIDATIONS_MESSAGES}>
        <Form.Item name="title" rules={[{ required: true }]} label="Event Title">
          <Input
            type="text"
            // handleChange={(e: any) => {
            //   setVals({ ...vals, title: e.target.value });
            // }}
          />
        </Form.Item>
        <Form.Item name="dateFrom" rules={[{ required: true }]} label="Date">
          <CommonDatePicker
            open={openDateTime.date}
            setValue={(val: string) => {
              setVals({ ...vals, date: val });
            }}
            setOpen={() => setOpenDateTime({ date: !openDateTime.date, time: false })}
          />
        </Form.Item>
        <Form.Item name="time" rules={[{ required: true }]} label="Time">
          <TimePickerFormat
            open={openDateTime.time}
            setValue={(val: string) => {
              setVals({ ...vals, time: val });
              //   form.setFieldValue("time", dayjs(val, "hh:mm"));
            }}
            setOpen={() => setOpenDateTime({ date: false, time: !openDateTime.time })}
            optionalTime={dayjs(findReminder?.time)}
          />
        </Form.Item>

        <Form.Item name="description" rules={[{ required: false }]} label="Description">
          <TextArea
            className="description"
            // value={findReminder?.description}
            // onChange={(e: any) => setVals({ ...vals, description: e.target.value })}
            rows={4}
          />
        </Form.Item>

        <div className="flex justify-end gap-3">
          <Button onClick={() => onClose(false)} className="outlined-btn">
            Cancel
          </Button>
          <Button htmlType="submit" className="primary-btn">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditReminder;
