import React, { useState } from 'react';
import { Button, Modal } from 'antd';

export const PopupModal: React.FC = ({Title, Width}:any) => {
  const [open, setOpen] = useState(true);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  return (
    <>
      <Modal
        title={Title}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ }}
        cancelButtonProps={{ }}
        width={Width}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

