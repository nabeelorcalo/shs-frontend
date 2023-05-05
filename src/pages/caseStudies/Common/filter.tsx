import React, { useState } from 'react'
import { Button, Form } from "antd";
import { CommonDatePicker, DropDown } from '../../../components';
import './style.scss'

const Filters = ({ setShowDrawer }: any) => {
  const department = ["Design", "Research", "Management", "Development", "Business"]
  const status = ["Pending", "Approved", "Rejected"]
  const manager = ["Mino Marino", "David Miller", "Amila Clark"]
  const [form] = Form.useForm();
  const [openDataPicker, setOpenDataPicker] = useState(false);
  const [filterValue, setFilterValue] = useState({ manager: "Select", timeFrame: "Select", status: "Select", department: "Select" });

  const onFinish = (values: any) => {
    setShowDrawer(false)
  }
  const ResetHandler = () => {
    setFilterValue({ manager: "Select", timeFrame: "Select", status: "Select", department: "Select" });
  }

  return (
    <div className='casestudies-filter_main_wrapper'>
      <Form layout="vertical"
        form={form}
        onFinish={onFinish}>
        <Form.Item name="manager" label="Manager">
          <DropDown
            name={filterValue.manager}
            value={filterValue.manager}
            options={manager.map((item: any) => { return item })}
            setValue={(e: string) => setFilterValue({ ...filterValue, manager: e })}
          />
        </Form.Item>
        <Form.Item
          name="department"
          label="Department"
        >
          <DropDown
            name={filterValue.department}
            value={filterValue.department}
            options={department.map((item: any) => { return item })}
            setValue={(e: string) => setFilterValue({ ...filterValue, department: e })}
          />
        </Form.Item>
        <Form.Item label="Date">
          <CommonDatePicker
            name="Date Picker"
            onBtnClick={() => { }}
            open={openDataPicker}
            setOpen={setOpenDataPicker}
            setValue={function noRefCheck() { }}
          />
        </Form.Item>
        <Form.Item name="status" label="Status">
          <DropDown
            name={filterValue.status}
            value={filterValue.status}
            options={status.map((item: any) => { return item })}
            setValue={(e: string) => setFilterValue({ ...filterValue, status: e })}
          />
        </Form.Item>
        <div className="filter-footer flex justify-end mt-4 gap-2">
          <Button key="Cancel" className="footer-cancel-btn " onClick={ResetHandler}>
            Reset
          </Button>
          <Button key="submit" className="footer-submit-btn" htmlType="submit">
            Apply
          </Button>
        </div>
      </Form>
    </div>

  )
}

export default Filters