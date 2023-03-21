
import SelectComp from '../../components/Select/Select';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArrowDownDark } from '../../assets/images';

export default {
    title: 'Components/SelectComp',
    component: SelectComp,
} as ComponentMeta<typeof SelectComp>

const Template: ComponentStory<typeof SelectComp> = (args) => <SelectComp {...args} />

export const Primary = Template.bind({})
Primary.args = {
    label: 'label',
    value: 'value',
    className: '',
    popupClassName: '',
    suffixIcon: <ArrowDownDark />,
    placeholder: 'placeholder',
    onChange: () => { },
    children: <div>Render options as JSX; import Select as Options </div>,
}