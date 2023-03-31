import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Breadcrumb } from '../components'

export default {
    title: 'Components/Breadcrumb',
    component: Breadcrumb,
} as ComponentMeta<typeof Breadcrumb>;

const Template: ComponentStory<typeof Breadcrumb> = (args) => <Breadcrumb {...args} />

export const Primary = Template.bind({})
Primary.args = {
    breadCrumbData: [
    { name: "Main Title" },
    { name: " child 1", onClickNavigateTo: '/' },
    { name: "/" },
    { name: " child 2", onClickNavigateTo: '/' },
    ]
}