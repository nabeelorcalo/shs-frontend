import { RadialBar } from "@ant-design/plots";
import Loader from "../../Loader";
import { memo } from "react";

const InternshipSummaryChar = (props: any) => {
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
    internshipsSummeryGraph,
    loading,
  } = props;

  const config: any = {
    data: internshipsSummeryGraph?.data ?? [],
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
    annotations: [
      {
        type: "html",
        position: ["50%", "50%"],
        html: () => {
          return `<div style="transform:translate(-50%,-60%)">
          <p class="text-center text-base sm:text-[30px] sm:leading-[40px]">${internshipsSummeryGraph?.totalInternships ?? 0
            }<p/>
          <p class="text-center text-primary-color text-xs sm:text-base">${"Internships"}<p/>
        </div>`;
        },
      },
    ],
    barStyle: barStyle,
    intervalPadding: intervalPadding,
    xAxis: xAxis,
  };

  return (
    <div className="bg-white rounded-2xl p-5 wrapper-shadow">
      {heading && <p className="text-secondary-color font-medium text-xl mb-4">{heading}</p>}
      {loading ? (
        <Loader />
      ) : (
        <RadialBar
          style={{ height: height ?? "300px", marginTop: "-15px" }}
          tooltip={false}
          {...config}
          className="transition-from-right"
        />
      )}
    </div>
  );
};

export const InternshipSummaryChart = memo(InternshipSummaryChar,
  (prevProps, nextProps) => prevProps?.loading === nextProps?.loading
)  