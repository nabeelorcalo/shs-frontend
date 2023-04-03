import { Col, Row } from "antd";
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
    <Row align='top' className="bg-white rounded-2xl p-5 wrapper-shadow gap-4">
      <img src={logo} alt="agency logo" />
      <Col>
        <p className="text-base text-secondary-color font-semibold">
          {title}
        </p>
        <p className="text-base text-secondary-color font-medium pb-[10px]">
          {agency}
        </p>
        <AvatarGroup maxCount={6} list={usersList} />
      </Col>
    </Row>
  );
};

export default Card;
