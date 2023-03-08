import { WorkingStatisticesChart } from '../../../components/ChartsOfGraphs/workingStatisticesChart/workingStatisticesChart';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { OverAllRPerfomanceData } from '../../../components/ChartsOfGraphs/overAll-perfomance-charts/perfomance';

export default {
  title: 'Components/charts/WorkingStatisticesChart',
  component: WorkingStatisticesChart,
} as ComponentMeta<typeof WorkingStatisticesChart>

const Template: ComponentStory<typeof WorkingStatisticesChart> = (args) => <WorkingStatisticesChart {...args} />

export const WorkingStatistices = Template.bind({});

WorkingStatistices.args = {
  isStack: true,
  xField: "days",
  yField: "value",
  seriesField: "type",
  legend: { layout: "horizontal", position: 'top-right' },
  heading: "Working Statistices"

}