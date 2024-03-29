import { useState } from "react";
import "./style.scss";
import { Space, Dropdown } from "antd";
import { ThreeDots } from "../../../../assets/images"
interface Props {
  menu1: any,
}
const CustomDroupDown = (props: Props) => {
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
        <ThreeDots className="cursor-pointer" />
      </Dropdown>
    </Space>
  );
};

export default CustomDroupDown;