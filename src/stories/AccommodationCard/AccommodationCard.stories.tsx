import {AccommodationCard} from '../../components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Components/AccommodationCard/AccommodationCard',
    component: AccommodationCard,
} as ComponentMeta<typeof AccommodationCard>

const Template: ComponentStory<typeof AccommodationCard> = (args) => <AccommodationCard {...args} />

export const AccommodationCardView = Template.bind({});
AccommodationCardView.args = {
    id: '1',
    maxWidth: '350px',
    coverPhoto: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    discount: '30',
    autualPrice: '1800',
    withDiscountPrice: '1200',
    propertyAvailableFor: 'week',
    propertyType: 'apartment',
    totalBeds: '2',
    totalWashRoom: '2',
    tags: ['utility bills', 'laundry', 'meals'],
    location: 'location',
    handleChatClick() { },
    handleDetailClick() { },
    handleSaveClick() { },
}

