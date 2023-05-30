import React, { ReactNode, useState } from 'react';
import { Dropdown as AntDropDown } from 'antd';
import type { MenuProps } from 'antd';
interface Props {
  placement?: any,
  children?: ReactNode | ReactNode[];
  rest?: any;
  items?: any | MenuProps['items'];
  className?: string;
}

const DropDownNew = (props: Props | any) => {
  const { className, items, children, ...rest } = props;
  const [visible, setVisible] = useState(false);
  return (
    <AntDropDown
      open={visible}
      onOpenChange={setVisible}
      trigger={['click']}
      className={`${className}'drop-down-new`}
      menu={{ items }}
      overlayClassName='drop_down_overlay_new'
      {...rest}
    >
      {children}
    </AntDropDown>
  )
}

export default DropDownNew