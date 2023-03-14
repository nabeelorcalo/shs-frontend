// import { Education1Icon, EducationIcon } from '../../assets/images';
import React, { useState } from "react";
import {
  EducationWhite,
  EducationWhiteSub,
  BankingWhiteSub,
  HealthWhiteSub,
  TransWhiteSub,
} from "../../assets/images";
import { BoxWrapper } from "../BoxWrapper/boxWrapper";
import "./style.scss";

const DigivaultCard = (props: any) => {
  const { onClick, TitleImg, SubImg, title, subTitle, bgColor, index } = props;

  const [isHovering, setIsHovering] = useState(false);
  const [currentHover, setCurrentHover] = useState("");

  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };

  console.log(bgColor);

  return (
    <div onClick={onClick}>
      <div
        onMouseOver={(e) => {
          setCurrentHover(index);
          handleMouseOver();
        }}
        onMouseOut={(index) => {
          setCurrentHover("");
          handleMouseOut();
        }}
        className={`DigivaultCard hover-effect-${index}  digivault-wrapper`}
      >
        <div className={`upper-part`}>
          <div>
            {/* <EducationIcon  /> */}
            {isHovering ? <EducationWhite /> : <TitleImg />}
          </div>
          {isHovering && title === "Education" && <EducationWhiteSub />}
          {isHovering && title === "Banking" && <BankingWhiteSub />}
          {isHovering && title === "Health" && <HealthWhiteSub />}
          {isHovering && title === "Transportation" && <TransWhiteSub />}
          {title === "Others" || isHovering ? "" : <SubImg />}
        </div>
        <h4>{title}</h4>

        <h6>{subTitle}</h6>
      </div>
    </div>
  );
};

export default DigivaultCard;
