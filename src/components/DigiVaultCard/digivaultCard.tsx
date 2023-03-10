// import { Education1Icon, EducationIcon } from '../../assets/images';
import { BoxWrapper } from "../BoxWrapper/BoxWrapper";
import "./style.scss";
import Education from "../../assets/images/digivault/education.png";
import Education1 from "../../assets/images/digivault/education1.png";

const DigivaultCard = (props: any) => {
  const { onClick, TitleImg, SubImg, title, subTitle, bgColor, index } = props;

  console.log(bgColor);

  return (
    <div onClick={onClick}>
      <BoxWrapper className={`hover-effect-${index}  digivault-wrapper`}>
        <div className={`upper-part`}>
          <div className="bgImg">
            {/* <EducationIcon  /> */}
            <TitleImg />
          </div>
          {title === "Others" ? "" : <SubImg />}
        </div>
        <h4>{title}</h4>

        <h6>{subTitle}</h6>
      </BoxWrapper>
    </div>
  );
};

export default DigivaultCard;
