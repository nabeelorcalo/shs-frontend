import React, { ReactNode } from 'react';
import { Dropdown as AntDropDown } from 'antd';
import type { MenuProps } from 'antd';
interface Props {
  children?: ReactNode | ReactNode[];
  rest?: any;
  items?: any | MenuProps['items'];
}

const DropDownNew = (props: Props) => {
  const { items, children, ...rest } = props;
  return (
    <AntDropDown
      trigger={['click']}
      menu={{ items }}
      overlayClassName='drop_down_overlay_new'
      {...rest}
    >
      {children}
    </AntDropDown>
  )
}

export default DropDownNew