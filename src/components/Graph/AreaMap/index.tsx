import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMap from 'highcharts/modules/map';
import ukMapData from '@highcharts/map-collection/countries/gb/gb-all.geo.json';
import mapData from './data';

HighchartsMap(Highcharts); // Initialize the map module

const options = {
  chart: {
    map: ukMapData,
    height: 500
  },

  title: {
    text: 'UK Map'
  },

  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: 'bottom'
    }
  },

  colorAxis: {
    min: 0
  },

  series: [{
    name: 'Population',

    data: mapData,

    tooltip: {
      pointFormat: '{point.name}: {point.value}'
    },

    states: {
      hover: {
        color: 'red'
      }
    },
    
    dataLabels: {
      enabled: false,
      format: '{point.name}'
    }
  }]
};

const UKMapChart = () => {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'mapChart'}
      options={options}
    />
  );
};

export default UKMapChart;
