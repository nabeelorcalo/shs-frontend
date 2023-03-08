import { Progress } from "antd";
import "./HorizontalLineCard.scss";
import { theme } from "../../theme";
interface HorizonalLineCardProps {
  icon?: string;
  title: string;
  subTitle: string;
  content: string;
  alt?: string;
  progressbarValue: number;
  progressbarColor: string;
  arraydata: any;
}
export const HorizonalLineCard = (props: any) => {
  const { arraydata } = props;
  return (
    <>
      {arraydata.map((item: HorizonalLineCardProps, index: any) => {
        return (
          <div className="horizontal-line-card flex flex-col rounded-2xl p-5 max-w-[462px]   ">
            <span className=" md:font-medium text-lg md:text-xl dark-gray ">
              {item.title}
            </span>

            <div className="sm:w-[200px] pl-3  py-3 flex ">
              <img src={item.icon} alt={item.alt} width="60px" height="60px" />
              <div className="flex flex-col px-5">
                <span className="text-lg md:text-xl font-medium md:font-semibold dark-gray">
                  {item.subTitle}
                </span>
                <span className="text-sm md:text-lg font-medium dark-gray ">
                  {item.progressbarValue}%
                </span>
                <span className="sm:w-[200px]">
                  <Progress
                    percent={item.progressbarValue}
                    showInfo={false}
                    strokeColor={item.progressbarColor}
                  />
                </span>
                <span className="text-sm font-medium light-gray">
                  {item.content}
                </span>
                <span></span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};