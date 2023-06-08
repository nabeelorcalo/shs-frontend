import { Avatar } from "antd";
import { FC } from "react";
import constants from "../../config/constants";
interface IAvatarGroup {
  maxCount?: number;
  list?: any[];
}
const AvatarGroup: FC<IAvatarGroup> = (props) => {
  const { maxCount, list = [] } = props;
  return (
    <Avatar.Group
      size={32}
      maxCount={maxCount ? maxCount : 2}
      maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
    >
      {list?.map((item, index) => {
        const user = item?.intern?.userDetail?.profileImage;
        return (
          <Avatar
            key={index}
            size={32}
            className="light-grey-bg"
            src={`${item?.internProfile}`}
          />
        );
      })}
    </Avatar.Group>
  );
};

export default AvatarGroup;
