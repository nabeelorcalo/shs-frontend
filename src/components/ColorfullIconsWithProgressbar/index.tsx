import { Progress } from "antd";

interface ColorfullIconsWithProgressbarProps {
  icon?: string;
  title?: string;
  storage?: string;
  alt?: string;
  progressbarValue?:number
  progressbarColor?:string
}
export const ColorfullIconsWithProgressbar = ({
  icon,
  title,
  storage,
  alt,
  progressbarValue,
  progressbarColor
}: ColorfullIconsWithProgressbarProps) => {
  return (
    <div className="flex max-w-[250px]   ">
      <img src={icon} alt={alt} width="40px" />
      <div className="sm:w-[200px] pl-3 ">
        <div className="flex justify-between">
          <span className="font-normal text-sm" style={{ color: "#4E4B66" }}>
            {title}
          </span>
          <span className="font-normal text-sm" style={{ color: "#A0A3BD" }}>
            {storage}
          </span>
        </div>

        <span className="sm:w-[200px]"><Progress percent={progressbarValue} showInfo={false} strokeColor={progressbarColor} /></span>
      </div>
    </div>
  );
};
