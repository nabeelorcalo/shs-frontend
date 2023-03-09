// import { Education1Icon, EducationIcon } from '../../assets/images';
import { BoxWrapper } from "../BoxWrapper/boxWrapper";
import "./style.scss";
import Education from "../../assets/images/digivault/education.png";
import Education1 from "../../assets/images/digivault/education1.png";

const DigivaultCard = (props: any) => {
  const { onClick, titleImg, subImg, title, subTitle, bgColor } = props;

  console.log(bgColor);

  return (
    <BoxWrapper className={`digivault-wrapper`}>
      <div className={`upper-part`}>
        <div className="bgImg">
          {/* <EducationIcon  /> */}
          <img src={titleImg} alt="icon" />
        </div>
        {title === "Others" ? "" : <img src={subImg} alt="icon" />}
      </div>
      <h4>{title}</h4>

      <h6>{subTitle}</h6>
    </BoxWrapper>
  );
};

export default DigivaultCard;
