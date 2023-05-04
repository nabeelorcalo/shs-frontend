import React, { useState } from "react";
import { Dropdown, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { More } from "../../assets/images";

const GrievanceDropdown = (props: any) => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };
  return (
    <Dropdown
      className="setting-custom-dropdown"
      overlay={
        <Menu>
          <Menu.Item key="1">
            <NavLink
              className="text-[#454545] hover:text-[#454545] border-0"
              to={props?.link}
            >
              View Details
            </NavLink>
          </Menu.Item>
        </Menu>
      }
      placement="bottomRight"
      open={visible}
      onOpenChange={handleVisibleChange}
      trigger={["click"]}
    >
      <div style={{ cursor: "pointer" }}>
        <More width="24px" />
      </div>
    </Dropdown>
  );
};

export default GrievanceDropdown;

