import React, { useState } from 'react';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LocationMore } from '../../../../assets/images';


const CustomDropDownReport = (props:any) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span onClick={() => navigate(`/report/view-details/assement-form/${props.data}`)}>
        View</span>
      ),
    },
    {
      key: '2',
      label: (
        <span onClick={()=>{props.dewnload, setVisible(false)}}>
        Dewnload
      </span>
      ),
    },
  ];
 
  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };
  return (
    <Dropdown
    className=""
    menu={{ items }}
    open={visible}
    onOpenChange={handleVisibleChange}
    trigger={["click"]}
  >
    <div style={{ cursor: "pointer" }}>
      <LocationMore width="24px" />
    </div>
  </Dropdown>
  )
}

export default CustomDropDownReport