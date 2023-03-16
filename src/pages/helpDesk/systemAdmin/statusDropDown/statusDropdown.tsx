import React, { useState } from "react";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

const StatusDropdown = (props: any) => {
  const { StatusOptions } = props;

  const [statusValue, setStatusValue] = useState("Pending");
  const [visible, setVisible] = useState(false);
  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };

  const opriorityOption = (
    <Menu>
      {StatusOptions.map((item: any) => {
        return (
          <Menu.Item onClick={() => setStatusValue(item.value)} key={item.key}>
            {item.value}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <div>
      <Dropdown
        placement="bottomRight"
        overlay={opriorityOption}
        visible={visible}
        onVisibleChange={handleVisibleChange}
        trigger={["click"]}
      >
        <div
          className={`cursor-pointer flex items-center justify-center h-[26px]  white-color rounded-lg ${
            statusValue === "Pending" && "bg-[#9797a7]"
          } ${statusValue === "In Progress" && "text-warning-bg-color"} ${statusValue === "Resolved" && "bg-[#4ED185]"}`}
        >
          {statusValue}
          <span>
            <DownOutlined className="text-sm ml-2" />
          </span>
        </div>
      </Dropdown>
    </div>
  );
};

export default StatusDropdown;
