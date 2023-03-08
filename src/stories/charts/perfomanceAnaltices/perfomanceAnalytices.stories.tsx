import { MonthlyPerfomanceChart } from '../../../components/ChartsOfGraphs/monthly-perfomance-chart/MonthlyPerfomanceChart';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { OverAllRPerfomanceData } from '../../../components/ChartsOfGraphs/overAll-perfomance-charts/perfomance';
import { perfomanceChart } from '../../../components/ChartsOfGraphs/monthly-perfomance-chart/MonthlyPerfomance';

export default {
    title: 'Components/charts/MonthlyPerfomanceChart',
    component: MonthlyPerfomanceChart,
} as ComponentMeta<typeof MonthlyPerfomanceChart>

const Template: ComponentStory<typeof MonthlyPerfomanceChart> = (args) => <MonthlyPerfomanceChart {...args} />

export const PerfomanceAnalytices = Template.bind({});

PerfomanceAnalytices.args = {
    heading: "Perfomance Analytics",
    data: perfomanceChart

}