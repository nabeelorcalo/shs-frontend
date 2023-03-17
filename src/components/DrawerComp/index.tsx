import React from 'react';
import { Drawer as AntDrawer } from 'antd';
import './style.scss';
 interface DrawerDataInterface {
    title?: string,
    className?: string,
    placement?: any,
    onClose?: any,
    open?: any,
    children?: any,
    rest?: any
    closeIcon?:any
    
 }

const DrawerComp = ({ title, className, placement = 'right', onClose, open,closeIcon, children, ...rest }: DrawerDataInterface) => {
    return (
        <AntDrawer title={title}
            className={`drawar_main ${className}`}
            placement={placement}
            onClose={onClose}
            open={open}
            closeIcon={closeIcon}
            {...rest}
        >
            {children}
        </AntDrawer>
    )
}

export default DrawerComp