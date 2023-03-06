import { DropDown } from "../../components";
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Components/DropDown/DropDownWithDatePicker',
    component: DropDown,
} as ComponentMeta<typeof DropDown>

const Template: ComponentStory<typeof DropDown> = (args) => <DropDown {...args} />

export const DropDownWithDatePicker = Template.bind({});
DropDownWithDatePicker.args = {
    name: 'this month',
    value: '',
    options: ['search', 'item 1', 'item 2', 'custom'],
    setValue: () => { },
    showDatePickerOnVal: 'custom'
}


