import { Progress } from "antd";
import {
  Gallery,
  Doc,
  Video,
  File,
} from "../../assets/images";
import "./style.scss";



interface ColorfullIconsWithProgressbarProps {
  icon?: string;
  title: string;
  media: string;
  alt?: string;
  progressbarValue: number;
  progressbarColor: string;
}[];

export const ColorfullIconsWithProgressbar = (props: any) => {
  const { storage } = props;

  const storageData: any = [
    {
      icon: Gallery,
      progressbarColor: "#4CA4FD",
      progressbarValue: parseFloat(storage?.media.match(/\d+\.\d+/)[0]),
      media: storage?.media,
      title: "Media",
    },
    {
      icon: Video,
      progressbarColor: "#E96F7C",
      progressbarValue: parseFloat(storage?.video.match(/\d+\.\d+/)[0]),
      media: storage?.video,
      title: "Video",
    },
    {
      icon: Doc,
      progressbarColor: "#FFC15D",
      progressbarValue: parseFloat(storage?.document.match(/\d+\.\d+/)[0]),
      media: storage?.document,
      title: "Document",
    },
    {
      icon: File,
      progressbarColor: "#6AAD8E",
      progressbarValue: parseFloat(storage?.otherFiles?.match(/\d+\.\d+/)[0]),
      media: storage?.otherFiles,
      title: "Other Files",
    },
  ];
  return (
    <>
      {storageData.map((item: ColorfullIconsWithProgressbarProps, index: any) => {
        return (
          <div
            key={index}
            className="flex colorfull-icon-progress-bar w-full py-0.5"
          >
            <img src={item.icon} width="40px" />
            <div className="w-full pl-3 ">
              <div className="flex justify-between">
                <span className="font-normal text-sm content-title">
                  {item.title}
                </span>
                <span className="font-normal text-sm storage-value">
                  {item?.media}
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
