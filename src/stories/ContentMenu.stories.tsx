import { ComponentStory, ComponentMeta } from '@storybook/react'
import type { MenuProps } from 'antd';
import ContentMenu from '../components/ContentMenu'
import { DownloadOutlined } from '@ant-design/icons';

let current = "item-1";
const handleMenuClick: MenuProps['onClick'] = (item) => current = item.key
export default {
    title: 'Components/ContentMenu',
    component: ContentMenu,
} as ComponentMeta<typeof ContentMenu>


const Template: ComponentStory<typeof ContentMenu> = (args) => <ContentMenu {...args} />

export const Default = Template.bind({})
Default.args = {
    items: [
        {label: 'item 1', key: 'item-1'},
        {label: 'item 2', key: 'item-2'},
        {label: 'item 3', key: 'item-3', icon: <DownloadOutlined />},
    ],
    handleMenuClick: handleMenuClick,
    selectedKey: current
}
