import { Gauge } from "@ant-design/plots";
import { Row } from "antd/es/grid";
import { FC } from "react";
import { InformationIcon } from "../../../assets/images";
import { BoxWrapper } from "../../BoxWrapper/BoxWrapper";

export const GaugePlot: FC<{ style?: any }> = (props) => {
  const { style } = props;
  const config: any = {
    percent: 0.75,
    range: {
      ticks: [1 / 3, 2 / 3, 1],
      color: ["#363565", "#9BD5E8", "#ABAFB1"],
    },
    startAngle: Math.PI,
    endAngle: 2 * Math.PI,
    indicator: false,
    legend: true,
    statistic: {
      title: {
        offsetY: -36,
        style: {
          fontSize: "36px",
          color: "#4B535E",
        },
        formatter: () =>
          `<p style={{top:"-200 !important"}} class="text-teriary-color font-medium text-[44px] leading-[46px] mt-[-5px]">${966}</p>`,
      },
      content: {
        style: {
          fontSize: "36px",
          lineHeight: "36px",
        },
        formatter: () =>
          `<p class="text-secondary-color text-xs mt-[5px]">Total Issues</p>`,
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl p-5 wrapper-shadow">
      <Row align="middle" justify='space-between'>
        <span className="font-semibold text-[20px] leading-[28px] ">
          Issues
        </span>
        <InformationIcon />
      </Row>
      <Gauge className="gauge-chart" style={style} {...config} />
    </div>
  );
};
