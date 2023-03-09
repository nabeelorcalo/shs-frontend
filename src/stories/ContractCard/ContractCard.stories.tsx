import { ContractCard } from "../../components";
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ContractsSigned } from "../../assets/images";

export default {
    title: 'Components/ContractCard/ContractCard',
    component: ContractCard,
} as ComponentMeta<typeof ContractCard>

const Template: ComponentStory<typeof ContractCard> = (args) => <ContractCard {...args} />

export const SimpleContractCard = Template.bind({})
SimpleContractCard.args = {
    img: ContractsSigned,
    title: 'title',
    description: 'description',
    handleViewAll: () => { }
}

export const ContractCardWithProgressbar = Template.bind({})
ContractCardWithProgressbar.args = {
    cardWithProgressBar: true,
    img: ContractsSigned,
    title: 'title',
    description: 'descrition',
    userImg: '',
    userName: 'username',
    designation: 'designation',
    totalHours: '02',
    progress: '90',
    workedHours: '04',
    strokeColor: 'red',
    handleViewAll: () => { }
}