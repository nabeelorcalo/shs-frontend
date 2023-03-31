import { useState } from "react";
import { InterShipData } from "./internShipData";
import { RadialBar } from "@ant-design/plots";

export const InternshipSummaryChart = (props: any) => {
  const {
    xField = "name",
    yField = "star",
    autoFit = true,
    padding = "auto",
    maxAngle = 360,
    radius = 0.8,
    innerRadius = 0.37,
    colorField = "name",
    barStyle = { lineCap: "round" },
    intervalPadding = 9.1,
    xAxis = { label: null },
    heading,
    height,
  } = props;

  const [data] = useState(InterShipData);

  const config: any = {
    data,
    xField: xField,
    yField: yField,
    autoFit: autoFit,
    padding: padding,
    maxAngle: maxAngle,
    radius: radius,
    innerRadius: innerRadius,
    colorField: colorField,
    barBackground: {},
    color: ({ name }: any) => {
      if (name == "Close") {
        return "#A0A3BD";
      } else if (name == "Pending") {
        return "#FFC15E";
      } else if (name == "Draft") {
        return "#4783FF";
      } else if (name == "Active") {
        return " #4A9D77";
      }
      return "#ff93a7";
    },
    legend: {
      offsetY: 30,
      position: "right",
      show: true, // <== This is the only line causing the plot to not be drawn
      toggleDataSeries: true,
      itemMargin: {
        horizontal: 12,
      },
      fontSize: 18,
    },
    barStyle: barStyle,
    intervalPadding: intervalPadding,
    xAxis: xAxis,
  };
  return (
    <div className="bg-white rounded-2xl p-5 wrapper-shadow">
      {heading && (
        <p className="text-secondary-color font-medium text-xl">{heading}</p>
      )}
      <RadialBar
        style={{ height: height ?? "300px", marginTop: "-15px" }}
        tooltip={false}
        {...config}
        className="transition-from-right"
      />
    </div>
  );
};
