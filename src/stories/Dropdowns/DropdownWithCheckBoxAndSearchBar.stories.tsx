import { DropDown } from "../../components";
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Components/DropDown/DropDownWithCheckbox',
    component: DropDown,
} as ComponentMeta<typeof DropDown>

const Template: ComponentStory<typeof DropDown> = (args) => <DropDown {...args} />

export const DropDownWithCheckbox = Template.bind({});
DropDownWithCheckbox.args = {
    name: 'name',
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