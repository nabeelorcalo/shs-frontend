import { Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { ArrowDownDark, LeaveProfileImg } from '../../../assets/images';
import { Button, CommonDatePicker, DropDown } from '../../../components'
import DropDownNew from '../../../components/Dropdown/DropDownNew';
import { useRecoilState, useRecoilValue } from 'recoil';
import { filterData, remarkedByData } from '../../../store';
import UserSelector from '../../../components/UserSelector';
import dayjs from 'dayjs';
import useCustomHook from '../actionHandler';

const SelfAssesmentFilterForm = (props: any) => {
  const remarkedData: any = useRecoilValue(remarkedByData);
  const [form] = Form.useForm();
  const actions = useCustomHook();
  let itemArray: any = [];
  if (remarkedData.length !== 0) {
    for(const remark of remarkedData) {
      const item =  {
        key: remark?.remarked?.id,
        value: remark?.remarked?.id,
        label: `${remark?.remarked?.firstName} ${remark?.remarked?.lastName}`,
        // avatar: <LeaveProfileImg/>
      };
      if(itemArray.length !== remarkedData.length) itemArray.push(item);
    }
  }

  const { onFinish, onFinishFailed, handleChange, HandleCancel, Handlesubmit } = props;
  const [filterValu, setFilterValue] = useState({ remarkedBy: "", month: "Select", status: "Select" });
  const [filter, setFilter] = useRecoilState(filterData);
  const [openMonth, setOpenMonth] = useState(false)

  useEffect(()=>{
    console.log(filterValu);
  }, [])

  const getFilters = async () => {
    const values = await form.validateFields();
    if(values.month) {
      values.month = dayjs(values?.month).toISOString().split('T')[0];
    }
    const data = {
      status: filterValu.status !== 'Select' ? filterValu?.status.toLowerCase() : '',
      remarkedBy: values?.remarkedBy || '',
      month: values?.month || '',
    }
    setFilter(data);
    actions.getSelfAssessment();
    console.log(data);
  };


  return (
    <div className='filter_form_main'>
      <div className="data_container">
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={getFilters}
        >
          <Form.Item
            label="Remarked By"
            name="remarkedBy"
          >
            <UserSelector
                placeholder="Select"
                value={filterValu.remarkedBy}
                options={itemArray}
              />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
          >
            <DropDown
              value='Select'
              name={filterValu.status}
              options={['Draft ', 'Submitted', 'Approved', 'Rejected']}
              setValue={(e: string) => setFilterValue({ ...filterValu, status: e })}
            />
          </Form.Item>
          <Form.Item
            label="Month"
            name="month"
          >
            <CommonDatePicker
              name="Date Picker"
              open={openMonth}
              setOpen={setOpenMonth}
              picker='month'
            />
          </Form.Item>
          <Form.Item >
            <div className='flex items-center justify-end filter_btn_wrapper'>
              <Button
                label="Reset"
                htmlType="button"
                onClick={()=>{form.resetFields(); setFilter({})}}
                shape="default"
                type="default"
                className="reset_btn flex items-center justify-center mr-5"
              />
              <Button
                label="Apply"
                htmlType="submit"
                shape="default"
                type="default"

                className="apply_btn flex items-center justify-center"
              />
            </div>
          </Form.Item>

        </Form>
      </div>

    </div>
  )
}

export default SelfAssesmentFilterForm