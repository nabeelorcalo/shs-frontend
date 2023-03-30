import React, { ReactNode, useState } from 'react';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LocationMore } from '../../../assets/images';

const CustomDropDownCaseStudies = (props:any) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span onClick={() => navigate(`/case-studies/assessment-form/${props.data}`)}>
        Give Feedback</span>
      ),
    },
    {
      key: '2',
      label: (
        <span onClick={()=>{props.setOpenWarningModal(true), setVisible(false)}}>
        Reject
      </span>
      ),
    },
  ];
 
  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };
  return (
    <Dropdown
    className="setting-custom-dropdown"
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

export default CustomDropDownCaseStudies