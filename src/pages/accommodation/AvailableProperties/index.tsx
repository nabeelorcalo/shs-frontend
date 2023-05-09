import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { AccommodationCard } from '../../../components';
import "./style.scss";
import {Empty, Spin} from 'antd';
import thumb1 from '../../../assets/images/gallery/thumb1.png';
import { useRecoilValue} from "recoil";
import { availablePropertiesState } from "../../../store";
import useAvailablePropertiesHook from "./actionHandler";
import useAccommodationHook from "../actionHandler"
import showNotification from '../../../helpers/showNotification'
import constants, {ROUTES_CONSTANTS} from '../../../config/constants'



const AvailableProperties = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate();
  const location = useLocation();
  const { getAvailableProperties } = useAvailablePropertiesHook();
  const availableProperties = useRecoilValue(availablePropertiesState);
  const [loading, setLoading] = useState(false);
  const { saveProperty } = useAccommodationHook();



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    getAvailableProperties(setLoading)
  }, [])


  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const postSaveProperty = async (id:any) => {
    setLoading(true)
    const result = await saveProperty({propertyId: id});
    setLoading(false)
    // if (result.error) {
    //   showNotification("error", constants.NOTIFICATION_DETAILS.error);
    // } else {
    //   showNotification("success", constants.NOTIFICATION_DETAILS.success);
    // }
  }

  


  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleDetailClick = (propertyId: any) => navigate(`/${ROUTES_CONSTANTS.PROPERTY_DETAIL}/${propertyId}`, {state: {from: location.pathname}})



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="available-properties">
      <Spin spinning={loading}>
        <div className="shs-row placeholder-height">
          {availableProperties?.map((property:any) => {
            let tags: any[] = [];
            if(property.allBillsIncluded) tags.push('Utility Bils');
            if(property.propertyHas?.includes("washingMachine")) tags.push("Laundry");

            return (
              <div key={property.id} className="shs-col-5">
                <AccommodationCard
                  coverPhoto={thumb1}
                  offer={property.offer?.monthlyDiscount}
                  rent={property?.monthlyRent}
                  propertyAvailableFor={"week"}
                  propertyType={property.propertyType}
                  totalBedrooms={property.totalBedrooms}
                  totalBathrooms={property.totalBathrooms}
                  address={property.addressOne}
                  tags={tags}
                  onSave={() => postSaveProperty(property.id)}
                  onDetail={() => handleDetailClick(property.id)}
                  onChat={() => navigate(`/${ROUTES_CONSTANTS.CHAT}`)}
                />
              </div>
            )
          })}
          {!availableProperties.length && !loading &&
            <div className="shs-col-full ">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          }
        </div>
      </Spin>
    </div>
  )
}

export default AvailableProperties