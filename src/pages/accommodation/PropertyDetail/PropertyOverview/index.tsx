import React, { FC } from "react";
import './style.scss'
import { Typography, Avatar } from 'antd';
import avatar from '../../../../assets/images/header/avatar.svg'


const PropertyOverview = () => {
  return (
    <> 
      <div className="overview-content">
        <div className="overview-facilities">
          <div className="overview-section-label">Facilities</div>
          <ul className="overview-list facilities-list">
            <li>Living room</li>
            <li>Toilet</li>
            <li>Kitchen</li>
            <li>Basement</li>
            <li>Parking</li>
          </ul>
        </div>
      </div>

      <div className="overview-content">
        <div className="overview-amenities">
          <div className="overview-section-label">Amenities</div>
          <ul className="overview-list amenities-list">
            <li>WiFi</li>
            <li>Living Room Furniture</li>
            <li>Bed</li>
            <li>TV</li>
            <li>Private Kitchenware</li>
            <li>Washing machine</li>
            <li>Closet</li>
            <li>Central Heating</li>
            <li>Wood flooring</li>
            <li>Desk</li>
            <li>Air Conditioning</li>
            <li>Dryer</li>
            <li>Dishwasher</li>
            <li>Access Friendly</li>
            <li>Bedroom Lock</li>
          </ul>
        </div>
      </div>

      <div className="overview-content">
        <div className="overview-amenities">
          <div className="overview-section-label">House Rules</div>
          <ul className="overview-list house-rules">
            <li>Playing Musical Instruments Negotiable</li>
            <li>Pets Not Allowed</li>
            <li>Smoking Not Allowed </li>
          </ul>
        </div>
      </div>

      <div className="overview-content">
        <div className="overview-amenities">
          <div className="overview-section-label">Preferred tenant</div>
          <ul className="overview-list preferred-tenant">
            <li>
              <span>Age</span>
              <span>No Preference</span>
            </li>
            <li>
              <span>Gender</span>
              <span>No Preference</span>
            </li>
            <li>
              <span>Tenant Type</span>
              <span>Working professionals only</span>
            </li>
            <li>
              <span>Suitable for couples</span>
              <span>Yes</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default PropertyOverview;
