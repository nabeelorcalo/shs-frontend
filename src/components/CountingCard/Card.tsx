import { FC, ReactNode } from "react";
import { Row } from "antd/es/grid";
import { currentUserRoleState } from "../../store";
import { useRecoilValue } from "recoil";
import constants from "../../config/constants";

interface ICard {
  icon: ReactNode;
  iconBg: string;
  title: string;
  count: string | number;
}
const Card: FC<ICard> = (props) => {
  const currentUserRole = useRecoilValue(currentUserRoleState)
  const { UNIVERSITY, AGENT } = constants
  const { icon, title, count, iconBg } = props;
  const iconSize = [UNIVERSITY, AGENT]?.includes(currentUserRole) ? "60px" : "44px";
  return (
    <div>
      <Row align="middle" className="gap-5">
        <div
          style={{ backgroundColor: iconBg }}
          className={`flex items-center justify-center w-[${iconSize}] h-[${iconSize}] rounded-lg`}
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
