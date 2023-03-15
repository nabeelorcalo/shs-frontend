import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

export const PopUpModal = ( {title, width, showHide, cancelBtntxt, okBtntxt, children}:any) => {
  const [open, setOpen] = useState(showHide);

  return (
    <>
      <Modal
        title={title}
        open={open}
        onCancel={() => { setOpen(!open) }}
        width={width}
        maskClosable={true}
        closeIcon={<CloseCircleFilled style={{ color: "#A3AED0", fontSize: '20px' }} />}
        footer={[
          <Button onClick={() => { setOpen(!open) }} key="Cancel" style={{ border: '1px solid #4a9d77', color: '#4a9d77', padding: '0px 20px' }}>
            {cancelBtntxt}
          </Button>,
          <Button onClick={() => { setOpen(!open) }} key="submit" style={{ backgroundColor: '#4a9d77', color: '#fff', border: '1px solid #4a9d77', padding: '0px 20px' }}>
            {okBtntxt}
          </Button>,
        ]}
      >
        {children}
      </Modal>

    </>
  );
};

