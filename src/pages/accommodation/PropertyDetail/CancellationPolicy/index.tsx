import React, { FC } from "react";
import './style.scss'
import { Typography } from 'antd';


const CancellationPolicy = () => {
  return (
    <div className="cancellation-policy-content">
      <div className="canc-policy-inner">
        <div className="canc-policy-row">
          <div className="standard-cancellation">
            <div className="canc-policy-title">
              Standard Cancellation
            </div>
            <Typography>
              If you cancel this booking
            </Typography>
            <div className="canc-policy-list">
              <ul>
                <li>Within 24 hours of confirmation – Full refund of first month’s rent</li>
                <li>After 24 hours of confirmation – No refund</li>
              </ul>
            </div>
          </div>
          <div className="safeguard-cancellation">
            <div className="canc-policy-title">
              48-Hour Safeguard
            </div>
            <div className="safeguard-candellation-desc">
              <Typography>
                If you move in and find that the property doesn’t match its listing description, let us know within 48 hours and you could get a full refund. <span>Learn more</span>
              </Typography>
            </div>
          </div> 
        </div>
      </div>
    </div>
  )
}

export default CancellationPolicy;
