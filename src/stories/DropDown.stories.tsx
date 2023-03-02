import { DropDown } from "../components";
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Components/DropDown',
    component: DropDown,
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

export const DropDownWithSearchBar = Template.bind({});
DropDownWithSearchBar.args = {
    name: 'name',
    value: '',
    options: ['search', 'item 1', 'item 2'],
    requireSearchBar: true,
    searchValue: '',
    setValue: () => { },
    setSearchValue: () => { }
}

export const DropDownWithCheckbox = Template.bind({});
DropDownWithCheckbox.args = {
    name: 'this month',
    value: '',
    options: ['search', 'item 1', 'item 2'],
    requireCheckbox: true,
    selectedList: [],
    placement: 'bottomRight',
    setSelectedList: () => { },
    setValue: () => { },
}

export const DropDownWithSearchBarAndCheckBox = Template.bind({});
DropDownWithSearchBarAndCheckBox.args = {
    name: 'name',
    value: '',
    options: ['search', 'item 1', 'item 2'],
    requireSearchBar: true,
    searchValue: '',
    requireCheckbox: true,
    selectedList: [],
    setSelectedList: () => { },
    setSearchValue: () => { },
    setValue: () => { },
}

export const DropDownWithSearchBarAndCheckBoxRight = Template.bind({});
DropDownWithSearchBarAndCheckBoxRight.args = {
    name: 'name',
    value: '',
    options: ['search', 'item 1', 'item 2'],
    requireSearchBar: true,
    searchValue: '',
    requireCheckbox: true,
    checkboxOnRight: true,
    selectedList: [],
    setSelectedList: () => { },
    setSearchValue: () => { },
    setValue: () => { },
}

export const DropDownWithDatePicker = Template.bind({});
DropDownWithDatePicker.args = {
    name: 'this month',
    value: '',
    options: ['search', 'item 1', 'item 2', 'custom'],
    datePickerValue: 'custom',
    setValue: () => { },
}

export const DownloadIcon = Template.bind({});
DownloadIcon.args = {
    requiredDownloadIcon: true,
    options: ['pdf', 'excel'],
    value: '',
    setValue: () => { }
}
