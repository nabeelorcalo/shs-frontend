import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMap from "highcharts/modules/map";
import ukMapData from "@highcharts/map-collection/countries/gb/gb-all.geo.json";
import mapData from "./data";

HighchartsMap(Highcharts); // Initialize the map module

const options = {
  chart: {
    map: ukMapData,
    height: 500,
  },

  title: {
    text: "",
  },

  mapNavigation: {
    enabled: false,
  },
  legend: { enabled: false },
  credits: {
    enabled: false,
  },
  colorAxis: {
    min: 0,
  },

  series: [
    {
      name: "Population",

      data: mapData,

      tooltip: {
        pointFormat: "{point.name}: {point.value}",
      },

      // states: {
      //   hover: {
      //     color: 'red'
      //   }
      // },

      dataLabels: {
        enabled: false,
        format: "{point.name}",
      },
    },
  ],
};

export const UKMapChart = () => {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"mapChart"}
      options={options}
    />
  );
};
