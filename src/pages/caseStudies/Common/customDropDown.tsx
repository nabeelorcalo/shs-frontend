import React, { ReactNode, useState } from 'react';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { NavLink } from 'react-router-dom';
import { LocationMore } from '../../../assets/images';
import { ROUTES_CONSTANTS } from '../../../config/constants';

const CustomDropDownCaseStudies = (props: any) => {
  const [visible, setVisible] = useState(false);
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <NavLink to={`/${ROUTES_CONSTANTS.CASE_STUDIES_ASSESSMENT_FORM}${props.data}`}>
          Give Feedback
        </NavLink>
      ),
    },
    {
      key: '2',
      label: (
        <span onClick={() => { props.setOpenWarningModal(true), setVisible(false) }}>
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

export default CustomDropDownCaseStudies