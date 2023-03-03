import { CommonDatePicker } from "../components";
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Components/CommonDatePicker',
    component: CommonDatePicker,
    docs: {
        source: {
            type: 'code'
        }
    },
    argTypes: {
        color: {
            control: { type: 'color' },
        }
    }
} as ComponentMeta<typeof CommonDatePicker>

const Template: ComponentStory<typeof CommonDatePicker> = (args) => <CommonDatePicker {...args} />

export const DatePicker = Template.bind({});
DatePicker.args = {
    open: false,
    setOpen: () => { },
    setValue: () => { }
}
export const MonthPicker = Template.bind({});
MonthPicker.args = {
    monthPicker: true,
    picker: "month",
    open: false,
    setOpen: () => { },
    setValue: () => { }
}

