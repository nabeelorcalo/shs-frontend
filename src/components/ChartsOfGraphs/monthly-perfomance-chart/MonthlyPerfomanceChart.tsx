import { useState } from "react";
import { Column } from "@ant-design/plots";
import { BoxWrapper } from "../../../components";
import { perfomanceChart } from "./MonthlyPerfomance";

export const MonthlyPerfomanceChart = (props: any) => {
  const {
    XField = "city",
    YField = "value",
    seriesField = "type",
    isGroup = true,
    columnStyle = { radius: [20, 20, 0, 0] },
    color = ["#9BD5E8", "#F08D97", "#78DAAC"],
    marginRatio = ".5",
    heading,
    columnWidthRatio = 0.9,
    textColor = "#4E4B66",
    fontSize = "20px",
    fontWeight = "600",
    data = { perfomanceChart },
    children = <></>,
    height,
    style = { height: height ? height : "235px" },
  } = props;

  // const [chartData] = useState(data);
  const config: any = {
    data: data,
    xField: XField,
    yField: YField,
    seriesField: seriesField,
    // yAxis: {
    //   label: {
    //     formatter: (v:any) => `${v/100} %`
    //   }
    // },
    isGroup: isGroup,
    columnStyle: columnStyle,
    columnWidthRatio: columnWidthRatio,
    color: color,
    legend: {
      layout: "horizontal",
      position: "top-right",
    },
  };
  return (
    <>
      {heading && (
        <div className="flex items-center">
          <p
            style={{
              fontSize: fontSize,
              color: textColor,
              fontWeight: fontWeight,
            }}
          >
            {heading}
          </p>
          {children}
        </div>
      )}
      <Column style={style} {...config} marginRatio={marginRatio} />
    </>
  );
};
