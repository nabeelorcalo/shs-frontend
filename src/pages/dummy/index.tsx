import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Mix, G2 } from '@ant-design/plots';
import gdata from './data';

const Graph = () => {
  const [data, setData] = useState(gdata);

  useEffect(() => {
  }, []);

  G2.registerInteraction('custom-association-filter', {
    showEnable: [
      {
        trigger: 'element:mouseenter',
        action: 'cursor:pointer',
      },
      {
        trigger: 'element:mouseleave',
        action: 'cursor:default',
      },
    ],
    start: [
      {
        trigger: 'element:click',
        action: (context: any) => {
          const { view, event } = context; // 获取第二个 view
          const view1 = view.parent.views[1];
          view1.filter('area', (d: any) => d === event.data?.data.area);
          view1.render(true);
        },
      },
    ],
    end: [
      {
        trigger: 'element:dblclick',
        action: (context: any) => {
          const { view } = context; // 获取第二个 view

          const view1 = view.parent.views[1];
          view1.filter('area', null);
          view1.render(true);
        },
      },
    ],
  });
  if (!Object.keys(data).length) {
    return null;
  }
  const config = {
    tooltip: false,
    plots: [
      {
        type: 'area',
        yAxis: {
          // other yAxis options
          formatter: (value: any) => `${(value * 100).toFixed(0)}%`,
        },
        region: {
          start: {
            x: 0,
            y: 0.5,
          },
          end: {
            x: 1,
            y: 0.95,
          },
        },
        options: {
          data: data,
          xField: 'month',
          yField: 'value',
          seriesField: 'area',
          line: {},
          point: {
            style: {
              r: 2.5,
            },
          },
          meta: {
            month: {
              range: [0, 1],
            },
          },
          smooth: true,
          tooltip: {
            showCrosshairs: true,
            shared: true,
          },
        },
      },
    ],
  };

  return <Mix {...config} />;
};


export default Graph