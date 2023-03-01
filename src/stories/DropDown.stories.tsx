import { DropDown } from "../components";
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { fireEvent, userEvent, within } from '@storybook/testing-library'


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

export const DropDownWithSearchBar = Template.bind({});
DropDownWithSearchBar.args = {
    name: 'this month',
    value: '',
    options: ['search', 'item 1', 'item 2'],
    requireSearchBar: true,
    searchValue: '',
    placement: 'bottomRight',
    setValue: () => { },
}

export const DropDownWithCheckbox = Template.bind({});
DropDownWithCheckbox.args = {
    name: 'this month',
    value: '',
    options: ['search', 'item 1', 'item 2'],
    requireCheckbox: true,
    checkboxPosition: '',
    selectedList: [],
    placement: 'bottomRight',
    setSelectedList: () => { },
    setValue: () => { },
}

export const DropDownWithSearchBarAndCheckBox = Template.bind({});
DropDownWithSearchBarAndCheckBox.args = {
    name: 'this month',
    value: '',
    options: ['search', 'item 1', 'item 2'],
    requireSearchBar: true,
    searchValue: '',
    requireCheckbox: true,
    checkboxPosition: 'right',
    selectedList: [],
    placement: 'bottomRight',
    setSelectedList: () => { },
    setSearchValue: () => { },
    setValue: () => { },
}

export const DropDownWithSearchBarAndCheckBoxAndDateRange = Template.bind({});
DropDownWithSearchBarAndCheckBoxAndDateRange.args = {
    name: 'this month',
    value: '',
    options: ['item 0', 'item 1', 'item 2', 'custom'],
    requireSearchBar: true,
    searchValue: '',
    requireCheckbox: true,
    checkboxPosition: 'right',
    selectedList: [],
    placement: 'bottomRight',
    requireDatePicker: true,
    setSelectedList: () => { },
    setSearchValue: () => { },
    setValue: () => { }
}
