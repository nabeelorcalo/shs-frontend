import { Progress, Avatar } from "antd";
import { BoxWrapper } from "../../components";
import TimeIcon from "../../assets/images/timesheetTime.png";
import { Clock, RefreshIcon } from "../../assets/images/index";
import { ArrowRightIcon } from "../../assets/images";
import "./ContractCard.scss";

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
    className,
    handleViewAll,
  } = props;
  return (
    <div
      className={`
      contract-card relative flex items-center overflow-hidden rounded-2xl w-full 
      ${className} 
      ${cardWithProgressBar && "contract-card-progress"}`}
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
            {/* <img src={userImg} className="img w-[48px] h-[48px] object-cover" /> */}
            <Avatar size={48} shape="circle" src={userImg}>
              {/* {data?.userDetail?.firstName?.charAt(0)}
              {data?.userDetail?.lastName?.charAt(0)} */}
              {userName?.split(" ")?.map((char: string) => char?.charAt(0))}
            </Avatar>
            <div className="ml-[20px] capitalize">
              <p className="user-name text-sm">{userName}</p>
              <span className="text-sm">{designation}</span>
            </div>
          </div>
          <div className="total-hours flex items-center flex-1 gap-10">
            <div className="flex items-center">
              <div className="img w-[48px] h-[48px] object-cover">
                <Clock />
              </div>
              {/* <img src={Clock} className="img w-[48px] h-[48px] object-cover" /> */}
              <div className="ml-[20px] capitalize">
                <p className="text-success-placeholder-color">Total hours</p>
                <span className="text-lg font-semibold">{totalHours}</span>
              </div>
            </div>
            <Progress percent={progress} strokeColor={strokeColor} className="progress-bar flex items-center gap-3" />
          </div>
          <div className="relative flex items-center">
            <div className="img h-[48px] object-cover  z-10">
              <RefreshIcon />
            </div>
            {/* <img
              src={TimeIcon}
              className="img h-[48px] object-cover mr-5 z-10"
            /> */}
            <div className="ml-[20px] capitalize">
              <p className="user-name">Worked Hours</p>
              <span className="text-lg font-semibold">{workedHours}</span>
            </div>
          </div>
        </BoxWrapper>
      )}

      <div className="view-all-btn" onClick={handleViewAll}>
        <span className="capitalize flex items-center gap-2">
          View
          <ArrowRightIcon />
        </span>
      </div>
    </div>
  );
};
