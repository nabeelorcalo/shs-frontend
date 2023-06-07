import { FC, ReactNode } from "react";
import { Row,Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons/lib/icons";

interface IListItem {
  image: string | ReactNode;
  name: string;
  designation: string;
  progress: string | number;
}
const ListItem: FC<IListItem> = (props) => {
  const { image, name, designation,progress } = props;
  return (
    <Row className="w-full gap-5 pt-2.5 pb-5">
      <Avatar icon={image?"":<UserOutlined /> } size={32} src={image} alt={name}/>
      <div className="flex-1">
      <p className="text-primary-color text-sm capitalize">{name}</p>
      <p className="text-secondary-color text-sm">{designation}</p>
      </div>
      <p className="light-grey-color text-2xl font-semibold">{progress}</p>
    </Row>
  );
};

export default ListItem;
