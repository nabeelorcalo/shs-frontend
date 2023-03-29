import React from 'react'
import { Select, Button, Form } from "antd";
import { Input } from "antd";
import { DownOutlined } from '@ant-design/icons/lib/icons';
import SelectComp from '../../../components/Select/Select';
import { GrievancesAvater, IconAngleDown } from '../../../assets/images';
import './style.scss'
import DragAndDropWide from '../../../components/DragAndDrop';
import { NavLink } from 'react-router-dom';
const { TextArea } = Input;
const { Option } = Select;

const options = [
  { value: 'jessia', src: <><GrievancesAvater className='w-[48px] px-2' />  <span>Jessica Alba</span></> },
  { value: 'jean ella', src: <><GrievancesAvater className='w-[48px] px-2' />  <span>jean ella</span></> },
  { value: 'Mino Marina', src: <><GrievancesAvater className='w-[48px] px-2' />  <span>Mino Marina</span></> },
];

function renderOption(option: any) {
  return (
    <Option key={option.value} value={option.value} className="border-none">
      {option.src}
    </Option>
  );
}
function handleChange(value: any) {
  console.log(`selected ${value}`);
}

const BlowWhistleForm = (props: any) => {
  const { setState } = props
  const [form] = Form.useForm();
  const handleSubmit = () => {
    const values = form.getFieldsValue();
  };
  return (
    <Form layout="vertical" form={form}>
      <Form.Item name="grievanceType" label="Accomodation Type">
        <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
          <Select.Option value="jack">jack</Select.Option>
          <Select.Option value="lucy">lucy</Select.Option>
          <Select.Option value="Yiminghe">Yiminghe</Select.Option>
        </Select>
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
        <TextArea rows={6} placeholder="Write Something..." maxLength={6}
          id="description"
          name="description"
          size="small"
          defaultValue=""
        />
      </Form.Item>
      <Form.Item name="mySelect" label="Escalate To">
        <Select onChange={handleChange} placeholder="Select"  >
          {options.map(renderOption)}
        </Select>
      </Form.Item>
      <Form.Item name="mySelect" label="Escalate To">
        <DragAndDropWide />
      </Form.Item>
      <div className="intern-blow-whistle-footer flex justify-end mt-4 gap-2">
        <Button key="Cancel" className="footer-cancel-btn " onClick={() => { setState(false) }}>
          Cancel
        </Button>
        <NavLink to="/grievances/all-grievance"><Button key="submit" className="footer-submit-btn" onClick={handleSubmit}>
          Submit
        </Button>
        </NavLink>
      </div>
    </Form>
  )
}

export default BlowWhistleForm