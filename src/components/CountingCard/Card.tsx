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
          className="flex items-center justify-center w-[44px] h-[44px] rounded-lg "
        >
          {icon}
        </div>
        <p className="text-base font-semibold">{title}</p>
      </Row>
      <p className="text-[38px] leading-[46px] font-medium text-primary-color pl-[64px]">
        {+count < 10 ? `0${count}` : count}
      </p>
    </div>
  );
};

export default Card;
