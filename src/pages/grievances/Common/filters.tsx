import React, { useState } from 'react'
import { Select, Button, Form } from "antd";
import { GrievancesAvater, IconAngleDown } from '../../../assets/images';
import './style.scss'
import { DropDown } from '../../../components';
const { Option } = Select;

const Filters: React.FC = (props: any) => {
  const [form] = Form.useForm();
  const [value, setValue] = useState();
  const [escalatedValue, setSscalatedValue] = useState("");

  let options = [
    { value: 'jessia', src: <><GrievancesAvater className='w-[48px] px-2' />  <span>Jessica Alba</span></> },
    { value: 'jean ella', src: <><GrievancesAvater className='w-[48px] px-2' />  <span>jean ella</span></> },
    { value: 'Mino Marina', src: <><GrievancesAvater className='w-[48px] px-2' />  <span>Mino Marina</span></> },
  ];
  const typeSelectValue = ["New", "In Progress", "Re-Open", "Resolved",]
  const statusSelectValue = ["Work", "Personal", "Discipline" , "Other"]


  const renderOption = (option: any) => {
    return (
      <Option key={option.value} value={option.value} className="border-none">
        {option.src}
      </Option>
    );
  }
  function handleChange(value: any) {
   

    setSscalatedValue(value)
  }
  const handleSubmit = () => {
    const values = form.getFieldsValue();
  }
  const ResetHandler = () => {
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
          {typeSelectValue.map((item) => <Select.Option value={item}>{item}</Select.Option>)}

          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
        >
          <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
          {statusSelectValue.map((item) => <Select.Option value={item}>{item}</Select.Option>)}

          </Select>
        </Form.Item>

        <div className="whistle-footer flex justify-end mt-4 gap-2">
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