import { DashboardCharts } from '../../../components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/charts/DashboardCharts',
  component: DashboardCharts,
} as ComponentMeta<typeof DashboardCharts>

const Template: ComponentStory<typeof DashboardCharts> = (args) => <DashboardCharts {...args} />

export const DashboardChart = Template.bind({});
DashboardChart.args = {
  height: 65,
  percent: 0.3,
  bgColor: "#ABAFB1",
  barColor: '#363565',
  memoryUsed: "45.5",
  memoryFree: "55.5",
  heading: "System Storage",
  usedSpace: "GB Used",
  freeSpace: "GB Free"
}