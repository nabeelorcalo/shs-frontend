import { ContractCard } from "../../components";
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Components/DropDown/SimpleDropdown',
    component: ContractCard,
} as ComponentMeta<typeof ContractCard>

const Template: ComponentStory<typeof ContractCard> = (args) => <ContractCard {...args} />

export const SimpleContractCard = Template.bind({});
SimpleContractCard.args = {
    img: '',
    title: 'this is new title',
    description: 'description'
}


export const ContractCardWithProgressBar = Template.bind({});
ContractCardWithProgressBar.args = {
    userImg: '',
    userName: 'umar malik',
    designation: 'ui/ux developer',
    totalHours: '35hrs',
    progress: 95,
    workedHours: '27h 52m'
}