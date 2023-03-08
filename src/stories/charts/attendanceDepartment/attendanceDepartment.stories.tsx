import { MonthlyPerfomanceChart } from "../../../components";
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AttendanceDepartmentData } from "../../../components/ChartsOfGraphs/chartsMockData/AttendanceDepartmentData";

export default {
    title: 'Components/charts/MonthlyPerfomanceChart',
    component: MonthlyPerfomanceChart,
} as ComponentMeta<typeof MonthlyPerfomanceChart>

const Template: ComponentStory<typeof MonthlyPerfomanceChart> = (args) => <MonthlyPerfomanceChart {...args} />

export const AttendanceByDepartment = Template.bind({});

AttendanceByDepartment.args = {
    heading: "Attendance By department",
    columnWidthRatio: .5,
    columnStyle: { radius: [5, 5, 0, 0] },
    color: ['#4A9D77', '#E95060', '#FFC15D'],
    data: AttendanceDepartmentData
}