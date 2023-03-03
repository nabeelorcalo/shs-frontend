import { CloseCircleFilled } from '@ant-design/icons'
import {  Button, Modal } from 'antd'
import React, { useState } from 'react'



export const EmojiEvaluation = () => {
  const [open, setOpen] = useState(false);


  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  return (
    <div>
      <Button type='primary' onClick={()=>{setOpen(!open)}} >Modal</Button>
      <Modal
        closeIcon={<CloseCircleFilled style={{ color: '#A3AED0', fontSize: '20px' }} />}
        footer={[
          <Button key="Cancel" style={{ border: '1px solid #4a9d77', color: '#4a9d77', padding: '0px 20px' }}>Cancel</Button>,
          <Button key="submit" style={{ backgroundColor: '#4a9d77', border: '1px solid #4a9d77', color: '#fff', padding: '0px 20px' }}>Submit</Button>
        ]}
        title="Customizable Modal"
        width={720}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </div>
  )
}
