import { useEffect, useState } from 'react'
import { Form, Select } from "antd";
import { Button, DropDown } from '../../../components';
import useCustomHook from '../actionHandler';
import dayjs from 'dayjs';
import 'dayjs/plugin/weekday';

const FilterDrawerForm = (props: any) => {
  let startDate = '';
  let endDate = '';
  const [state, setState] = useState({
    timeFrame: "Select"
  });

  const { onFinishFailed, setOpenDrawer } = props;
  const { onLeaveFormValuesChange } = useCustomHook();

  const dateRange: any = {
    "This Week": [
      dayjs().startOf('week').format('YYYY-MM-DD'), 
      dayjs().endOf('week').format('YYYY-MM-DD')
    ],
    "Last Week": [
      dayjs().subtract(1, 'week').startOf('week').format('YYYY-MM-DD'), 
      dayjs().subtract(1, 'week').endOf('week').format('YYYY-MM-DD')
    ],
    "This Month": [
      dayjs().startOf('month').format('YYYY-MM-DD'), 
      dayjs().endOf('month').format('YYYY-MM-DD')
    ],
    "Last Month": [
      dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'), 
      dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
    ],
  }

  const leaveRequestOption = [
    { value: 'SICK', label: 'Sick' },
    { value: 'CASUAL', label: 'Casual' },
    { value: 'WFH', label: 'Work From Home' },
    { value: 'MEDICAL', label: 'Medical' },
  ]

  const timeFrameOptions = ["This Week", "Last Week", "This Month", "Last Month", "Date Range"];

  const statusFilterOptions = [
    { value: 'PENDING', label: 'Pending' },
    { value: 'DECLINED', label: 'Declined' },
    { value: 'APPROVED', label: 'Approved' },
  ]

  useEffect(() => {
    console.log("timeFreme: ", state.timeFrame);
  }, [state]);

  const handleTimeframe = (val: any) => {
    let result = dateRange[val];

    if(result){
      startDate = result[0];
      endDate = result[1];
    } else{
      let range = val.split(" , ");
      startDate = range[0]
      endDate = range[1];
    }

    setState((prevState) => ({
      ...prevState,
      timeFrame: val,
    }));
  }

  const onFinish = (e: any) => {

  }

  return (
    <div>
      <div className="data_container">
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
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
              name={state.timeFrame}
              value={state.timeFrame}
              options={timeFrameOptions}
              setValue={handleTimeframe}
              showDatePickerOnVal={'Date Range'}
              requireRangePicker placement="bottom"
            />
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