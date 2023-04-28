import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import {Empty, Spin} from 'antd'
import { AccommodationCard } from '../../../components'
import "./style.scss";
import thumb1 from '../../../assets/images/gallery/thumb1.png'
import { useRecoilValue} from "recoil";
import { savedPropertiesState } from "../../../store";
import useSavedPropertiesHook from "./actionHandler";



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
    console.log('savedProperties::: ', savedProperties)
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
            return (
              <div key={property.id} className="shs-col-5">
                <AccommodationCard
                  coverPhoto={thumb1}
                  discount={'30'}
                  autualPrice={"1200"}
                  withDiscountPrice={"840"}
                  propertyAvailableFor={"week"}
                  propertyType={property?.property.propertyType}
                  totalBeds={property?.property.totalBedrooms}
                  totalWashRoom={property?.property.totalBathrooms}
                  tags={['Utility Bills', 'Laundry', 'Meals']}
                  location={property?.property.addressOne}
                  handleSaveClick={() => console.log('handle clik')}
                  handleDetailClick={() => handleDetailClick(property.id)}
                  handleChatClick={() => navigate('/chat')}
                />
              </div>
            )
          })}
          {!savedProperties.length && !loading &&
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