import React, { useState } from 'react'
import { Select, Button, Form } from "antd";
import { Input } from "antd";
import { ArrowDownDark, UserAvatar } from '../../../assets/images';
import DragAndDropWide from '../../../components/DragAndDrop';
import { DropDown } from '../../../components';
import DropDownNew from '../../../components/Dropdown/DropDownNew';
import './style.scss'

const { TextArea } = Input;
const BlowWhistleForm = (props: any) => {
  const grievanceType = ["Work", "Personal", "Discipline", "Other"]
  const detailsData = [
    {
      userImg: UserAvatar,
      userName: 'john doe'
    },
    {
      userImg: UserAvatar,
      userName: 'mina marino'
    },
    {
      userImg: UserAvatar,
      userName: 'clark'
    },
    {
      userImg: UserAvatar,
      userName: 'sarah joe'
    },
  ]

  const [selectValue, setSelectValue] = useState(
    {
      userImg: '',
      userName: 'Select',
      grievanceType: "Select"
    }
  );
  const { setState } = props
  const [form] = Form.useForm();
  const handleSubmit = () => {
    const values = form.getFieldsValue();
  };

  return (
    <div className='blow-Whistle-Form'>
      <Form layout="vertical" form={form}>
        <Form.Item name="grievanceType" label="Grievance Type">
          <DropDown
            name={selectValue.grievanceType}
            value={selectValue.grievanceType}
            options={grievanceType.map((item: any) => { return item })}
            setValue={(e: string) => setSelectValue({ ...selectValue, grievanceType: e })}
          />
        </Form.Item>
        <Form.Item
          name="subject"
          label="Subject"
        >
          <Input placeholder="Enter subject" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
        >
          <TextArea rows={6} placeholder="Describe your problem" maxLength={6}
            id="description"
            name="description"
            size="small"
            defaultValue=""
          />
        </Form.Item>
        <Form.Item name="mySelect" label="Escalate To">
          <div className='asignee-wrap w-[100%]'>
            <DropDownNew
              placement={'bottomRight'}
              items={[
                {
                  label: <div>{detailsData.map((item: any) => (
                    <div className="flex items-center gap-3 mb-[20px]"
                      onClick={() => setSelectValue({ ...selectValue, userName: item.userName, userImg: item.userImg })}
                    >
                      <img src={item.userImg}
                        className='h-[24px] w-[24px] rounded-full object-cover'
                      />
                      <p>{item.userName}</p>
                    </div>))}
                  </div>,
                  key: 'users'
                }]}>
              <div className="drop-down-with-imgs flex items-center gap-3">
                <div className="flex items-center gap-3 mr-[40px]">
                  {selectValue.userImg != '' && <img src={selectValue.userImg} />}
                  <p>{selectValue.userName}</p>
                </div>
                <ArrowDownDark />
              </div>
            </DropDownNew>
          </div>
        </Form.Item>
        <Form.Item name="mySelect" label="Attachment (Option)">
          <DragAndDropWide />
        </Form.Item>
        <div className="blow-whistle-footer flex justify-end mt-4 gap-2">
          <Button key="Cancel" className="footer-cancel-btn " onClick={() => { setState(false) }}>
            Cancel
          </Button>
          <Button key="submit" className="footer-submit-btn" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default BlowWhistleForm