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
  footer?: React.ReactNode
  closable?: boolean
  wrapClassName?: string,
  okBtntxt?: any,
  cancelBtntxt?: any,
  okBtnFunc?: any,
}

export const PopUpModal: FC<ModalProps> = (props) => {
  const { title, width = 700, open, close, children, footer, closable , wrapClassName } = props
  return (
    <>
      <Modal
        centered
        title={title}
        maskClosable={true}
        closeIcon={<IconCloseModal />}
        open={open}
        onCancel={close}
        width={width}
        closable={closable}
        footer={footer}
        wrapClassName={wrapClassName}
      >
        {children}
      </Modal>
    </>
  );
};

