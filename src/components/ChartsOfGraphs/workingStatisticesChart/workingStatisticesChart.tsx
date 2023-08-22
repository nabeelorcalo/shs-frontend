import { Column } from "@ant-design/plots";
import Loader from "../../Loader";

const Colors: any = {
  "Under Time": "#F3B8B7",
  Overtime: "#A9E2B8",
  Shift: "#94D5EA",
  Holiday: "#E8ECED",
};

export const WorkingStatisticesChart = (props: any) => {
  const {
    styling,
    isStack = true,
    xField = "days",
    yField = "value",
    seriesField = "type",
    heading,
    legend = { layout: "horizontal", position: "top-right" },
    isLoading
  } = props;

  const config: any = {
    // data,
    data: props?.internWorkingStats ?? [],
    isStack: isStack,
    xField: xField,
    yField: yField,
    seriesField: seriesField,
    legend: legend,

    color: ({ type }: any) => {
      return Colors[type] ?? "red";
    },
  };
  return (
    <div className="bg-white rounded-2xl p-5 wrapper-shadow">
      {heading && <p className="text-xl font-medium text-secondary-color">{heading}</p>}
      {
        isLoading ?<div className="h-[275px]"> <Loader /></div> :
          <Column {...config} style={styling} maxColumnWidth={50} />
      }
    </div>
  );
};
