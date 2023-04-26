import { Column } from "@ant-design/plots";
import { useEffect, useState } from "react";
import { BoxWrapper } from "../../../components";
import { MonthChanger } from "../../MonthChanger";
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
    columnWidthRatio = 0.2,
    textColor = "#4E4B66",
    fontSize = "20px",
    fontWeight = "600",
    data = { perfomanceChart },
    children = <></>,
    style={height:'235px'}
  } = props;

  const [chartData] = useState(data);
  const config: any = {
    data: chartData,
    xField: XField,
    yField: YField,
    seriesField: seriesField,
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
    <BoxWrapper className="attendance-department">
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
    </BoxWrapper>
  );
};
