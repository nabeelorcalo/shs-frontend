import { useState } from 'react'
import { Form, Select } from "antd";
import { Button, DropDown } from '../../../components';
const FilterDrawerForm = (props: any) => {
  const { onFilterLeaevHistory, onFinishFailed, handleChange, HandleCancel, Handlesubmit, setOpenDrawer } = props;

  const [filterValu, setFilterValue] = useState({ leaveType: "Select", timeFrame: "Select", status: "Select" });
  // console.log(value);
  const leavRequestOptionDAta = [
    { value: 'SICK', label: 'Sick' },
    { value: 'CASUAL', label: 'Casual' },
    { value: 'WFH', label: 'Work From Home' },
    { value: 'MEDIAL', label: 'Medical' },
  ]
  const timeFrame = [
    { value: 'This Week ', label: 'This Week ' },
    { value: 'Last Week', label: 'Last Week' },
    { value: 'This Month', label: 'This Month' },
    { value: 'Last Month', label: 'Last Month' },
    { value: 'Date Range', label: 'date Range' },
  ]
  const statusFilterOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Declined', label: 'Declined' },
    { value: 'Approved', label: 'Approved' },
  ]
  return (
    <div>
      <div className="data_container">
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFilterLeaevHistory}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Leave Type"
            name="leaveType"

          >
            <Select
              placeholder="Select"
              options={leavRequestOptionDAta}
            />
            {/* <DropDown
              name={filterValu.leaveType}
              value={filterValu.leaveType}
              options={['All', 'Pending', 'Declined', 'Approved']}
              setValue={(e: string) => setFilterValue({ ...filterValu, leaveType: e })}
            /> */}
          </Form.Item>

          <Form.Item
            label="Time Frame"
            name="time frame"
          >
             <Select
              placeholder="Select"
              options={timeFrame}
            />
            {/* <DropDown
              name={filterValu.timeFrame}
              value={filterValu.timeFrame}
              options={['Select', 'This Week ', 'Last Week ', 'This Month', 'Last Month', 'date Range']}
              setValue={(e: string) => setFilterValue({ ...filterValu, timeFrame: e })}
              showDatePickerOnVal={'date Range'}
              requireRangePicker
              placement='bottomLeft' /> */}
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
          >
            <Select
              placeholder="Select"
              options={statusFilterOptions}
            />
            {/* <DropDown
              name={filterValu.status}
              value={filterValu.status}
              options={['All', 'Pending ', 'Declined', 'Approved']}
              setValue={(e: string) => setFilterValue({ ...filterValu, status: e })}
            /> */}
          </Form.Item>
          <Form.Item>
            <div className='flex items-center justify-end form_button_wrapper mt-5'>
              <Button
                label="Reset"
                htmlType="button"
                onClick={() => { setOpenDrawer(false) }}
                className="Reset_btn flex items-center justify-center   mr-5"
              />
              <Button
                label="Apply"
                htmlType="submit"
                // onClick={() => { setOpenDrawer(false) }}
                className="Apply_btn flex items-center justify-center "
              />
            </div>
          </Form.Item>
        </Form>

      </div>

    </div>
  )
}

export default FilterDrawerForm