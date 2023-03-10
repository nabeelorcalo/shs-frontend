import AssessmentCard from '../../components/AccommodationCard/AccommodationCard';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Components/AssessmentCard/AssessmentCard',
    component: AssessmentCard,
} as ComponentMeta<typeof AssessmentCard>

const Template: ComponentStory<typeof AssessmentCard> = (args) => <AssessmentCard {...args} />

export const AssessmentCardView = Template.bind({});
AssessmentCardView.args = {
    id: '1',
    title: 'self assessment 1',
    month: 'march',
    year: '2023',
    userName: 'arsalan',
    userImg: '',
    status: 'draft',
    handleMenuClick(data: any) {
        //returns an object
        console.log(data);
    }
}

