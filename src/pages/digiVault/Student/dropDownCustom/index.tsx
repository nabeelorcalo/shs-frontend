import React, { useState } from "react";
import "./style.scss";
import { Space, Dropdown } from "antd";
import { More } from "../../../../assets/images";

const CustomDroupDown = (props: any) => {
  const { menu1 } = props;
  const [visible, setVisible] = useState(false);
  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };
  return (
    <Space size="middle">
      <Dropdown
        placement="bottomRight"
        className="droup-down-main"
        overlay={menu1}
        visible={visible}
        onVisibleChange={handleVisibleChange}
        trigger={["click"]}
      >
        <div className="cursor-pointer">
          <img src={More} alt="threedots" />
        </div>
      </Dropdown>
    </Space>
  );
};

export default CustomDroupDown;