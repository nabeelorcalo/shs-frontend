import ReactEcharts from "echarts-for-react";
export const FunnelChart = () => {
  const option: any = {
    title: {
      text: "Devices",
    },
    color: ["#363565", "#6985A7", "#9BD5E8"],
    legend: {
      bottom: 0,
      data: ["Mobile", "Tablet", "Desktop"],
    },
    series: [
      {
        name: "Device",
        type: "funnel",
        left: "0%",
        top: 50,
        bottom: 60,
        width: "100%",
        min: 0,
        borderRadius: 10,
        max: 100,
        minSize: "0%",
        maxSize: "150%",
        sort: "ascending",
        gap: 2,
        label: {
          show: true,
          position: "inside",
          color: "white",
          fontSize: 14,
          fontWeight: 500,
          formatter: (value: any) => {
            return `${value.value} %`;
          },
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: "solid",
          },
        },
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 1,
        },
        emphasis: {
          label: {
            fontSize: 20,
          },
        },
        data: [
          { value: 60, name: "Mobile" },
          { value: 40, name: "Tablet" },
          { value: 20, name: "Desktop" },
        ],
      },
    ],
  };
  return <ReactEcharts style={{ minHeight: 404, height: "100%" }} option={option} />;
};