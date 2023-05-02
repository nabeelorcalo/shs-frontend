import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import {AccommodationCard} from '../../../components'
import {Empty, Spin} from 'antd'
import "./style.scss";
import thumb1 from '../../../assets/images/gallery/thumb1.png'
import { useRecoilValue} from "recoil";
import { rentedPropertiesState } from "../../../store";
import useRentedPropertiesHook from "./actionHandler";


const RentedProperties = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate();
  const location = useLocation();
  const {getRentedProperties} = useRentedPropertiesHook();
  const rentedProperties = useRecoilValue(rentedPropertiesState);
  const [loading, setLoading] = useState(false);



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    getRentedProperties(setLoading)
    console.log('rendted:::: ', rentedProperties)
  }, [])


    /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleDetailClick = (propertyId: any) => navigate(`/property/${propertyId}`, {state: {from: location.pathname}})



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="rented-properties">
      <Spin spinning={loading}>
        <div className="shs-row placeholder-height">
          {rentedProperties?.map((item:any) => {
            let tags: any[] = [];
            if(item.property?.allBillsIncluded) tags.push('Utility Bils');
            if(item.property?.propertyHas?.includes("washingMachine")) tags.push("Laundry");

            return (
              <div key={item.id} className="shs-col-5">
                <AccommodationCard
                  coverPhoto={thumb1}
                  offer={item.property?.offer?.monthlyDiscount}
                  rent={item.property?.monthlyRent}
                  propertyAvailableFor={"week"}
                  propertyType={item.property?.propertyType}
                  totalBedrooms={item.property?.totalBedrooms}
                  totalBathrooms={item.property?.totalBathrooms}
                  address={item.property?.addressOne}
                  tags={tags}
                  onSave={() => console.log('handle clik')}
                  onDetail={() => handleDetailClick(item.property.id)}
                  onChat={() => navigate('/chat')}
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