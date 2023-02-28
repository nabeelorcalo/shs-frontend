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

export const DropDownComp = Template.bind({})
DropDownComp.args = {
    name: 'this month',
    value: '',
    options: ['search', 'item 1', 'item 2'],
    requireSearchBar: false,
    requireCheckbox: false,
    checkboxPosition: 'left',
    searchValue: '',
    selectedList: [],
    // setValue: function (e) { console.log(e) },
    // setSearchValue: function () { },
    // setSelectedList: function () { }
}

