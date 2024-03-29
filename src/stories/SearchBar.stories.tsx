import { SearchBar } from "../components";
import { ComponentStory, ComponentMeta } from '@storybook/react'


export default {
    title: 'Components/SearchBar',
    component: SearchBar,
} as ComponentMeta<typeof SearchBar>

const Template: ComponentStory<typeof SearchBar> = (args) => <SearchBar {...args} />

export const Simple = Template.bind({})
Simple.args = {
    size: 'small',
    placeholder: 'search',
    value: 'value',
    className: '',
    name: 'search bar',
    icon: '',
    handleChange: () => { }
}

