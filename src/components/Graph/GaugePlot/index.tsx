import { Gauge } from "@ant-design/plots";
import { Row } from "antd/es/grid";
import { FC } from "react";
import { InformationIcon } from "../../../assets/images";
import { BoxWrapper } from "../../../components";
import "./style.scss";

export const GaugePlot: FC<{ style?: any; dataArray?: any[]; total?: string | number }> = (props) => {
  const { style, dataArray, total } = props;
  const styleObject: any = {
    dot: { "--dot-color": "#363565" },
    dot_progress: { "--dot-color": "#9BD5E8" },
    dot_pending: { "--dot-color": "#ABAFB1" },
  };
  const config: any = {
    percent: 0.75,
    range: {
      ticks: dataArray || [],
      color: ["#363565", "#9BD5E8", "#ABAFB1"],
    },
    startAngle: Math.PI,
    endAngle: 2 * Math.PI,
    indicator: false,
    legend: { layout: "horizontal", position: "top-right" },
    statistic: {
      title: {
        offsetY: -36,
        style: {
          fontSize: "36px",
          color: "#4B535E",
        },
        formatter: () =>
          `<p style={{top:"-200 !important"}} class="text-teriary-color font-medium text-[44px] leading-[46px] mt-[-5px]">${total}</p>`,
      },
      content: {
        style: {
          fontSize: "36px",
          lineHeight: "36px",
        },
        formatter: () => `<p class="text-secondary-color text-xs mt-[5px]">Total Issues</p>`,
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl p-5 wrapper-shadow">
      <Row align="middle" justify="space-between">
        <span className="font-semibold text-[20px] leading-[28px] ">Issues</span>
        <InformationIcon />
      </Row>
      <Gauge className="gauge-chart" style={style} {...config} />
      <div className="flex justify-center">
        <div className="flex justify-between self-center gap-5">
          <span className="dot" style={styleObject.dot}>
            Resolved
          </span>
          <span className="dot" style={styleObject.dot_progress}>
            In Progress
          </span>
          <span className="dot" style={styleObject?.dot_pending}>
            Pending
          </span>
        </div>
      </div>
    </div>
  );
};
