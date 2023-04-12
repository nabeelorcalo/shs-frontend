import { ArrowRightOutlined } from "@ant-design/icons/lib/icons";
import { Progress } from "antd";
import { BoxWrapper } from "../../../../../../components";
import "./styles.scss";

const CardUsers = (props: any) => {
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
    sideIcon,
    date,
    fSize,
    downloadIcon,
  } = props;
  return (
    <div className="user-card-main">
      <div
        className={`contract-card relative flex items-center overflow-hidden rounded-lg w-full ${
          cardWithProgressBar && "contract-card-progress"
        }`}
      >
        <BoxWrapper className="justify-between box-wrapper-1 flex items-center">
          <div className="flex">
            <img src={img} alt="icon" />
            <div className="ml-3">
              <p className="text-base font-semibold">{title}</p>
              <span>{description}</span>
            </div>
          </div>
          {date && (
            <div>
              <p>{date}</p>
              <p>{fSize}</p>
            </div>
          )}
        </BoxWrapper>

        <div className="view-all-btn flex gap-x-3">
          {date && <span className="capitalize">{downloadIcon}</span>}
          <span className="capitalize">{sideIcon}</span>
        </div>
      </div>
    </div>
  );
};

export default CardUsers;