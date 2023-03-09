import { Modal } from 'antd'
import React from 'react'

const ModalWrapper = ({isEditModalOpen, eventData, setIsEditModalOpen}:any) => {
  const events = eventData?.event?._def
  console.log('events', events);
  
  return (
    <>
    <Modal open={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} >
        {events?.title}
    </Modal>
    </>
  )
}

export default ModalWrapper