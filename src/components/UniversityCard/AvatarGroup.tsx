import { Avatar } from "antd";
import { FC } from "react";
import constants from "../../config/constants";
interface IAvatarGroup {
  maxCount?: number;
  list?: any[];
}
const AvatarGroup: FC<IAvatarGroup> = (props) => {
  const { maxCount, list = [] } = props;
  // console.log(list, "fdsssssssssssssssssssss");
  return (
    <Avatar.Group
      size={32}
      maxCount={maxCount ? maxCount : 2}
      maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
    >
      {list?.map((item, index) => {
        return (
          <>
            <Avatar
              className="h-[32px] w-[32px] rounded-full object-cover relative"
              src={item?.internImage}
              alt={item?.firstName}
              icon={
                <span className="uppercase text-sm leading-[16px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                  {item?.firstName && item?.firstName[0]}
                  {item?.lastName && item?.lastName[0]}
                </span>
              }
            />
          </>
        );
      })}
    </Avatar.Group>
  );
};

export default AvatarGroup;
