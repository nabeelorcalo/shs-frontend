import { Column } from "@ant-design/plots";
import { useState } from "react";
import { BoxWrapper } from "../../../components";
import { GrievanceStatsData } from "./GrievanceStatsData";

export const GrievanceStats = (props: any) => {
  const {
    statsHeading,
    xField,
    yField,
    isGroup = true,
    isStack = true,
    seriesField,
    groupField = "month",
    color = ["#9BD5E8", "#F08D97", "#78DAAC", "#FFC15D"],
    legend = {
      layout: "horizontal",
      position: "top-right",
    },
    data,
  } = props;
  // const [data] = useState(GrievanceStatsData);

  const config: any = {
    data,
    xField: xField,
    yField: yField,
    isGroup: isGroup,
    isStack: isStack,
    seriesField: seriesField,
    groupField: groupField,
    color: color,
    legend: legend,
  };
  return (
    // <BoxWrapper>
    <div>
      {statsHeading && <p className="text-secondary-color font-medium text-xl">{statsHeading}</p>}
      <Column {...config} columnWidthRatio={0.3} />
    </div>
    // </BoxWrapper>
  );
};
