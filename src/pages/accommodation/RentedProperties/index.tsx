import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import {AccommodationCard} from '../../../components'
import {Empty, Spin} from 'antd'
import { useRecoilState } from "recoil";
import { rentedPropertiesState } from "../../../store";
import useRentedPropertiesHook from "./actionHandler";
import "./style.scss";
import thumb1 from '../../../assets/images/gallery/thumb1.png'
import thumb2 from '../../../assets/images/gallery/thumb2.png'
import thumb3 from '../../../assets/images/gallery/thumb3.png'
import thumb4 from '../../../assets/images/gallery/thumb4.png'
import thumb5 from '../../../assets/images/gallery/thumb5.png'

const data = [
  {id: '01', coverPhoto: thumb1, discount: '30', autualPrice: '1200', discountPrice: '840', propertyAvailableFor: 'week', propertyType: 'Apartment', totalBeds: '2', totalWashRoom: '2', tags: ['Utility Bills', 'Laundry', 'Meals'], location: 'Black horse Lane, London, E17 6DS'},
  {id: '02', coverPhoto: thumb2, discount: '0', autualPrice: '1200', discountPrice: '0', propertyAvailableFor: 'month', propertyType: 'Apartment', totalBeds: '2', totalWashRoom: '1', tags: ['Utility Bills', 'Laundry', 'Meals'], location: '11 Queensway London EC49 5PC'},
  {id: '03', coverPhoto: thumb3, discount: '0', autualPrice: '1200', discountPrice: '0', propertyAvailableFor: 'month', propertyType: 'Apartment', totalBeds: '2', totalWashRoom: '1', tags: ['Utility Bills', 'Laundry', 'Meals'], location: '11 Queensway London EC49 5PC'},
  {id: '04', coverPhoto: thumb4, discount: '0', autualPrice: '1200', discountPrice: '0', propertyAvailableFor: 'month', propertyType: 'Apartment', totalBeds: '2', totalWashRoom: '1', tags: ['Utility Bills', 'Laundry', 'Meals'], location: '11 Queensway London EC49 5PC'},
  {id: '05', coverPhoto: thumb5, discount: '0', autualPrice: '1200', discountPrice: '0', propertyAvailableFor: 'month', propertyType: 'Apartment', totalBeds: '2', totalWashRoom: '1', tags: ['Utility Bills', 'Laundry', 'Meals'], location: '11 Queensway London EC49 5PC'},
]

const RentedProperties = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate()
  const {getRentedProperties} = useRentedPropertiesHook();
  const [rentedProperties, setRentedProperties] = useRecoilState(rentedPropertiesState)
  const [loading, setLoading] = useState(false)



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    fetchRentedProperties()
  }, [])


    /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const fetchRentedProperties = async () => {
    setLoading(true)
    try {
      const response = await getRentedProperties();
      if(!response.error) {
        const {data} = response
        setRentedProperties(data)
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
    <div className="rented-properties">
      <Spin spinning={loading}>
        <div className="shs-row placeholder-height">
          {rentedProperties?.map((property:any) => {
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
          {!rentedProperties.length && !loading &&
            <div className="shs-col-full ">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          }
        </div>
      </Spin>
    </div>
  )
}

export default RentedProperties