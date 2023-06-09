import { Pie } from "@ant-design/plots";
import { useState } from "react";
import { BoxWrapper } from "../../../components";
import { TimeSheetCategoriesData } from "./timeSheet";
import dayjs from "dayjs";

export const TimesheetCategories = (props: any) => {
  const {
    appendPadding = 10,
    angleField = "value",
    colorField = "type",
    radius = 1,
    innerRadius = 0.7,
    label = {
      type: "inner",
      offset: "-50%",
      content: "",
      style: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: 600,
      },
    },
    statistic = {
      title: false,
      content: {
        content: dayjs(props?.totalTime, "HH:mm").format("H[h] m[m]"),
      },
    },
    color = ["#E76864", "#88DCC6", "#5D89F4", "#FFC200"],
    legend = {
      layout: "vertical",
      position: "right-top",
      display: "none",
    },
    heading,
    chartData = TimeSheetCategoriesData,
    height = 100,
    width = 100,
    categoriesData,
  } = props;

  const [data] = useState(chartData);

  const config: any = {
    appendPadding: appendPadding,
    data: categoriesData,
    angleField: angleField,
    colorField: colorField,
    radius: radius,
    innerRadius: innerRadius,
    label: label,
    statistic: statistic,
    color: color,
    legend: legend,
    height,
    width,
  };
  return (
    <BoxWrapper>
      {heading && <p className="text-secondary-color font-medium text-xl">{heading}</p>}
      <Pie {...config} />
    </BoxWrapper>
  );
};
