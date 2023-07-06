import { ArrowRightOutlined } from "@ant-design/icons/lib/icons";
import { Progress } from "antd";
import { BoxWrapper } from "../../components";
// import TimeIcon from "../../assets/images/timesheetTime.png";
// import Clock from "../../assets/images/Clock.png";
import "./styles.scss";

export const ContractCard = (props: any) => {
  const {
    cardWithProgressBar,
    img,
    title,
    description,
    userImg,
    userName,
    designation,
    totalHours,
    progress,
    workedHours,
    strokeColor,
    onClick,
  } = props;
  return (
    <div
      className={`contract-card relative flex items-center overflow-hidden rounded-lg w-full ${cardWithProgressBar && "contract-card-progress"
        }`}
    >
      {!cardWithProgressBar ? (
        <BoxWrapper className="box-wrapper-1 flex items-center">
          <img src={img} alt="icon" />
          <div className="ml-3">
            <p className="text-base font-semibold">{title}</p>
            <span>{description}</span>
          </div>
        </BoxWrapper>
      ) : (
        <BoxWrapper className="card-progress-box flex gap-10 flex-wrap">
          <div className="relative user flex items-center">
            <img src={userImg} className="img w-[48px] h-[48px] object-cover" />
            <div className="ml-[20px] capitalize">
              <p className="user-name">{userName}</p>
              <span>{designation}</span>
            </div>
          </div>
          <div className="total-hours flex items-center flex-1 gap-10">
            <div className="flex items-center">
              <img src="" className="img w-[48px] h-[48px] object-cover" />
              <div className="ml-[20px] capitalize">
                <p>Total hours</p>
                <span>{totalHours}</span>
              </div>
            </div>
            <Progress percent={progress} strokeColor={strokeColor} />
          </div>
          <div className="relative flex items-center">
            <img src="" className="img  h-[48px] object-cover mr-5  z-10" />
            <div className="ml-[20px] capitalize">
              <p className="user-name">Worked Hours</p>
              <span>{workedHours}</span>
            </div>
          </div>
        </BoxWrapper>
      )}

      <div className="view-all-btn flex" onClick={onClick}>
        <span className="capitalize">view<span className="ml-2"><ArrowRightOutlined /></span></span>
      </div>
    </div>
  );
};
