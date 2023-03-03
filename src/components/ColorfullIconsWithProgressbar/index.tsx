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
            className="flex max-w-[250px]  colorfull-icon-progress-bar"
          >
            <img src={item.icon} width="40px" />
            <div className="sm:w-[200px] pl-3 ">
              <div className="flex justify-between">
                <span className="font-normal text-sm title">{item.title}</span>
                <span className="font-normal text-sm storage">
                  {item.storage}
                </span>
              </div>

              <span className="sm:w-[200px]">
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
