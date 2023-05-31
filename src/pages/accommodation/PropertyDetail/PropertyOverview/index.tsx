import React, { FC } from "react";
import './style.scss'
import { Typography, Avatar } from 'antd';
import avatar from '../../../../assets/images/header/avatar.svg'
interface OverviewProps {
  data: any
}

const PropertyOverview: FC<OverviewProps> = ({data}) => {
  return (
    <> 
      <div className="overview-content">
        <div className="overview-facilities">
          <div className="overview-section-label">Facilities</div>
          <ul className="overview-list facilities-list">
            {data?.buildingHas?.map((facility:any) => (
              <li>{facility}</li>
            ))}
            {data?.propertyHas?.map((facility:any) =>(
              <li>{facility}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="overview-content amenities">
        <div className="overview-amenities">
          <div className="overview-section-label">Amenities</div>
          {data?.bedroomAmenities?.length !== 0 &&
            <ul className="overview-list amenities-list">
              {data?.bedroomAmenities?.map((amenity:any) => (
                <li>{amenity}</li>
              ))}
            </ul>
          }
        </div>
      </div>

      <div className="overview-content">
        <div className="overview-amenities">
          <div className="overview-section-label">House Rules</div>
          <ul className="overview-list house-rules">
            <li>{data?.petsAllowed ? 'Pets Allowed': 'Pets Not Allowed'}</li>
            <li>{data?.musicalInstrumentsAllowed ? 'Playing Musical Instruments Negotiable': 'Playing Musical Instruments Not Allowed'}</li>
          </ul>
        </div>
      </div>

      <div className="overview-content">
        <div className="overview-amenities">
          <div className="overview-section-label">Preferred tenant</div>
          <ul className="overview-list preferred-tenant">
            <li>
              <span>Age</span>
              <span>{data?.maxAgePreference ? data.maxAgePreference : 'No Preference'}</span>
            </li>
            <li>
              <span>Gender</span>
              <span>{data?.genderPreference ? data.genderPreference : 'No Preference'}</span>
            </li>
            <li>
              <span>Tenant Type</span>
              <span>{data?.tenantTypePreference ? data.tenantTypePreference : 'No Preference'}</span>
            </li>
            <li>
              <span>Suitable for couples</span>
              <span>{data?.couplesAllowed ? 'Yes' : 'No'}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default PropertyOverview;
