import React from "react";
import ReactEcharts from "echarts-for-react";
import data from './data';
import {
  FinanceIcon,
  RecreationIcon,
  RelationshipIcon,
  HealthIcon,
  EducationIcon,
  DevelopmentIcon,
  FamilyIcon,
  SocialLifeIcon
} from "../../../assets/images";

const Graph = ({ monthName }: any) => {
  const assessmentsName = [
    { name: "Finance", color: "#D36DF6", secondaryColor: '#D36DF61A' },
    { name: "Relationship", color: "#6986BF", secondaryColor: '#6986BF1A' },
    { name: "Health", color: "#92D5E4", secondaryColor: '#A4DBE81A' },
    { name: "Education", color: "#70C9B7", secondaryColor: '#DBFDF6' },
    { name: "Development", color: "#FFD817", secondaryColor: '#FFD8171A' },
    { name: "Family", color: "#4F8DFF", secondaryColor: '#4F8DFF1A' },
    { name: "Social Life", color: "#FD7D5C", secondaryColor: '#FB45161A' },
    { name: "Recreation", color: "#FF93AD", secondaryColor: '#FF93AD1A' },
  ];

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Finance':
        return FinanceIcon;
      case 'Relationship':
        return RelationshipIcon;
      case 'Health':
        return HealthIcon;
      case 'Education':
        return EducationIcon;
      case 'Development':
        return DevelopmentIcon;
      case 'Family':
        return FamilyIcon;
      case 'Social Life':
        return SocialLifeIcon;
      case 'Recreation':
        return RecreationIcon;
      default:
        return <></>;
    }
  }

  const setGraphDataSetting = () => {
    const filteredArray = data.filter(obj => obj.month === monthName);
    const arr: any = [];

    filteredArray.map(function (item) {
      let obj = assessmentsName.find(o => o.name === item.name);
      const name = item.name;
      const value = item.value;
      const color = obj?.color;
      const secondaryColor = obj?.secondaryColor;

      arr.push({
        value: 1,
        itemStyle: {
          color: color
        },
        children: [
          {
            value: 1,
            itemStyle: {
              color: value > 1 ? color : secondaryColor
            },
            children: [
              {
                value: 1,
                itemStyle: {
                  color: value > 2 ? color : secondaryColor
                },
                children: [
                  {
                    value: 1,
                    itemStyle: {
                      color: value > 3 ? color : secondaryColor
                    },
                    children: [
                      {
                        value: 1,
                        itemStyle: {
                          color: value > 4 ? color : secondaryColor
                        },
                        children: [
                          {
                            value: 1,
                            label: {
                              formatter: [
                                `{a|}`
                              ].join('\n'),
                              backgroundColor: '#FFFFFF',
                              padding: 6,
                              borderRadius: 50,
                              rich: {
                                a: {
                                  backgroundColor: {
                                    image: renderIcon(name)
                                  },
                                  height: 30,
                                  width: 30,
                                },
                              }
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      });
    });

    return arr;
  }

  const option = {
    silent: true,

    series: [
      {
        radius: ['22%', '100%'],
        type: 'sunburst',
        sort: undefined,
        emphasis: {
          focus: 'ancestor'
        },
        data: setGraphDataSetting(),
        levels: [
          {},
          {},
          {},
          {},
          {},
          {},
          {
            r0: '72%',
            r: '78%',
            label: {
              position: 'outside',
              padding: 0,
              silent: false
            },
            itemStyle: {
              borderWidth: 0,
              color: 'transparent'
            }
          }
        ]
      }
    ]
  };

  return <ReactEcharts
    option={option}
    opts={{ renderer: "svg" }}
    style={{ height: '600px' }}
  />;
}
export default Graph;