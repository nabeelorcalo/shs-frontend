import { Form } from 'antd'
import React, { useState } from 'react'
import { ArrowDownDark, LeaveProfileImg } from '../../../assets/images';
import { Button, CommonDatePicker, DropDown } from '../../../components'
import DropDownNew from '../../../components/Dropdown/DropDownNew';

const SelfAssesmentFilterForm = (props: any) => {
  const itemArray: any = [
    {
      key: '01',
      label: <div className='flex items-center '>
        <div className=' w-[24px] h-[24px] rounded-full mr-2'>
          <img src={LeaveProfileImg} className="rounded-full object-cover" />
        </div>
        <p>Noman jutt</p>
      </div>
    },
    {
      key: '02',
      label: <div className='flex items-center '>
        <div className=' w-[24px] h-[24px] rounded-full mr-2'>
          <img src={LeaveProfileImg} className="rounded-full object-cover" />
        </div>
        <p>Arsalan jutt</p>
      </div>
    },
    {
      key: '03',
      label: <div className='flex items-center '>
        <div className=' w-[24px] h-[24px] rounded-full mr-2'>
          <img src={LeaveProfileImg} className="rounded-full object-cover" />
        </div>
        <p>Abdullaha jutt</p>
      </div>
    },
  ]
  const { onFinish, onFinishFailed, handleChange, HandleCancel, Handlesubmit } = props;
  const [filterValu, setFilterValue] = useState({ remarkedBy: "Select", month: "Select", status: "Select" });

  const [openMonth, setOpenMonth] = useState(false)

  return (
    <div className='filter_form_main'>
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
            label="Remarked By"
            name="remarkedBy"
          >
            <DropDownNew
              items={itemArray}
            >
              <div className='user_select rounded-lg py-3 text-[#a0a3bd] px-5 flex items-center justify-between  ' >
                <span>Select</span> <ArrowDownDark />
              </div>
            </DropDownNew>
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
          >
            <DropDown
              name={filterValu.status}
              value={filterValu.status}
              options={['Draft ', 'Submitted', 'Approved', 'Rejected']}
              setValue={(e: string) => setFilterValue({ ...filterValu, status: e })}
            />
          </Form.Item>
          <Form.Item
            label="Month"
            name="month"
          >
            <CommonDatePicker open={openMonth} setOpen={setOpenMonth} setValue={(e: string) => setFilterValue({ ...filterValu, month: e })} picker='month' />
          </Form.Item>
        </Form>
      </div>
      <div className='flex items-center justify-end filter_btn_wrapper'>
        <Button
          label="Reset"
          htmlType="button"
          onClick={HandleCancel}
          shape="default"
          type="default"
          className="reset_btn flex items-center justify-center mr-5"
        />
        <Button
          label="Apply"
          htmlType="submit"
          onClick={Handlesubmit}
          shape="default"
          type="default"

          className="apply_btn flex items-center justify-center"
        />
      </div>
    </div>
  )
}

export default SelfAssesmentFilterForm