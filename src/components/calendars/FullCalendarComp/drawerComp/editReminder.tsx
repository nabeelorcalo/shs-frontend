import { Button, Form, Input, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
// import { Input } from "../../../Input/input";
import { calendarMockData } from "../mockData";
import { CommonDatePicker } from "../../CommonDatePicker/CommonDatePicker";
import { TextArea } from "../../../TextArea";
import { calendarListState } from "../../../../store";
import { useRecoilState } from "recoil";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../config/validationMessages";
import { ButtonThemePrimary, ButtonThemeSecondary, TimePickerFormat } from "../../../../components";
import { IconCloseModal, IconDatePicker } from "../../../../assets/images";
import { dateValidator } from "../../../../helpers/dateTimeValidator";

const EditReminder = (props: any) => {
  dayjs.extend(utc);
  const { eventId, onClose, updateReminder, getData } = props;
  const [listCalendar, setListCalendar] = useRecoilState(calendarListState);
  const [openDateTime, setOpenDateTime] = useState({ date: false, time: false });
  const [vals, setVals] = useState({
    title: "",
    date: "",
    dateTo: "",
    time: "",
    description: "",
  });
  const [form] = Form.useForm();
  const findReminder: any = listCalendar.find((event: any) => event.taskId === parseInt(eventId) && event.category === "reminder");
  useEffect(() => {
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
          name: "dateTo",
          value: dayjs(findReminder?.dateTo),
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
  }, []);

  const handleSubmitForm = (values: any) => {
    let time: any = null;
    let dateFrom: any = null;
    const utcOffsetInMinutes = new Date().getTimezoneOffset();
    let changedDate: any = vals.date ? dayjs(vals.date) : dayjs(values.dateFrom);
    if (vals?.time) time = dayjs(vals?.time, "HH:mm").date(changedDate.date()).month(changedDate.month()).year(changedDate.year());
    else {
      const utcTime = dayjs.utc(values.time).utcOffset(-utcOffsetInMinutes).format("HH:mm");
      time = dayjs(utcTime, "HH:mm").date(changedDate.date()).month(changedDate.month()).year(changedDate.year());
      // time = dayjs(changedDate).utc().hour(values?.time.slice(11, 13)).minute(values?.time?.slice(14, 16));
    }

    const payload = {
      ...values,
      time: time ?? findReminder?.time,
      dateFrom: changedDate?.format("YYYY-MM-DD"),
      dateTo: dayjs(vals?.dateTo || values?.dateTo).format("YYYY-MM-DD"),
    };

    updateReminder(payload, findReminder?.taskId, () => {
      onClose(false);
      getData();
    });
  };
  const handleDisableDate = (current: any) => {
    return current.isBefore(dayjs().startOf("day"));
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
        <div className="flex justify-between">
          <Form.Item name="dateFrom" rules={[{ required: true }]} label="Date From">
            <DatePicker
              // open={openDateTime.date}
              // setValue={(val: string) => {
              //   // setVals({ ...vals, date: val });
              //   form.setFieldValue("dateFrom", val);
              // }}
              // setOpen={() => setOpenDateTime({ date: !openDateTime.date, time: false })}
              // onChange={() => {}}
              value={undefined}
              suffixIcon={<IconDatePicker />}
              clearIcon={<IconCloseModal />}
              disabledDate={handleDisableDate}
            />
          </Form.Item>
          <Form.Item
            name="dateTo"
            rules={[
              { required: true },
              () => ({
                validator(_, value: any) {
                  const startDate = form.getFieldValue("dateFrom");
                  return dateValidator(startDate, value);
                },
              }),
            ]}
            label="Date To"
          >
            <DatePicker
              name="dateTo"
              // onChange={(date: any) => setVals({ ...vals, dateTo: date })}
              value={undefined}
              suffixIcon={<IconDatePicker />}
              clearIcon={<IconCloseModal />}
              disabledDate={handleDisableDate}
            />
          </Form.Item>
        </div>

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
          <ButtonThemeSecondary onClick={() => onClose(false)} className="outlined-btn">
            Cancel
          </ButtonThemeSecondary>
          <ButtonThemePrimary htmlType="submit" className="primary-btn">
            Submit
          </ButtonThemePrimary>
        </div>
      </Form>
    </div>
  );
};

export default EditReminder;
