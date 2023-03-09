import { TimesheetCategories } from '../../../components/ChartsOfGraphs/timesheetCategories/timesheetCategories';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { OverAllRPerfomanceData } from '../../../components/ChartsOfGraphs/overAll-perfomance-charts/perfomance';

export default {
  title: 'Components/charts/TimesheetCategories',
  component: TimesheetCategories,
} as ComponentMeta<typeof TimesheetCategories>

const Template: ComponentStory<typeof TimesheetCategories> = (args) => <TimesheetCategories {...args} />

export const Categories = Template.bind({});

Categories.args = {
  appendPadding: 10,
  angleField: 'value',
  colorField: 'type',
  radius: 1,
  innerRadius: .7,
  label: {
    type: 'inner',
    offset: '-50%',
    content: '',
    style: {
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 600
    },
  },
  statistic: {
    title: false,
    content: {
      content: '7h 10m',
    },
  },
  color: ['#E76864', '#88DCC6', '#5D89F4', '#FFC200'],
  legend: {
    layout: 'vertical',
    position: 'left-top'
  },
  heading: "Timesheet Categories",
}