import React, { ReactNode, useState } from 'react';
import { Dropdown as AntDropDown } from 'antd';
import type { MenuProps } from 'antd';
interface Props {
  placement?: any,
  children?: ReactNode | ReactNode[];
  rest?: any;
  items?: any | MenuProps['items'];
  className?: string;
  onClick?: any
}

const DropDownNew = (props: Props | any) => {
  const { className, items, children, onClick, ...rest } = props;
  const [visible, setVisible] = useState(false);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setVisible(false);
    if(onClick) {
      onClick(e)
    }
};

return (
  <AntDropDown
    open={visible}
    onOpenChange={setVisible}
    trigger={['click']}
    className={`${className}'drop-down-new`}
    menu={{ items, onClick: handleMenuClick }}
    overlayClassName='drop_down_overlay_new'
    {...rest}
  >
    {children}
  </AntDropDown>
)
}

export default DropDownNew