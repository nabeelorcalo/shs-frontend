import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import {Empty, Spin} from 'antd'
import { AccommodationCard } from '../../../components'
import "./style.scss";
import thumb1 from '../../../assets/images/gallery/thumb1.png'
import { useRecoilValue} from "recoil";
import { savedPropertiesState } from "../../../store";
import useSavedPropertiesHook from "./actionHandler";
import {ROUTES_CONSTANTS} from '../../../config/constants'


const SavedSearches = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate();
  const location = useLocation();
  const {getSavedProperties} = useSavedPropertiesHook();
  const savedProperties= useRecoilValue(savedPropertiesState);
  const [loading, setLoading] = useState(false);



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    getSavedProperties(setLoading)
  }, [])


  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleDetailClick = (propertyId: any) => navigate(`/property/${propertyId}`, {state: {from: location.pathname}})



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="saved-searches">
      <Spin spinning={loading}>
        <div className="shs-row placeholder-height">
          {savedProperties?.map((property:any) => {
            let tags: any[] = [];
            if(property.allBillsIncluded) tags.push('Utility Bils');
            if(property.propertyHas?.includes("washingMachine")) tags.push("Laundry");

            return (
              <div key={property.id} className="shs-col-5">
                <AccommodationCard
                  coverPhoto={property?.coverImageData?.mediaUrl}
                  offer={property.offer?.monthlyDiscount}
                  rent={property.rent}
                  propertyAvailableFor={property.rentFrequency}
                  propertyType={property.propertyType}
                  totalBedrooms={property.totalBedrooms}
                  totalBathrooms={property.totalBathrooms}
                  address={property.addressOne}
                  tags={tags}
                  onSave={() => console.log('handle clik')}
                  onDetail={() => handleDetailClick(property.id)}
                  onChat={() => navigate(`/${ROUTES_CONSTANTS.CHAT}`)}
                />
              </div>
            )
          })}
          {!savedProperties?.length && !loading &&
            <div className="shs-col-full ">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          }
        </div>
      </Spin>
    </div>
  )
}

export default SavedSearches