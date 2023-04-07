import React, { useState } from "react";
import { Dropdown, Menu } from "antd";
import { LocationMore } from "../../../assets/images";
import { NavLink } from "react-router-dom";

interface ITEMPLATEDROPDOWN {
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  showDeleteModal: boolean;
  link: string;
}

export const TemplateCommonDropdown = (props: ITEMPLATEDROPDOWN) => {
  const { setShowDeleteModal, showDeleteModal, link } = props;
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };

  return (
    <Dropdown
      className="dropdown"
      overlay={
        <Menu>
          <Menu.Item key="1">
            <NavLink to={link}>Edit</NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <span
              onClick={() => {
                setShowDeleteModal(!showDeleteModal), setVisible(false);
              }}
            >
              Delete
            </span>
          </Menu.Item>
        </Menu>
      }
      open={visible}
      onOpenChange={handleVisibleChange}
      trigger={["click"]}
    >
      <div style={{ cursor: "pointer" }}>
        <LocationMore width="24px" />
      </div>
    </Dropdown>
  );
};

export default TemplateCommonDropdown;
