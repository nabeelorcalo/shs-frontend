import { MonthlyPerfomanceChart } from '../../../components/ChartsOfGraphs/monthly-perfomance-chart/MonthlyPerfomanceChart';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { perfomanceChart } from '../../../components/ChartsOfGraphs/monthly-perfomance-chart/MonthlyPerfomance';


export default {
  title: 'Components/charts/DashboardCharts',
  component: MonthlyPerfomanceChart,
} as ComponentMeta<typeof MonthlyPerfomanceChart>

const Template: ComponentStory<typeof MonthlyPerfomanceChart> = (args) => <MonthlyPerfomanceChart {...args} />

export const MonthlyPerfomance = Template.bind({});
MonthlyPerfomance.args = {
  XField: "city",
  YField: "value",
  seriesField: "type",
  isGroup: true,
  columnStyle: {
    radius: [20, 20, 0, 0]
  },
  color: ['#9BD5E8', '#F08D97', '#78DAAC'],
  marginRatio: ".5",
   heading: "kbkblb",
  columnWidthRatio: .2,
  textColor: "#4E4B66",
  fontSize: "20px",
  fontWeight: "500",
  data:  perfomanceChart 
}
