import { ComponentStory, ComponentMeta } from '@storybook/react'
import PageHeader from '../components/PageHeader'
import { Space, Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons';


export default {
    title: 'Components/PageHeader',
    component: PageHeader,
} as ComponentMeta<typeof PageHeader>


const Template: ComponentStory<typeof PageHeader> = (args) => <PageHeader {...args} />

export const Default = Template.bind({})
Default.args = {
    title: 'Accommodation',
}

export const WithBorder = Template.bind({})
WithBorder.args = {
    title: 'Accommodation',
    actions: true,
    bordered: true
}

export const WithActions = Template.bind({})
WithActions.args = {
    title: 'DigiVault',
    actions: true,
    bordered: true,
    children: <Space wrap>
        <Button type='primary'>Click me</Button>
        <Button danger icon={<DownloadOutlined />}>Download</Button>
    </Space>
}

