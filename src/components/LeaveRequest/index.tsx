import { useState } from 'react'
import { CloseCircleFilled } from '@ant-design/icons'
import { ArrowDownDark, DownloadIcon } from '../../assets/images';
import DragAndDropUpload from '../DragAndDrop';
import { Button, Modal, Select, Radio, DatePicker, Input } from 'antd'
import dayjs from 'dayjs';
import { DropDown } from '../Dropdown/DropDown';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const dateFormat = 'YYYY/MM/DD';
const LeaveRequest = ({ title }: any) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <Button onClick={() => { setShow(!show) }}>Leave request form</Button>
      <div>
        <Modal
          title={title}
          open={show}
          onCancel={() => { setShow(!show) }}
          width={600}
          maskClosable={false}
          closeIcon={<CloseCircleFilled style={{ color: "#A3AED0", fontSize: '20px' }} />}
          footer={[
            <Button onClick={() => { setShow(!show) }} key="Cancel" style={{ border: '1px solid #4a9d77', color: '#4a9d77', padding: '0px 20px' }}>
              Cancel
            </Button>,
            <Button onClick={() => { setShow(!show) }} key="submit" style={{ backgroundColor: '#4a9d77', color: '#fff', border: '1px solid #4a9d77', padding: '0px 20px' }}>
              Submit
            </Button>,
          ]}
        >
          <div className="mt-8 flex flex-col gap-2 ">

            <p>Leave Type<span className="text-[red]">*</span></p>
            {/* <DropDown name="Select" endIcon options={['sick', 'casual', 'work from home', 'medical']} /> */}
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Select"
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label ?? '').includes(input)}
              options={[
                {
                  value: '1',
                  label: 'Sick',
                },
                {
                  value: '2',
                  label: 'Casual',
                },
                {
                  value: '3',
                  label: 'Work From Home',
                },
                {
                  value: '4',
                  label: 'Medical',
                },
              ]}
            />
            <div className="my-2">
              <Radio.Group onChange={() => { }} value={"FullDay"}>
                <Radio value={"FullDay"}>Full Day</Radio>
                <Radio value={"HalfDay"}>Half Day</Radio>

              </Radio.Group>
            </div>
            <div className="my-2 flex gap-3">
              <div className=" flex flex-col gap-2  w-1/3">
                <p>Date From<span className="text-[red]">*</span></p>
                <DatePicker onChange={() => { }} />
              </div>
              <div className=" flex flex-col gap-2  w-1/3">
                <p>Date From<span className="text-[red]">*</span></p>
                <DatePicker onChange={() => { }} />
              </div>
              <div className="flex flex-col gap-2  w-1/3">
                <p>Days</p>
                <Input
                  placeholder="enter a number "
                  maxLength={16}
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-col gap-2  my-2">
              <p>Reason<span className="text-[red]">*</span></p>
              <TextArea rows={4} placeholder="Enter reason for leave" maxLength={6} />
            </div>
            <div className="flex flex-col gap-2 my-2">
              <p>attachement</p>
              <DragAndDropUpload />
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}

export default LeaveRequest