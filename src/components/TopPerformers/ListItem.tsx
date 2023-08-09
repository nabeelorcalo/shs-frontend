import { FC, ReactNode } from "react";
import { Row, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons/lib/icons";

interface IListItem {
  image: string | ReactNode;
  name: string;
  designation: string;
  progress: string | number;
}
const ListItem: FC<IListItem> = (props) => {
  const { image, name, designation, progress } = props;

  return (
    <Row className="w-full gap-5 pt-2.5 pb-5">
      <Avatar
        className="h-[32px] w-[32px] rounded-full object-cover relative"
        src={image}
        alt={name}
        icon={
          <span className="uppercase text-sm leading-[16px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
            {name && name[0]}
            {name && name.split(" ")[1][0]}
          </span>
        }
      />
      <div className="flex-1 !max-w-[115px]">
        <p className="text-primary-color text-sm capitalize">{name}</p>
        <p className="text-secondary-color text-sm whitespace-nowrap ">{designation}</p>
      </div>
      <p className="light-grey-color text-2xl font-semibold -mt-[6px]">{progress}</p>
    </Row>
  );
};

export default ListItem;
