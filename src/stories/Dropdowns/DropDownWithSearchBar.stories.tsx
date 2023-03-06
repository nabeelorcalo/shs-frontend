import { DropDown } from "../../components";
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Components/DropDown/DropDownWithSearchbar',
    component: DropDown,
} as ComponentMeta<typeof DropDown>

const Template: ComponentStory<typeof DropDown> = (args) => <DropDown {...args} />

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