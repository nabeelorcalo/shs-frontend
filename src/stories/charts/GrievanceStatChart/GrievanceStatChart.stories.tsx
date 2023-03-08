import { GrievanceStats } from "../../../components/ChartsOfGraphs/grievanceStats/grievanceStats";
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/charts/GrievanceStats',
  component: GrievanceStats,
} as ComponentMeta<typeof GrievanceStats>

const Template: ComponentStory<typeof GrievanceStats> = (args) => <GrievanceStats {...args} />

export const GrievanceStatChart = Template.bind({});

GrievanceStatChart.args = {
  statsHeading: "",
  xField: 'product_type',
  yField: 'order_amt',
  isGroup: true,
  isStack: true,
  seriesField: 'product_sub_type',
  groupField: 'month',
  color: ["#9BD5E8", "#F08D97", "#78DAAC", "#FFC15D"],
  legend: {
    layout: 'horizontal',
    position: 'top-right'
  }
}