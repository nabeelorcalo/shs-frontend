import { ComponentStory, ComponentMeta } from '@storybook/react'
import FiltersButton from '../components/FiltersButton'

export default {
    title: 'Components/FiltersButton',
    component: FiltersButton,
} as ComponentMeta<typeof FiltersButton>


const Template: ComponentStory<typeof FiltersButton> = (args) => <FiltersButton {...args} />

export const Default = Template.bind({})
Default.args = {
    label: "Filters",
    onClick: () => console.log("I am clicked")
}
