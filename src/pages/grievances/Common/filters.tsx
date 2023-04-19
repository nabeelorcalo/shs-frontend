import React, { useState } from 'react'
import { Select, Button, Form } from "antd";
import { GrievancesAvater, IconAngleDown } from '../../../assets/images';
import './style.scss'
import { DropDown } from '../../../components';
import dayjs from "dayjs";
const { Option } = Select;

const Filters: React.FC = (props: any) => {
  const [form] = Form.useForm();
  const [value, setValue] = useState();
  const [escalatedValue, setSscalatedValue] = useState("");

  const options = [
    { value: 'jessia', src: <><GrievancesAvater className='w-[48px] px-2' />  <span>Jessica Alba</span></> },
    { value: 'jean ella', src: <><GrievancesAvater className='w-[48px] px-2' />  <span>jean ella</span></> },
    { value: 'Mino Marina', src: <><GrievancesAvater className='w-[48px] px-2' />  <span>Mino Marina</span></> },
  ];
  const timeFrame = ['This Week ', 'Last Week ', 'This Month', 'Last Month', 'date Range']
  const type = ["New", "In Progress", "Re-Open", "Resolved"]
  const status = ["Work", "Personal", "Discipline", "Other"]
  const renderOption = (option: any) => {
    return (
      <Option key={option.value} value={option.value} className="border-none">
        {option.src}
      </Option>
    );
  }
  const [filterValue, setFilterValue] = useState({ type: "Select", timeFrame: "Select", status: "Select" });
  function handleChange(value: any) {
    setSscalatedValue(value)
  }
  const handleSubmit = () => {
    const values = form.getFieldsValue();
  }
  const ResetHandler = () => {
    setFilterValue({ type: "Select", timeFrame: "Select", status: "Select" });
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
          <DropDown
            name={filterValue.timeFrame}
            value={filterValue.timeFrame}
            options={timeFrame.map((item: any) => { return item })}
            setValue={(e: string) => setFilterValue({ ...filterValue, timeFrame: e })}
            showDatePickerOnVal={'date Range'}
            requireDatePicker
            placement='bottomLeft' />
        </Form.Item>
        <Form.Item
          name="type"
          label="Type"
        >
          <DropDown
            name={filterValue.type}
            value={filterValue.type}
            options={type.map((item: any) => { return item })}
            setValue={(e: string) => setFilterValue({ ...filterValue, type: e })}
          />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
        >
          <DropDown
            name={filterValue.status}
            value={filterValue.status}
            options={status.map((item: any) => { return item })}
            setValue={(e: string) => setFilterValue({ ...filterValue, status: e })}
          />
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