import React, { FC } from "react";
import './style.scss'
import { IconStatusCheck } from '../../../../assets/images'
interface PricingProps {
  data: any
}

const PropertyPricing: FC<PricingProps> = ({data}) => {
  return (
    <>
      <div className="pricing-content">
        <div className="pricint-content-subtitle">
          Add your booking dates to see what you'll pay
        </div>
        <div className="pricing-content-card">
          <ul className="pricing-card-list">
            <li>
              <div className="pricing-item-title">Contract Type</div>
              <div className="pricing-item-value monthly">
                {data?.rentFrequency === "Month" ? 'Monthly' : data?.rentFrequency === "Week" ? 'Weekly' : 'Daily'}
              </div>
            </li>
            <li>
              <div className="pricing-item-title">Minimum stay</div>
              <div className="pricing-item-value monthly">
                {data?.minimumStay} {data?.rentFrequency === "Month" ? 'months' : data?.rentFrequency === "Week" ? 'weeks' : 'days'}
              </div>
            </li>
            <li>
              <div className="pricing-item-title">Deposits</div>
              <div className="pricing-item-value monthly">£{data?.depositAmount}</div>
            </li>
            <li>
              <div className="pricing-item-title">During your stay</div>

              <div className="during-your-stay">
                <div className="during-your-stay-inner monthly-rent">
                  <div className="during-your-stay-title">Rent</div>
                  <div className="monthly-rent-row">
                    <span className="monthly-rent-month">
                      {data?.rentFrequency === "Month" ? 'Monthly' : data?.rentFrequency === "Week" ? 'Weekly' : 'Daily'}
                    </span>
                    <span className="monthly-rent-rent">£{data?.rent}</span>
                  </div>
                </div>

                <div className="during-your-stay-inner utilities">
                  <div className="during-your-stay-title">Utilities</div>
                  <ul className="utilities-list">
                    <li>
                      <div className="utilities-list-title">
                        Electricity
                      </div>
                      <div className="utilities-list-right">
                        <div className="utilities-list-item-satus"><IconStatusCheck /></div>
                        <div className="utilities-list-item-value">{data?.allBillsIncluded ? 'Included': data?.electricityBillPayment}</div>
                      </div>
                    </li>
                    <li>
                      <div className="utilities-list-title">
                        Water
                      </div>
                      <div className="utilities-list-right">
                        <div className="utilities-list-item-satus"><IconStatusCheck /></div>
                        <div className="utilities-list-item-value">{data?.allBillsIncluded ? 'Included': data?.waterBillPayment}</div>
                      </div>
                    </li>
                    <li>
                      <div className="utilities-list-title">
                        Gas
                      </div>
                      <div className="utilities-list-right">
                        <div className="utilities-list-item-satus"><IconStatusCheck /></div>
                        <div className="utilities-list-item-value">{data?.allBillsIncluded ? 'Included': data?.gasBillPayment}</div>
                      </div>
                    </li>
                    {data?.allBillsIncluded &&
                    <li>
                      <div className="utilities-list-title">
                        Internet
                      </div>
                      <div className="utilities-list-right">
                        <div className="utilities-list-item-satus"><IconStatusCheck /></div>
                        <div className="utilities-list-item-value">Included</div>
                      </div>
                    </li>
                    }
                    
                    <li>
                      <div className="utilities-list-title">
                        Broadcasting fee
                      </div>
                      <div className="utilities-list-right">
                        <div className="utilities-list-item-value">£19 monthly(est.)</div>
                      </div>
                    </li>
                    <li>
                      <div className="utilities-list-title">
                        Cleaning
                      </div>
                      <div className="utilities-list-right">
                        <div className="utilities-list-item-value">£100 at move-out</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pricing-table-discount-offer">
                15 % off between 1 and 6 months Bookings
              </div>
            </li>
          </ul>
        </div>
      </div>      
    </>
  )
}

export default PropertyPricing;
