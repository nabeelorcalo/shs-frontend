import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { availablePropertiesState } from "../../../store";
import { AccommodationCard } from '../../../components'
import useAvailablePropertiesHook from "./actionHandler";
import {Empty, Spin} from 'antd'
import "./style.scss";
import thumb1 from '../../../assets/images/gallery/thumb1.png'



const AvailableProperties = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate()
  const location = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const {getAvailableProperties} = useAvailablePropertiesHook();
  const [availableProperties, setAvailableProperties] = useRecoilState(availablePropertiesState)
  const [loading, setLoading] = useState(false)



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    propertiesData()
  }, [])

  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const propertiesData = async () => {
    setLoading(true)
    try {
      const response = await getAvailableProperties();
      if(!response.error) {
        const {data} = response
        setAvailableProperties(data)
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
    <div className="available-properties">
      <Spin spinning={loading}>
        {availableProperties? (
        <div className="shs-row">
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
        </div>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
        
      </Spin>
    </div>
  )
}

export default AvailableProperties