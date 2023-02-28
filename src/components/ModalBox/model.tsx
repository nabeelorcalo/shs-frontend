import React, { useState } from 'react';
import {  Modal } from 'antd';
import "./modal.scss"
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
    <Modal width={'650px'} title={title} open={open} okText={okText} onOk={setOpen} onCancel={setOpen} closeIcon={''} {...rest} className='modal-wrapper'>
      {children}
    </Modal>
  )
}

export default Model
