import { OverAllPerfomance } from '../../../components'; 
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { OverAllRPerfomanceData } from '../../../components/ChartsOfGraphs/overAll-perfomance-charts/perfomance';

export default {
    title: 'Components/charts/OverAllPerfomance',
    component: OverAllPerfomance,
} as ComponentMeta<typeof OverAllPerfomance>

const Template: ComponentStory<typeof OverAllPerfomance> = (args) => <OverAllPerfomance {...args} />

export const MonthlyPerfomance = Template.bind({});

MonthlyPerfomance.args = {
    trailColor: "#E6F4F9",
    strokeWidth: 10,
    width: 140,
    type: "circle",
    heading: "",
    data: OverAllRPerfomanceData,

}