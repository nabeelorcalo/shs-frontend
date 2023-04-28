import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMap from "highcharts/modules/map";
import ukMapData from "@highcharts/map-collection/countries/gb/gb-all.geo.json";
import mapData from "./data";
import { Col, Row } from "antd";

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
    <>
      <HighchartsReact highcharts={Highcharts} constructorType={"mapChart"} options={options} />
      <Row justify='center' gutter={14}>
        <Col>
          <Row className="gap-1 items-center">
            <div className="w-4 h-4 primary-bg-color rounded-full"></div>
            <p className="text-xs leading-[18px]">Above 50%</p>
          </Row>
        </Col>
        <Col>
          <Row className="gap-1 items-center">
            <div className="w-4 h-4 sky-blue-color-bg rounded-full"></div>
            <p className="text-xs leading-[18px]">Below 50%</p>
          </Row>
        </Col>
      </Row>
    </>
  );
};
