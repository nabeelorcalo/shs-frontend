import { Col, Row, Avatar } from "antd";
import { FC } from "react";
import AvatarGroup from "../UniversityCard/AvatarGroup";

interface Icard {
  logo?: any;
  title?: string;
  agency?: string;
  usersList?: any[];
}
const Card: FC<Icard> = (props) => {
  const { logo, title, agency, usersList } = props;
  return (
    <Row align="top" className="bg-white rounded-2xl p-5 wrapper-shadow gap-4">
      <Avatar
        className="h-[48px] w-[48px] rounded-full object-cover relative"
        src={logo}
        alt={title}
        icon={
          <span className="uppercase text-[20px] leading-[22px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
            {title?.[0]}
          </span>
        }
      />
      <Col>
        <p className="text-base text-secondary-color font-semibold">{title}</p>
        <p className="text-base text-secondary-color font-medium pb-[10px]">{agency}</p>
        <AvatarGroup maxCount={6} list={usersList} />
      </Col>
    </Row>
  );
};

export default Card;
