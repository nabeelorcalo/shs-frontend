import React, { useState } from "react";
import { ThreeDots } from "../../../../assets/images";
import { Dropdown, Menu } from "antd";

const DropDownForPerformance = (props: any) => {
  const { item, IdHandler } = props;
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
            <span onClick={() => {IdHandler(item.id) , setVisible(false)}} >Edit</span>
          </Menu.Item>
          <Menu.Item key="2">
            <span onClick={() => {}}>Delete</span>
          </Menu.Item>
        </Menu>
      }
      open={visible}
      onOpenChange={handleVisibleChange}
      trigger={["click"]}
    >
      <div style={{ cursor: "pointer" }}>
        <ThreeDots width="24px" />
      </div>
    </Dropdown>
  );
};

export default DropDownForPerformance;
