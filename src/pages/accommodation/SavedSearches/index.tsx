import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import {Empty, Spin} from 'antd'
import { useRecoilState } from "recoil";
import { savedPropertiesState } from "../../../store";
import useSavedPropertiesHook from "./actionHandler";
import { AccommodationCard } from '../../../components'
import "./style.scss";
import thumb1 from '../../../assets/images/gallery/thumb1.png'



const SavedSearches = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate()
  const {getSavedProperties} = useSavedPropertiesHook();
  const [savedProperties, setsavedProperties] = useRecoilState(savedPropertiesState)
  const [loading, setLoading] = useState(false)



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {

  }, [])


  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const propertiesData = async () => {
    setLoading(true)
    try {
      const response = await getSavedProperties();
      if(!response.error) {
        const {data} = response
        setsavedProperties(data)
      }
    } catch (errorInfo) {
      return;
    } finally {
      setLoading(false)
    }
  }



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleDetailClick = (propertyId: any) => navigate(`/property/${propertyId}`)



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="saved-searches">
      <Spin spinning={loading}>
        <div className="shs-row">
          {savedProperties?.map((property:any) => {
            return (
              <div key={property.id} className="shs-col-5">
                <AccommodationCard
                  coverPhoto={thumb1}
                  discount={'30'}
                  autualPrice={"1200"}
                  withDiscountPrice={"840"}
                  propertyAvailableFor={"week"}
                  propertyType={property.propertyType}
                  totalBeds={property.totalBedrooms}
                  totalWashRoom={property.totalBathrooms}
                  tags={['Utility Bills', 'Laundry', 'Meals']}
                  location={property.addressOne}
                  handleSaveClick={() => console.log('handle clik')}
                  handleDetailClick={() => handleDetailClick(property.id)}
                  handleChatClick={() => navigate('/chat')}
                />
              </div>
            )
          })}
          {!savedProperties.length &&
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          }
        </div>
        
      </Spin>
    </div>
  )
}

export default SavedSearches