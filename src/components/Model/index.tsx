import React, { FC } from 'react';
import { Modal } from 'antd';
import { IconCloseCircle } from '../../assets/images'

interface ModalProps {
  title?: React.ReactNode
  width?: string | number
  open: boolean
  close: () => void
  children?: React.ReactNode
  footer?: React.ReactNode
  closable?: boolean
  wrapClassName?: string
}

export const PopUpModal: FC<ModalProps> = ( props ) => {
 const {title, width=700, open, close, children, footer=null, closable=true, wrapClassName } = props
  return (
    <>
      <Modal
        centered
        title={title}
        maskClosable={true}
        closeIcon={<IconCloseCircle/>}
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

