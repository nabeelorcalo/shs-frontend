import React from 'react'
import { Modal, Input, Button, Space } from 'antd';
import { CloseCircleFilled } from "@ant-design/icons"

const OthersItem = (props: any) => {
  return (
    <Modal
      open={props.openModal}
      centered
      footer={null}
      closeIcon={
        <CloseCircleFilled
          className="text-teriary-color text-xl"
          onClick={() => {
            props.setOpenModal(false);
          }}
        />
      }
      title={props.title}
    >
      <label className='text-[#6E7191] text-base font-normal pb-3'>{props.title}</label>
      <Input className="input-style " value={props.otherValue} onChange={(e:any)=>props.setOtherValue(e.target.value)} />
      <Space className='pt-3 flex justify-end'>
        <Button
          key="Cancel"
          className="teriary-color border-1 border-solid border-[#4a9d77] pt-0 pb-0 pr-5 pl-5 "
          onClick={() => {
            props.setOpenModal(false);
          }}
        >Cancel</Button>
        <Button
          htmlType="submit"
          className="teriary-bg-color border-1 border-solid border-[#4a9d77] white-color pt-0 pb-0 pr-5 pl-5"
          onClick={() => {
            props.setOpenModal(false);
          }}
        >
          Submit
        </Button>
      </Space>

    </Modal>
  )
}

export default OthersItem