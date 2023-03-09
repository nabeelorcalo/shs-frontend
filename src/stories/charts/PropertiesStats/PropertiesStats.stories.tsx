import { MonthlyPerfomanceChart } from "../../../components";
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AttendanceDepartmentData } from "../../../components/ChartsOfGraphs/chartsMockData/AttendanceDepartmentData";
import { propertiesStatsData } from "../../../components/ChartsOfGraphs/chartsMockData/propertiesStats";

export default {
    title: 'Components/charts/MonthlyPerfomanceChart',
    component: MonthlyPerfomanceChart,
} as ComponentMeta<typeof MonthlyPerfomanceChart>;

const Template: ComponentStory<typeof MonthlyPerfomanceChart> = (args) => <MonthlyPerfomanceChart {...args} />

export const PropertiesStats = Template.bind({});

PropertiesStats.args = {
    heading:"Properties Stats",
     color:['#4A9D77', '#E95060', '#FFC15D'],
     data:propertiesStatsData
}