import { DropDown } from "../../components";
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Components/DropDown/DropDownWithStartAndEndIcon',
    component: DropDown,
} as ComponentMeta<typeof DropDown>

const Template: ComponentStory<typeof DropDown> = (args) => <DropDown {...args} />

export const DropDownWithStartIcon = Template.bind({});
DropDownWithStartIcon.args = {
    name: 'name',
    startIcon: '',
    value: '',
    options: ['search', 'item 1', 'item 2', 'custom'],
    setValue: () => { },
    showDatePickerOnVal: 'custom'
}

export const DropDownWithEndIcon = Template.bind({});
DropDownWithEndIcon.args = {
    name: 'name',
    endIcon: '',
    value: '',
    options: ['search', 'item 1', 'item 2', 'custom'],
    setValue: () => { },
    showDatePickerOnVal: 'custom'
}

