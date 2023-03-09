import React, { useState } from 'react';
import { Modal as AntModal } from 'antd';
import { CloseCircleIcon } from '../../assets/images';
import "./modal.scss"
interface Props {
  title: string;
  okText?: string;
  open: boolean;
  onOk?: () => void;
  setOpen: () => void;
  width?: string;
  icon?: any;
  children: any;
}

const Model = ({ icon = CloseCircleIcon, width = '650px', title, okText = 'Add', onOk, open, setOpen, children, ...rest }: Props) => {

  return (
    <AntModal
      width={width}
      title={title}
      open={open}
      okText={okText}
      onOk={onOk}
      onCancel={setOpen}
      className='modal-wrapper'
      closeIcon={<img src={icon} />}
      {...rest}
    >
      {children}
    </AntModal>
  )
}

export default Model
