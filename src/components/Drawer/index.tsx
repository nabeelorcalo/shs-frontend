import React, { FC } from "react";
import './style.scss'
import { Drawer as AntDrawer } from 'antd';
import { IconCloseCircle } from '../../assets/images'

interface DrawerProps {
  title: React.ReactNode
  placement?: "right" | "left"
  open: boolean
  onClose: () => void
  children: React.ReactNode
  width?: number | string
  closable?: boolean
}

const Drawer: any = ({ title, placement="right", open, onClose, children, width="380", closable=true }: any) => {
  return (
    <AntDrawer
      title={title}
      placement={placement}
      open={open}
      onClose={onClose}
      width={width}
      closable={closable}
      closeIcon={<IconCloseCircle />}
      className="shs-drawer"
    >
      {children}
    </AntDrawer>
  )
}

export default Drawer;
