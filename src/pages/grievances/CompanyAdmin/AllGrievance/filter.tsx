import React, { useState } from 'react'
import { Select, Button, Form } from "antd";
import { GrievancesAvater, IconAngleDown } from '../../../../assets/images';
import { DropDown } from '../../../../components';
const { Option } = Select;
import './style.scss'

const Filters: React.FC = (props: any) => {
  const [form] = Form.useForm();
  const [value, setValue] = useState();
  const [escalatedValue, setSscalatedValue] = useState("");

  let options = [
    { value: 'jessia', src: <><GrievancesAvater className='w-[48px] px-2' />  <span>Jessica Alba</span></> },
    { value: 'jean ella', src: <><GrievancesAvater className='w-[48px] px-2' />  <span>jean ella</span></> },
    { value: 'Mino Marina', src: <><GrievancesAvater className='w-[48px] px-2' />  <span>Mino Marina</span></> },
  ];

  const renderOption = (option: any) => {
    return (
      <Option key={option.value} value={option.value} className="border-none">
        {option.src}
      </Option>
    );
  }
  function handleChange(value: any) {
    console.log(`selected ${value}`);
    setSscalatedValue(value)
  }
  const handleSubmit = () => {
    const values = form.getFieldsValue();
    console.log("values", values)
  }
  const ResetHandler = () => {
    console.log("Dddddd")
    options = []
  }

  return (
    <div className='filter_main_wrapper'>
      <Form layout="vertical" form={form}>
        <Form.Item name="mySelect" label="Escalated By">
          <Select onChange={handleChange} placeholder="Select" suffixIcon={<IconAngleDown />}   >
            {options.map(renderOption)}
          </Select>
        </Form.Item>
        <Form.Item name="timeFrame" label="Time Frame" style={{ background: "white" }}>
          <DropDown name='Select' value={value}
            options={['This Week ', 'Last Week ', 'This Month', 'Last Month', 'date Range']}
            setValue={() => setValue(value)} showDatePickerOnVal={'date Range'}
            requireDatePicker placement='bottomLeft' />
        </Form.Item>
        <Form.Item
          name="type"
          label="Type"
        >
          <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
            <Select.Option value="New">New</Select.Option>
            <Select.Option value="In Progress">In Progress</Select.Option>
            <Select.Option value="Re-Open">Re-Open</Select.Option>
            <Select.Option value="Resolved">Resolved</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
        >
          <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
            <Select.Option value="Work">Work</Select.Option>
            <Select.Option value="Personal">Personal</Select.Option>
            <Select.Option value="Discipline">Discipline</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
        </Form.Item>
        <div className="company-admin-blow-whistle-footer flex justify-end mt-4 gap-2">
          <Button key="Cancel" className="footer-cancel-btn " onClick={ResetHandler}>
            Reset
          </Button>
          <Button key="submit" className="footer-submit-btn" onClick={handleSubmit}>
            Apply
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default Filters