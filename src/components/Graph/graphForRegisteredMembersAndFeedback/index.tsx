import React, { useState, useEffect, FC } from "react";
import { DualAxes } from "@ant-design/plots";
import { registerMemeberData, resolutionFeedbackData } from "./data";
import { IconLikeShapes } from "../../../assets/images";
import constants from "../../../config/constants";

export const RegisterMemberAndFeddbackGraph: FC<{
  graphName: string;
  title?:string;
  styling?: any;
  graphData?: any
}> = (props) => {
  const { graphName, styling,title, graphData } = props;
  const data =
    graphName === constants.REGISTER_MEMBERS
      ? graphData
      : resolutionFeedbackData;
  const yFields =
    graphName === constants.REGISTER_MEMBERS
      ? ["Active", "Inactive"]
      : ["Positive", "Negative"];

  const config: any = {
    data: [data, data],
    xField: "month",
    yField: yFields,

    legend: {
      position: "top-right",
      marker: { symbol: "square", radius: 8 },
      // legendMarker
    },

    xAxis: {
      label: {
        offset: 30,
      },
      grid: {
        visible: true,
        line: {
          style: {
            stroke: "#D9DBE9",
          },
        },
      },
      line: {
        style: {
          stroke: "white",
        },
      },
      tickLine: null,
    },

    yAxis: [
      {
        min: -2,
        max: 102,
        tickCount: 3,
        label: {
          formatter: (val: any) => `${val}%`,
        },
      },
      {
        min: -2,
        max: 102,
        tickCount: 3,
        label: null,
      },
    ],

    geometryOptions: [
      {
        geometry: "line",
        smooth: true,
        color: "#4A9D77",
        lineStyle: {
          lineWidth: 4,
          opacity: 0.5,
        },
        point: {
          shape: "circle",
          size: 5,
          style: {
            stroke: "#4A9D77",
            fill: "#4A9D77",
          },
        },
      },
      {
        geometry: "line",
        smooth: true,
        color: "#E95060",
        lineStyle: {
          lineWidth: 4,
          opacity: 0.5,
        },
        point: {
          shape: "circle",
          size: 5,
          style: {
            stroke: "#E94E5D",
            fill: "#E94E5D",
          },
        },
      },
    ],

    tooltip: {
      formatter: (props: any) => {
        let attributeName, value;

        if (graphName === constants.REGISTER_MEMBERS) {
          attributeName = props.hasOwnProperty("Active")
            ? "Active"
            : "Inactive";
          value = attributeName === "Active" ? props.Active : props.Inactive;
        } else {
          attributeName = props.hasOwnProperty("Positive")
            ? "Positive"
            : "Negative";
          value =
            attributeName === "Positive" ? props.Positive : props.Negative;
        }

        return { name: attributeName, value: `${value}%` };
      },
    },
  };

  return (
    <div className="relative">
      <p className="font-medium text--[20px] leading-[28px] text-secondary-color">
        {title}
      </p>
      <DualAxes style={styling} {...config} />
    </div>
  );
};
