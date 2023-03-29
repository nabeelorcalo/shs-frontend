import React, { useState } from 'react'
import { Select, Button, Form } from "antd";
import { GrievancesAvater, IconAngleDown } from '../../../assets/images';
import { CommonDatePicker } from '../../../components';
import './style.scss'

const { Option } = Select;
const Filters: React.FC = (props: any) => {
  let options = [
    { value: 'jessia', src: <div className='flex'><GrievancesAvater className='w-[48px] px-2' />  <span className='mt-1'>Jessica Alba</span></div> },
    { value: 'jean ella', src: <div className='flex'><GrievancesAvater className='w-[48px] px-2' />  <span className='mt-1'>jean ella</span></div> },
    { value: 'Mino Marina', src: <div className='flex'><GrievancesAvater className='w-[48px] px-2' />  <span className='mt-1'>Mino Marina</span></div> },
  ];
  const [form] = Form.useForm();
  const [openDataPicker, setOpenDataPicker] = useState(false);

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    console.log("values", values)
  }
  const renderOption = (option: any) => {
    return (
      <Option key={option.value} value={option.value} className="border-none">
        {option.src}
      </Option>
    );
  }
  function handleChange(value: any) {
  }

  return (
    <div className='manager-casestudies-filter_main_wrapper'>
      <Form layout="vertical" form={form}>
      <Form.Item name="mySelect" label="Manager">
          <Select onChange={handleChange} placeholder="Select" suffixIcon={<IconAngleDown />}   >
            {options.map(renderOption)}
          </Select>
        </Form.Item>
        <Form.Item
          name="department"
          label="Department"
        >
          <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
            <Select.Option value="Design">Design</Select.Option>
            <Select.Option value="Research">Research</Select.Option>
            <Select.Option value="Management">Management</Select.Option>
            <Select.Option value="Development">Development</Select.Option>
            <Select.Option value="Business">Business</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item  label="Date">
          <CommonDatePicker
            name="Date Picker"
            onBtnClick={() => { }}
            open={openDataPicker}
            setOpen={setOpenDataPicker}
            setValue={function noRefCheck() { }}
          />
        </Form.Item>
        <Form.Item name="status" label="Status">
          <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
            <Select.Option value="Pending">Pending</Select.Option>
            <Select.Option value="Approved">Approved</Select.Option>
            <Select.Option value="Rejected">Rejected</Select.Option>
          </Select>
        </Form.Item>
       
        <div className="manager-filter-footer flex justify-end mt-4 gap-2">
          <Button key="Cancel" className="footer-cancel-btn " >
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