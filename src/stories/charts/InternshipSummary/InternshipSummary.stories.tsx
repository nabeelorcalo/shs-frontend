import { InternshipSummaryChart } from '../../../components/ChartsOfGraphs/intershipSummaryChart/internshipSummaryChart';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Components/charts/InternshipSummaryChart',
    component: InternshipSummaryChart,
} as ComponentMeta<typeof InternshipSummaryChart>

const Template: ComponentStory<typeof InternshipSummaryChart> = (args) => <InternshipSummaryChart {...args} />

export const InternshipSummary = Template.bind({});

InternshipSummary.args = {
    xField: "name",
    yField: "star",
    autoFit: true,
    padding: "auto",
    maxAngle: 360,
    radius: 0.8,
    innerRadius: 0.37,
    colorField: "name",
    barStyle: { lineCap: "round", },
    intervalPadding: 9.1,
    xAxis: { label: null },
    heading: "IntershipSummary",
}