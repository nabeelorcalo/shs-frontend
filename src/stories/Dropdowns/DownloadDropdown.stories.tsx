import { DropDown } from "../../components";
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Components/DropDown/DownloadDropdown',
    component: DropDown,
} as ComponentMeta<typeof DropDown>

const Template: ComponentStory<typeof DropDown> = (args) => <DropDown {...args} />

export const DownloadIcon = Template.bind({});
DownloadIcon.args = {
    requiredDownloadIcon: true,
    options: ['pdf', 'excel'],
    value: '',
    setValue: () => { }
}