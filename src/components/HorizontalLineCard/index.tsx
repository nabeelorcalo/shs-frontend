import { Progress } from "antd";
import { BoxWrapper } from "../BoxWrapper/BoxWrapper";
import "./style.scss";

interface HorizonalLineCardProps {
  icon?: string;
  title: string;
  lastAchivmentTime:string;
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
          <BoxWrapper className="horizontal-line-card flex flex-col rounded-2xl  p-2 md:p-5 my-3  ">
            <div className="flex items-center justify-between flex-wrap">
              <span className=" md:font-medium text-lg md:text-xl dark-gray ">
                {item.title}
              </span>
              <span>{item.lastAchivmentTime}</span>
            </div>
            <div className=" md:pl-3  py-3 flex">
              <img src={item.icon} alt={item.alt} height="60px" />
              <div className="flex flex-col px-5 w-full">
                <span className="text-lg md:text-xl font-medium md:font-semibold dark-gray">
                  {item.subTitle}
                </span>
                <span className="text-sm md:text-lg font-medium dark-gray ">
                  {item.progressbarValue}%
                </span>
                <span className="w-full">
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
          </BoxWrapper>
        );
      })}
    </>
  );
};
