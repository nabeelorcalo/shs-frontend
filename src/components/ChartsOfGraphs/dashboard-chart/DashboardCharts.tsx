import { Progress } from "@ant-design/plots";
import { InformationIcon } from "../../../assets/images";
import { BoxWrapper } from "../../BoxWrapper/BoxWrapper";

export const DashboardCharts = (props: any) => {
  const {
    height = 65,
    percent = 0.3,
    bgColor = "#ABAFB1",
    barColor = "#363565",
    memoryUsed = "45.5",
    memoryFree = "55.5",
    heading,
    usedSpace,
    freeSpace,
  } = props;
  const config = {
    height: height,
    autoFit: false,
    percent: percent,
    color: [barColor, bgColor],
  };
  return (
    <>
      <div className="bg-white rounded-2xl p-5 wrapper-shadow" >
        <div className="flex justify-between">
          {heading && (
            <span className="text-secondary-color text-base font-medium">
              {heading}
            </span>
          )}
          <InformationIcon />
        </div>
        <div className="flex justify-between mt-7">
          {usedSpace && (
            <span className="text-base font-medium ">
              {memoryUsed} {usedSpace}
            </span>
          )}
          {freeSpace && (
            <span className="text-base font-medium ">
              {memoryFree} {freeSpace}
            </span>
          )}
        </div>
        <div
          style={{
            borderRadius: "28%",
            overflow: "hidden",
            marginTop: "-10px",
            marginBottom:-13
          }}
        >
          <Progress {...config} />
        </div>
      </div>
    </>
  );
};
