import React, { useState } from 'react'
import { Button, Form } from "antd";
import { DropDown } from '../../../components';
import './style.scss'

const Filters: React.FC = (props: any) => {
  const [form] = Form.useForm();
  const timeFrame = ['This Week ', 'Last Week ', 'This Month', 'Last Month', 'range picker']
  const type = ["New", "In Progress", "Re-Open", "Resolved"]
  const status = ["Work", "Personal", "Discipline", "Other"]
  const escalatedBy = ["Mino Marino", "David Miller", "Amila Clark"]
  const [filterValue, setFilterValue] = useState({ type: "Select", timeFrame: "Select", status: "Select", escalatedBy: "Select" });

  const handleSubmit = () => {
    const values = form.getFieldsValue();
  }
  const ResetHandler = () => {
    setFilterValue({ type: "Select", timeFrame: "Select", status: "Select", escalatedBy: "Select" });
  }
  return (
    <div className='filter_main_wrapper'>
      <Form layout="vertical" form={form}>
        <Form.Item name="escalatedBy" label="Escalated By">
          <DropDown
            name={filterValue.escalatedBy}
            value={filterValue.escalatedBy}
            options={escalatedBy.map((item: any) => { return item })}
            setValue={(e: string) => setFilterValue({ ...filterValue, escalatedBy: e })}
          />
        </Form.Item>
        <Form.Item name="timeFrame" label="Time Frame" >
          <DropDown
            name={filterValue.timeFrame}
            value={filterValue.timeFrame}
            options={timeFrame.map((item: any) => { return item })}
            requireRangePicker
            placement='bottomLeft'
            showDatePickerOnVal={'range picker'}
            setValue={(e: string) => setFilterValue({ ...filterValue, timeFrame: e })}
          />
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