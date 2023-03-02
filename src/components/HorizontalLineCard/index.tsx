import { Progress } from "antd";
import "./HorizontalLineCard.scss";
import { theme } from "../../theme";
interface HorizonalLineCardProps {
  icon: string;
  title: string;
  subTitle: string;
  content: string;
  alt?: string;
  progressbarValue: number;
  progressbarColor: string;
}
export const HorizonalLineCard = ({
  icon,
  title,
  content,
  alt,
  progressbarValue,
  subTitle,
  progressbarColor,
}: HorizonalLineCardProps) => {
  return (
    <div className="horizontal-line-card flex flex-col rounded-2xl p-5 max-w-[462px]   ">
      <span className=" md:font-medium text-lg md:text-xl dark-gray ">
        {title}
      </span>

      <div className="sm:w-[200px] pl-3  py-3 flex ">
        <img src={icon} alt={alt} width="60px" height="60px" />
        <div className="flex flex-col px-5">
          <span className="text-lg md:text-xl font-medium md:font-semibold dark-gray">
            {subTitle}
          </span>
          <span className="text-sm md:text-lg font-medium dark-gray ">
            {progressbarValue}%
          </span>
          <span className="sm:w-[200px]">
            <Progress
              percent={progressbarValue}
              showInfo={false}
              strokeColor={progressbarColor}
            />
          </span>
          <span className="text-sm font-medium light-gray">{content}</span>
          <span></span>
        </div>
      </div>
    </div>
  );
};
