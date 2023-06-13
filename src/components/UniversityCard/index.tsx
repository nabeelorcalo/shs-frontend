import { FC } from "react";
import { Avatar, Row } from "antd";
import AvatarGroup from "./AvatarGroup";
import UniversityLogo from "./UniversityLogo";
import "./style.scss";
interface IUniversityCard {
  logo: any;
  title: string;
  maxCount?: number;
  list: string[];
}
export const UniversityCard: FC<IUniversityCard> = (props) => {
  const { logo, title, maxCount, list } = props;
  // console.log("outer",list);
  
  return (
    <Row className="bg-white relative mt-8 rounded-2xl wrapper-shadow" align="middle" justify="center">
      <div className="absolute top-[-36px] ml-1 z-[2]">
        {/* <UniversityLogo logo={logo} /> */}
        <Avatar
          className="h-[70px] w-[70px] rounded-full object-cover relative"
          src={logo}
          alt={title}
          icon={
            <span className="uppercase text-[28px] leading-[26px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
              {title && title[0]}
              {title && title.split(" ")[1][0]}
            </span>
          }
        />
      </div>
      <Row
        className="university-card flex-col min-w-[240px] min-h-[145px] rounded-2xl relative"
        align="middle"
        justify="center"
      >
        <p className="text-base text-secondary-color font-medium mt-[40px] mb-[15px]">{title}</p>
        <AvatarGroup maxCount={maxCount} list={list} />
      </Row>
    </Row>
  );
};
