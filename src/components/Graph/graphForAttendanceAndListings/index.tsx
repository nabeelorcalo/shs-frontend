import { Line } from "@ant-design/plots";
import constants from "../../../config/constants";
import { Typography } from "antd";
import Loader from "../../Loader";

interface GraphProps {
  title: string;
  graphName: string;
  level: any;
  action?: boolean;
  childrens?: any;
  styling?: any;
  attendanceData?: any;
  listingsData?: any;
  isLoading?: boolean
}

export const AttendanceAndListingGraph = (props: GraphProps) => {
  const { title, graphName, level, action = false, childrens, styling, attendanceData, listingsData, isLoading } = props;
  const data = graphName === constants.ATTENDANCE ? attendanceData ?? [] : listingsData ?? [];
  const maxValue = graphName === constants.ATTENDANCE ? 100 : 100;
  const yTicks = graphName === constants.ATTENDANCE ? 4 : 3;
  const colors: any =
    graphName === constants.ATTENDANCE ? ["#4A9D77", "#E94E5D", "#FFC15D"] : ["#4A9D77", "#E94E5D", "#FFC15D"];

  const attributeColors: any =
    graphName === constants.ATTENDANCE
      ? {
        Present: "#FFC15D",
        Absent: "#4A9D77",
        Leave: "#E94E5D",
      }
      : {
        Vacant: "#4A9D77",
        Occupied: "#E94E5D",
        Reserved: "#FFC15D",
      };

  const config: any = {
    data,
    xField: "month",
    yField: "value",
    seriesField: "status",
    smooth: true,
    color: colors,

    xAxis: {
      tickLine: null,
      label: {
        offset: 30,
      },
      line: {
        style: {
          stroke: "grey",
        },
      },
    },
    yAxis: {
      min: 0,
      max: maxValue,
      tickCount: yTicks,
      label: {
        formatter: (val: any) => `${val}%`,
      },
      grid: {
        visible: true,
        line: {
          style: {
            lineDash: [14, 10],
            stroke: "#D9DBE9",
          },
        },
      },
    },

    legend: {
      position: "top-right",
      marker: function (name: any) {
        return { symbol: "square", style: { fill: attributeColors[name], radius: 8 } };
      },
    },

    lineStyle: {
      lineWidth: 4,
      cursor: "pointer",
    },

    point: {
      size: 7,
      style: {
        lineWidth: 1,
        fillOpacity: 1,
      },
      shape: () => {
        return "circle";
      },
    },

    tooltip: {
      formatter: (props: any) => {
        let attributeName = props.status;
        let value = `${props.value}%`;

        return { name: attributeName, value: `${value}` };
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl p-5 wrapper-shadow attendance-overview ">
      <div className="flex flex-row">
        <Typography.Title level={level}>{title}</Typography.Title>
        {action && <div className="ml-auto">{childrens}</div>}
      </div>
      {
        isLoading ?
          <div className={`h-[${styling?.height}px]`}>
            <Loader />
          </div>
          :
          <Line style={styling} {...config} />
      }
    </div>
  );
};
