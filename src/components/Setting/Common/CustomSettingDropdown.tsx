import React, { useState } from "react";
import { Space, Dropdown } from "antd";
import "./CustomSettingDropdown.scss";
import More from "../../../assets/images/setting/More.svg";

const CustomSettingDropdown = (props: any) => {
  const { menu1 } = props;

  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };
  return (
    <Space size="middle" className="float-right">
      <Dropdown
      
        className="droup-down-main"
        overlay={menu1}
        visible={visible}
        onVisibleChange={handleVisibleChange}
        trigger={["click"]}
      >
        <div style={{ cursor: "pointer" }}>
          <img className="float-right" src={More} alt="threedots" />
        </div>
      </Dropdown>
    </Space>
  );
};

export default CustomSettingDropdown;