import React, { FC } from "react";
import './style.scss'
import { Drawer as AntDrawer } from 'antd';
import { IconCloseCircle } from '../../assets/images'
import { DrawerWidth } from "../DrawerWidth";

interface DrawerProps {
  title: React.ReactNode
  placement?: "right" | "left"
  open: boolean
  onClose: () => void
  children: React.ReactNode
  width?: number | string
  closable?: boolean
  className?: string;
}

export const Drawer: any = ({ title, className, placement = "right", open, onClose, children, width, closable = true }: DrawerProps) => {
  const FilterWidth = DrawerWidth();
  return (
    <AntDrawer
      title={title}
      placement={placement}
      open={open}
      onClose={onClose}
      width={(title === "Filters" && FilterWidth < 768) ? 300 : width }
      closable={closable}
      closeIcon={<IconCloseCircle />}
      className={`shs-drawer ${className}`}
    >
      {children}
    </AntDrawer>
  )
}

export default Drawer;
