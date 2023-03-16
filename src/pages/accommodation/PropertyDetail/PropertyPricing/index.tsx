import React, { FC } from "react";
import './style.scss'
import { IconStatusCheck } from '../../../../assets/images'


const PropertyPricing = () => {
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
              <div className="pricing-item-value monthly">Monthly</div>
            </li>
            <li>
              <div className="pricing-item-title">Minimum stay</div>
              <div className="pricing-item-value monthly">3 months</div>
            </li>
            <li>
              <div className="pricing-item-title">Deposits</div>
              <div className="pricing-item-value monthly">£3000</div>
            </li>
            <li>
              <div className="pricing-item-title">During your stay</div>

              <div className="during-your-stay">
                <div className="during-your-stay-inner monthly-rent">
                  <div className="during-your-stay-title">Rent</div>
                  <div className="monthly-rent-row">
                    <span className="monthly-rent-month">Monthly</span>
                    <span className="monthly-rent-rent">£1990</span>
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
                        <div className="utilities-list-item-value">Included</div>
                      </div>
                    </li>
                    <li>
                      <div className="utilities-list-title">
                        Water
                      </div>
                      <div className="utilities-list-right">
                        <div className="utilities-list-item-satus"><IconStatusCheck /></div>
                        <div className="utilities-list-item-value">Included</div>
                      </div>
                    </li>
                    <li>
                      <div className="utilities-list-title">
                        Gas
                      </div>
                      <div className="utilities-list-right">
                        <div className="utilities-list-item-satus"><IconStatusCheck /></div>
                        <div className="utilities-list-item-value">Included</div>
                      </div>
                    </li>
                    <li>
                      <div className="utilities-list-title">
                        Internet
                      </div>
                      <div className="utilities-list-right">
                        <div className="utilities-list-item-satus"><IconStatusCheck /></div>
                        <div className="utilities-list-item-value">Included</div>
                      </div>
                    </li>
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
