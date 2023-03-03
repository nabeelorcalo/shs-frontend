import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Input } from '../components'

export default {
    title: 'Components/Input',
    component: Input,
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
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />

export const MyInput = Template.bind({})
MyInput.args = {
    required: false,
    id: '',
    size: 'large',
    label: 'label',
    name: 'name',
    value: 'value',
    type: 'text',
    placeholder: 'placeholder',
    className: 'input',
    handleChange: () => { }
}