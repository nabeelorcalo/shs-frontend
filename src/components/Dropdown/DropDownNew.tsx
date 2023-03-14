import React, { ReactNode } from 'react';
import { Dropdown as AntDropDown } from 'antd';

interface Props {
  children?: any;
  rest?: any;
  items?: any;
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