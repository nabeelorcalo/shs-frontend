import { useEffect, useState } from 'react'
import { Form, Select } from "antd";
import { Button, DropDown } from '../../../components';
import useCustomHook from '../actionHandler';

const FilterDrawerForm = (props: any) => {
  const { filterValue, setFilterValue, onFinishFailed, HandleCancel, Handlesubmit, setOpenDrawer } = props;
  const { getLeaveHistoryList, filterValues, setFilterValues, onLeaveFormValuesChange, onFilterLeaevHistory } = useCustomHook();
  const leaveRequestOption = [
    { value: 'SICK', label: 'Sick' },
    { value: 'CASUAL', label: 'Casual' },
    { value: 'WFH', label: 'Work From Home' },
    { value: 'MEDICAL', label: 'Medical' },
  ]
  const timeFrame = [
    { value: 'THIS_WEEK ', label: 'This Week ' },
    { value: 'LAST_WEEK', label: 'Last Week' },
    { value: 'THIS_MONTH', label: 'This Month' },
    { value: 'LAST_MONTH', label: 'Last Month' },
    { value: 'DATE_RANGE', label: 'date Range' },
  ]
  const statusFilterOptions = [
    { value: 'PENDING', label: 'Pending' },
    { value: 'DECLINED', label: 'Declined' },
    { value: 'APPROVED', label: 'Approved' },
  ]

  useEffect(() => {
    getLeaveHistoryList(filterValues);
  }, [ filterValues?.type, filterValues?.timeFrame, filterValues?.status, filterValues?.startTime, filterValues?.endTime]);
  
  return (
    <div>
      <div className="data_container">
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={(values) => onFilterLeaevHistory(values, filterValue)}
          onValuesChange={(values) => onLeaveFormValuesChange(values)}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Leave Type"
            name="type"

          >
            <Select
              placeholder="Select"
              options={leaveRequestOption}
            />
          </Form.Item>
          <Form.Item
            label="Time Frame"
            name="timeFrame"
          >
            <DropDown
              name={filterValue}
              value={filterValue}
              options={['This Week ', 'Last Week ', 'This Month ', 'Last Month', 'date Range']}
              setValue={(e: string) => setFilterValue(e)}
              showDatePickerOnVal={'date Range'}
              requireRangePicker
              placement='bottomLeft' />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
          >
            <Select
              placeholder="Select"
              options={statusFilterOptions}
            />
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