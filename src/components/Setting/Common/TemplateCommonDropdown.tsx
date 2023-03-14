import React, { useState } from "react";
import { Dropdown, Menu } from "antd";
import { LocationMore } from "../../../assets/images";

interface ITEMPLATEDROPDOWN {
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  showDeleteModal: boolean;
}

const TemplateCommonDropdown = ({
  setShowDeleteModal,
  showDeleteModal,
}: ITEMPLATEDROPDOWN) => {
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
            <span
            // onClick={() => {
            //   props.setShowEditModal(!props.showEditModal), setVisible(false);
            // }}
            >
              
              Edit
            </span>
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
      visible={visible}
      onVisibleChange={handleVisibleChange}
      trigger={["click"]}
    >
      <div style={{ cursor: "pointer" }}>
        <LocationMore width="24px" />
      </div>
    </Dropdown>
  );
};

export default TemplateCommonDropdown;
