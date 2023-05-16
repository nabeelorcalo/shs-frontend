import { useState } from "react";
import { Button, Form, Modal, Radio, RadioChangeEvent, TimePicker } from "antd";
import { ArrowDownDark, CloseCircleIcon, UserAvatar } from "../../assets/images";
import { CommonDatePicker, SearchBar } from "../../components";
import DropDownNew from "../../components/Dropdown/DropDownNew";
import "./style.scss";
import dayjs from "dayjs";

const RequestDocModel = (props: any) => {
  const { open, setOpen, handleReject } = props;
  const [user, setUser] = useState({ userName: "Select" });
  const [isOpenDate, setIsOpenDate] = useState(false);
  const [dateTimeVal, setDateTimeVal] = useState("");

  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const [form] = Form.useForm();

  const onFinish = (value: any) => {
    value.currentDate = dayjs(value?.currentDate).format("YYYY-MM-DD")
    value.currentDate = dayjs(value?.currentDate).format("YYYY-MM-DD")
    console.log(value, "form value");

    // message.success('Submit success!');
  };

  const onFinishFailed = () => {
    // message.error('Submit failed!');
  };
  const userData = [
    {
      userImg: UserAvatar,
      userName: "john doe",
    },
    {
      userImg: UserAvatar,
      userName: "mina marino",
    },
    {
      userImg: UserAvatar,
      userName: "clark",
    },
    {
      userImg: UserAvatar,
      userName: "sarah joe",
    },
  ];
  return (
    <div className="Modal">
      <Modal
        closeIcon={<img src={CloseCircleIcon} />}
        title="Schedule Interview"
        open={open}
        onCancel={() => setOpen(false)}
        footer={false}
      >
        <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
          <div className="title">
            <p>Date</p>
          </div>
          <Form.Item name="currentDate" rules={[{ required: true }]}>
            <CommonDatePicker
              open={isOpenDate}
              name={"currentDate"}
              setOpen={setIsOpenDate}
              setValue={setDateTimeVal}
            />
          </Form.Item>
          <div className="asignee-wrapper mt-7">
            <div className="heading mb-2">
              <p>Attendees</p>
            </div>
            <Form.Item name="attendees" rules={[{ required: false }]}>
              <DropDownNew
                items={[
                  { label: <SearchBar handleChange={() => {}} />, key: "search" },
                  {
                    label: (
                      <div>
                        {userData.map((users: any) => (
                          <div className="flex items-center gap-3 mb-[20px]" onClick={() => setUser(users)}>
                            <img src={users.userImg} className="h-[24px] w-[24px] rounded-full object-cover" />
                            <p>{users.userName}</p>
                          </div>
                        ))}
                      </div>
                    ),
                    key: "users",
                  },
                ]}
              >
                <div className="drop-down-with-imgs flex items-center gap-3">
                  <div className="flex items-center gap-3 mr-[40px]">
                    <p>{user.userName}</p>
                  </div>
                  <ArrowDownDark />
                </div>
              </DropDownNew>
            </Form.Item>

            <div className="time-pick-wrapper flex flex-wrap justify-between mt-5">
              <div className="time-from">
                <div className="heading mt-2 mb-3">Time From</div>
                <Form.Item name="timeFrom" rules={[{ required: true }]}>
                  <TimePicker className="time-p" />
                </Form.Item>
              </div>
              <div className="time-to">
                <div className="heading mt-2 mb-3">Time To</div>
                <Form.Item name="timeTo" rules={[{ required: true }]}>
                  <TimePicker className="time-p" />
                </Form.Item>
              </div>
            </div>

            <div className="location-wrapper">
              <p className="heading mb-2 ">Location</p>
              <Form.Item name="location" rules={[{ required: true }]}>
                <Radio.Group onChange={onChange} value={value}>
                  <Radio value={"virtual"}>Virtual</Radio>
                  <Radio value={"onSite"}>On Site</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <label className="title" htmlFor="text-area">
              <p>Description (optional)</p>
            </label>
            <Form.Item name="description">
              <textarea className="input" name="description" placeholder="Describe your problem" id="text-area" />
            </Form.Item>
          </div>
          <div className="flex mt-3 justify-end gap-4">
            <Button onClick={() => setOpen(false)} className="reqCancelBtn">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="reqSubmitBtn">
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default RequestDocModel;
