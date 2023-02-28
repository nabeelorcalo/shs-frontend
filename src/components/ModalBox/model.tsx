import React, { useState } from 'react';
import { Button, Modal } from 'antd';

interface Props {
  title: string;
  okText?: string;
  open: boolean;
  onOk?: () => void;
  setOpen: () => void;
  children: any;
}

const Model = ({ title, okText = 'Add', onOk, open, setOpen, children, ...rest }: Props) => {

  return (
    <Modal title={title} open={open} okText={okText} onOk={setOpen} onCancel={setOpen} closeIcon={''} {...rest}>
      {children}
    </Modal>
  )
}

export default Model
