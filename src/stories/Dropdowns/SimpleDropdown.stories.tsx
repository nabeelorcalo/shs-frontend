import { DropDown } from "../../components";
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Components/DropDown/SimpleDropdown',
    component: DropDown,
} as ComponentMeta<typeof DropDown>

const Template: ComponentStory<typeof DropDown> = (args) => <DropDown {...args} />

export const SimpleDropDown = Template.bind({})
SimpleDropDown.args = {
    name: 'this month',
    value: '',
    options: ['search', 'item 1', 'item 2'],
    setValue: () => { },
}

export const SimpleDropDownPilled = Template.bind({})
SimpleDropDownPilled.args = {
    name: 'name',
    value: '',
    options: ['item 0', 'item 1', 'item 2'],
    setValue: () => { },
    pilled: true
}