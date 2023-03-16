
import DropDownNew from '../../components/Dropdown/DropDownNew';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Components/DropDownNew',
    component: DropDownNew,
} as ComponentMeta<typeof DropDownNew>

const Template: ComponentStory<typeof DropDownNew> = (args) => <DropDownNew {...args} />

export const Primary = Template.bind({})
Primary.args = {
    items: [{ label: <p>label</p>, key: 'key' }],
    children: <div>Render Some JSX</div>,
}