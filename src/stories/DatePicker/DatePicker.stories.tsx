import { CommonDatePicker } from "../../components";
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArrowDownDark } from "../../assets/images";

export default {
    title: 'Components/DatePicker/CommonDatePicker',
    component: CommonDatePicker,
} as ComponentMeta<typeof CommonDatePicker>

const Template: ComponentStory<typeof CommonDatePicker> = (args) => <CommonDatePicker {...args} />

export const DatePicker = Template.bind({});
DatePicker.args = {
    open: false,
    name: 'Date Picker',
    setOpen: () => { },
    setValue: () => { }
};
export const DatePickerAsButton = Template.bind({});
DatePickerAsButton.args = {
    requireAsButton: true,
    open: false,
    name: 'Date Picker as button',
    className: '',
    setOpen: () => { },
    setValue: () => { }
};
export const DatePickerAsButtonWithIcon = Template.bind({});
DatePickerAsButtonWithIcon.args = {
    requireAsButton: true,
    open: false,
    name: 'Date Picker as button',
    btnIcon: ArrowDownDark,
    btnIcononRight: true,
    className: '',
    setOpen: () => { },
    setValue: () => { }
};

export const MonthPicker = Template.bind({});
MonthPicker.args = {
    monthPicker: true,
    picker: "month",
    name: 'name',
    open: false,
    setOpen: () => { },
    setValue: () => { }
};

