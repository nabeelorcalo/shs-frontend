import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import {AccommodationCard} from '../../../components'
import useAccommodationData from "../actionHandler";
import "./style.scss";
import thumb1 from '../../../assets/images/gallery/thumb1.png'
import thumb2 from '../../../assets/images/gallery/thumb2.png'
import thumb3 from '../../../assets/images/gallery/thumb3.png'
import thumb4 from '../../../assets/images/gallery/thumb4.png'
import thumb5 from '../../../assets/images/gallery/thumb5.png'

const data = [
  {id: '01', coverPhoto: thumb1, discount: '30', autualPrice: '1200', discountPrice: '840', propertyAvailableFor: 'week', propertyType: 'Apartment', totalBeds: '2', totalWashRoom: '2', tags: ['Utility Bills', 'Laundry', 'Meals'], location: 'Black horse Lane, London, E17 6DS'},
  {id: '02', coverPhoto: thumb2, discount: '', autualPrice: '1200', discountPrice: '1200', propertyAvailableFor: 'month', propertyType: 'Apartment', totalBeds: '2', totalWashRoom: '1', tags: ['Utility Bills', 'Laundry', 'Meals'], location: '11 Queensway London EC49 5PC'},
  {id: '03', coverPhoto: thumb3, discount: '', autualPrice: '1200', discountPrice: '1200', propertyAvailableFor: 'month', propertyType: 'Apartment', totalBeds: '2', totalWashRoom: '1', tags: ['Utility Bills', 'Laundry', 'Meals'], location: '11 Queensway London EC49 5PC'},
  {id: '04', coverPhoto: thumb4, discount: '18', autualPrice: '1200', discountPrice: '960', propertyAvailableFor: 'month', propertyType: 'Apartment', totalBeds: '2', totalWashRoom: '1', tags: ['Utility Bills', 'Laundry', 'Meals'], location: '11 Queensway London EC49 5PC'},
  {id: '05', coverPhoto: thumb5, discount: '', autualPrice: '1200', discountPrice: '1200', propertyAvailableFor: 'month', propertyType: 'Apartment', totalBeds: '2', totalWashRoom: '1', tags: ['Utility Bills', 'Laundry', 'Meals'], location: '11 Queensway London EC49 5PC'},
]

const AvailableProperties = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate()
  const location = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const {propertiesList} = useAccommodationData()



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    console.log("Properties List:: ", propertiesList)
  }, [])



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleDetailClick = (propertyId: any) => navigate(`/property/${propertyId}`)



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="available-properties">
      <div className="shs-row">
        {data.map((property, index) => {
          return (
            <div key={index} className="shs-col-5">
              <AccommodationCard
                coverPhoto={property.coverPhoto}
                discount={property.discount}
                autualPrice={property.autualPrice}
                withDiscountPrice={property.discountPrice}
                propertyAvailableFor={property.propertyAvailableFor}
                propertyType={property.propertyType}
                totalBeds={property.totalBeds}
                totalWashRoom={property.totalWashRoom}
                tags={property.tags}
                location={property.location}
                handleSaveClick={() => console.log('handle clik')}
                handleDetailClick={() => handleDetailClick(property.id)}
                handleChatClick={() => navigate('/chat')}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AvailableProperties