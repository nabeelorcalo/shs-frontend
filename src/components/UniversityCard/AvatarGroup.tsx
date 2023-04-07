import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React, { FC } from "react";
interface IAvatarGroup {
  maxCount?: number;
  list?: string[];
}
const AvatarGroup: FC<IAvatarGroup> = (props) => {
  const { maxCount, list = [] } = props;
  return (
    <Avatar.Group size={32} maxCount={maxCount ? maxCount : 2} maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
      {list?.map((item) => (
        <Avatar size={32} className="light-grey-bg" src={item} />
      ))}
    </Avatar.Group>
  );
};

export default AvatarGroup;
