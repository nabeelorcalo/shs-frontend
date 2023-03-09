import { ComponentStory, ComponentMeta } from '@storybook/react'
import Drawer from '../components/Drawer'

export default {
    title: 'Components/Drawer',
    component: Drawer,
} as ComponentMeta<typeof Drawer>


const Template: ComponentStory<typeof Drawer> = (args) => <Drawer {...args} />

export const Default = Template.bind({})
Default.args = {
    title: "Filters",
    open: true,
    onClose: () => console.log('Close'),
    children: <>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </>,
}
