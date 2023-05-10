import React, { useState } from 'react'
import { Button, Form } from "antd";
import { DropDown } from '../../../components';
import './style.scss'

const Filters: React.FC = (props: any) => {
  const company = ["Power DevSpot", "Abacus", "Orcalo Holdings", "Coding Hub"]
  const department = ["Design", "Research", "Management", "Development", "Business"]
  const reviewer = ["Mino Marino", "David Miller", "Amila Clark"]
  const [form] = Form.useForm();
  const [openDataPicker, setOpenDataPicker] = useState(false);
  const [filterValue, setFilterValue] = useState({ company: "Select", department: "Select", reviewer: "Select" });

  const handleSubmit = () => {
    const values = form.getFieldsValue();
  }

  const ResetHandler = () => {
    setFilterValue({ company: "Select", department: "Select", reviewer: "Select" });
  }

  return (
    <div className='uni-report-filter_main_wrapper'>
      <Form layout="vertical" form={form}>
        <Form.Item name="company" label="Company">
          <DropDown
            name={filterValue.company}
            value={filterValue.company}
            options={company.map((item: any) => { return item })}
            setValue={(e: string) => setFilterValue({ ...filterValue, company: e })}
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
        <Form.Item name="reviewer" label="Reviewer">
          <DropDown
            name={filterValue.reviewer}
            value={filterValue.reviewer}
            options={reviewer.map((item: any) => { return item })}
            setValue={(e: string) => setFilterValue({ ...filterValue, reviewer: e })}
          />
        </Form.Item>
        <div className="report-filter-footer flex justify-end mt-4 gap-2">
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