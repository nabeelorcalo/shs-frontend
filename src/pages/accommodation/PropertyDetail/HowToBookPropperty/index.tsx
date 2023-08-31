import React from "react";
import './style.scss'
import { Collapse } from 'antd';
import { IconArrowDown } from '../../../../assets/images'
const { Panel } = Collapse;


const HowToBookPropperty = () => {

  return (
    <div className="book-property">
      <Collapse
        accordion={true}
        bordered={false}
        expandIcon={({ isActive }) => <IconArrowDown rotate={isActive ? 90 : 0} />}
        expandIconPosition="end"
      >
        <Panel header="I like this property, how do i book it?" key="1">
          <div>
            When you find a property you like it's fairly simple to make a booking. Both the tenant and the advertiser need to confirm before completing a booking. This is how it works:
          </div>
          <div>
            1. Select your dates to check for availability.
          </div>
          <div>
            2. If accommodation is available you can simply request for booking with just a few simple details and it will be held for you until you get a response. Remember, we won't charge you until the Landlord confirms.
          </div>
          <div>
            3. When the advertiser approves and the payment is completed, you have successfully booked the property.
          </div>
        </Panel>
        <Panel header="Can i view this property?" key="2">
          <div>
            You don’t need to perform a viewing on housing anywhere, here’s why:
          </div>
          <div>
            1. All of the properties on housing anywhere have pictures and a clear description. If anything is unclear, you can easily reach out to the advertiser.
          </div>
          <div>
            2. Restricting viewings provides equal chances for everyone, whether you are a local or live abroad.
          </div>
          <div>
            3. Housing anywhere makes sure the property is as advertised, by only sending any money to the advertiser after you have successfully moved in.
          </div>
        </Panel>
        <Panel header="What happens after the booking?" key="3">
          <div className="panel-third">
            If landlord accept your request, your payment method will be charged and we will put you in contact with the Landlord. If they don’t accept, no worries, you won't be charged and we'll help you find alternatives.
          </div>
        </Panel>
      </Collapse>
    </div>
  )
}

export default HowToBookPropperty;
