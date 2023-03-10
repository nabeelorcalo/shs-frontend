import { Progress } from "antd";
import "./ColorfullIconWithProgressbar.scss";
import icon from "../../assets/images/ColorfullIconsProgressbar/media.svg";
interface ColorfullIconsWithProgressbarProps {
  icon?: string;
  title: string;
  storage: string;
  alt?: string;
  progressbarValue: number;
  progressbarColor: string;
}
[];
export const ColorfullIconsWithProgressbar = (props: any) => {
  const { arraydata } = props;
  return (
    <>
      {arraydata.map((item: ColorfullIconsWithProgressbarProps, index: any) => {
        return (
          <div
            key={index}
            className="flex colorfull-icon-progress-bar w-full py-2"
          >
            <img src={item.icon} width="40px" />
            <div className="w-full pl-3 ">
              <div className="flex justify-between">
                <span className="font-normal text-sm content-title">
                  {item.title}
                </span>
                <span className="font-normal text-sm storage-value">
                  {item.storage}
                </span>
              </div>
              <span className="w-full pb-6">
                <Progress
                  percent={item.progressbarValue}
                  showInfo={false}
                  strokeColor={item.progressbarColor}
                />
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
};
