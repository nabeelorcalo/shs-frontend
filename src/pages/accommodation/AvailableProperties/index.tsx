import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AccommodationCard } from '../../../components';
import "./style.scss";
import {Empty, Spin} from 'antd';
import thumb1 from '../../../assets/images/gallery/thumb1.png';
import { useRecoilValue} from "recoil";
import { availablePropertiesState } from "../../../store";
import useAvailablePropertiesHook from "./actionHandler";



const AvailableProperties = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate()
  const {getAvailableProperties} = useAvailablePropertiesHook();
  const availableProperties = useRecoilValue(availablePropertiesState)
  const [loading, setLoading] = useState(false)



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    getAvailableProperties(setLoading)
  }, [])


  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleDetailClick = (propertyId: any) => navigate(`/property/${propertyId}`)



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="available-properties">
      <Spin spinning={loading}>
        <div className="shs-row placeholder-height">
          {availableProperties?.map((property:any) => {
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