import {AccommodationCard} from '../../components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Components/AccommodationCard/AccommodationCard',
    component: AccommodationCard,
} as ComponentMeta<typeof AccommodationCard>

const Template: ComponentStory<typeof AccommodationCard> = (args) => <AccommodationCard {...args} />

export const AccommodationCardView = Template.bind({});
AccommodationCardView.args = {
    coverPhoto: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    offer: 30,
    rent: 0,
    propertyAvailableFor: 'week',
    propertyType: "Studio",
    totalBedrooms: 2,
    totalBathrooms: 2,
    address: "118-127 Park Ln, London W1K 7AF, UK",
    tags: ['utility bills', 'laundry', 'meals'],
    onChat: ()=> { },
    onDetail: ()=> { },
    onSave: ()=> { },
}

