import React, { FC } from "react";
import './style.scss'
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

interface ContentMenuProps {
  items: MenuProps['items']
  handleMenuClick: MenuProps['onClick']
  selectedKey: string
}

const ContentMenu: FC<ContentMenuProps> = ({items, handleMenuClick, selectedKey}) => {

  return (
    <div className="shs-content-menu">
      <Menu
        items={items}
        onClick={handleMenuClick}
        selectedKeys={[selectedKey]}
        mode="horizontal"
      />
    </div>
  )
}

export default ContentMenu;
