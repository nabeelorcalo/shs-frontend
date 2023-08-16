import React, { FC } from 'react';
import { Modal } from 'antd';
import { IconCloseModal } from '../../assets/images'
import './style.scss'

interface ModalProps {
  title?: React.ReactNode
  width?: string | number
  open: boolean
  close?: () => void
  children?: React.ReactNode
  footer?: any
  closable?: boolean
  wrapClassName?: string,
  okBtntxt?: any,
  cancelBtntxt?: any,
  okBtnFunc?: any,
}

export const PopUpModal: FC<ModalProps> = (props) => {
  const { title, width = 700, open, close, children, footer, closable , wrapClassName, okBtntxt, okBtnFunc } = props
  return (
    <>
      <Modal
        centered
        title={title}
        maskClosable={true}
        closeIcon={<IconCloseModal width={24} height={24} onClick={close} />}
        open={open}
        onOk={okBtnFunc}
        onCancel={close}
        width={width}
        closable={closable}
        footer={footer}
        okText={okBtntxt}
        wrapClassName={wrapClassName}
      >
        {children}
      </Modal>
    </>
  );
};

