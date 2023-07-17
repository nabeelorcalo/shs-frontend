import { FC, ReactNode } from "react";
import { Row } from "antd/es/grid";

interface ICard {
  icon: ReactNode;
  iconBg: string;
  title: string;
  count: string | number;
}
const Card: FC<ICard> = (props) => {
  const { icon, title, count, iconBg } = props;
  return (
    <div>
      <Row align="middle" className="gap-5">
        <div
          style={{ backgroundColor: iconBg }}
          className="flex items-center justify-center w-[60px] h-[60px] rounded-lg "
        >
          {icon}
        </div>
        <div>
          <p className="text-base font-normal">{title}</p>
          <p className="text-2xl font-medium text-primary-color">{+count > 9 ? count : `0${count}`}</p>
        </div>
      </Row>
    </div>
  );
};

export default Card;
