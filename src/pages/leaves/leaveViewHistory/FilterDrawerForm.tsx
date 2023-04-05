import React, { useState } from 'react'
import { Form, Select, } from "antd";
import { Button, DropDown } from '../../../components';
const FilterDrawerForm = (props: any) => {
  const { onFinish, onFinishFailed, handleChange, HandleCancel, Handlesubmit } = props;

  const [filterValu, setFilterValue] = useState({ leaveType: "Select", timeFrame: "Select", status: "Select" });
  // console.log(value);

  return (
    <div>
      <div className="data_container">
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Leave Type"
            name="Leave Type"
          >
            <DropDown
              name={filterValu.leaveType}
              value={filterValu.leaveType}
              options={['Pending ', 'Declined', 'Approved']}
              setValue={(e: string) => setFilterValue({ ...filterValu, leaveType: e })}
            />
            {/* <Select
              defaultValue="sick"
              onChange={handleChange}
              size="large"
              options={[
                { value: 'sick', label: 'Sick' },
                { value: 'casual', label: 'Casual' },
                { value: 'work from home', label: 'Work From Home' },
                { value: 'medicale', label: 'Medicale' },
              ]}
            /> */}
          </Form.Item>

          <Form.Item
            label="Time Frame"
            name="time frame"
          >
            <DropDown
              name={filterValu.timeFrame}
              value={filterValu.timeFrame}
              options={['This Week ', 'Last Week ', 'This Month', 'Last Month', 'date Range']}
              setValue={(e: string) => setFilterValue({ ...filterValu, timeFrame: e })}
              showDatePickerOnVal={'date Range'}
              requireDatePicker
              placement='bottomLeft' />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
          >
            <DropDown
              name={filterValu.status}
              value={filterValu.status}
              options={['Pending ', 'Declined', 'Approved']}
              setValue={(e: string) => setFilterValue({ ...filterValu, status: e })}
            />
          </Form.Item>
        </Form>

      </div>
      <div className='flex items-center justify-end form_button_wrapper mt-5'>
        <Button
          label="Reset"
          htmlType="button"
          onClick={() => { alert("hello Reset") }}
          className="Reset_btn flex items-center justify-center   mr-5"
        />
        <Button
          label="Apply"
          htmlType="submit"
          onClick={() => { alert("hello Applay") }}
          className="Apply_btn flex items-center justify-center "
        />
      </div>
    </div>
  )
}

export default FilterDrawerForm