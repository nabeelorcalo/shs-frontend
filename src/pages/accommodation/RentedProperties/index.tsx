import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import {AccommodationCard} from '../../../components'
import {Empty, Spin} from 'antd'
import "./style.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { useRecoilValue, useResetRecoilState} from "recoil";
import { rentedPropertiesState, searchRentedState } from "../../../store";
import useRentedPropertiesHook from "./actionHandler";
import constants, {ROUTES_CONSTANTS} from '../../../config/constants';


const RentedProperties = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const {MEDIA_URL} = constants;
  const navigate = useNavigate();
  const location = useLocation();
  const {getRentedProperties} = useRentedPropertiesHook();
  const rentedProperties = useRecoilValue(rentedPropertiesState);
  const  rentedSearchText = useRecoilValue(searchRentedState);
  const resetRentedSearchText = useResetRecoilState(searchRentedState)
  const [loading, setLoading] = useState(false);



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    resetRentedSearchText()
    getRentedProperties(rentedSearchText, setLoading)
  }, [])

  useEffect(() => {
    getRentedProperties(rentedSearchText, setLoading)
  }, [rentedSearchText])


    /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleDetailClick = (propertyId: any) => navigate(`/property/${propertyId}`, {state: {from: location.pathname}})



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="rented-properties">
      <Spin spinning={loading} indicator={<LoadingOutlined />}>
        <div className="shs-row placeholder-height">
          {rentedProperties?.map((property:any) => {
            let tags: any[] = [];
            if(property?.allBillsIncluded) tags.push('Utility Bils');
            if(property?.propertyHas?.includes("washingMachine")) tags.push("Laundry");

            return (
              <div key={property.id} className="shs-col-5">
                <AccommodationCard
                  coverPhoto={`${MEDIA_URL}/${property?.coverImageData?.mediaId}.${property?.coverImageData?.metaData.extension}`}
                  offer={property?.offer?.monthlyDiscount}
                  rent={property?.rent}
                  propertyAvailableFor={property?.rentFrequency}
                  propertyType={property?.propertyType}
                  totalBedrooms={property?.totalBedrooms}
                  totalBathrooms={property?.totalBathrooms}
                  address={property?.addressOne}
                  tags={tags}
                  onSave={() => console.log('handle clik')}
                  onDetail={() => handleDetailClick(property.id)}
                  onChat={() => navigate(`/${ROUTES_CONSTANTS.CHAT}`)}
                />
              </div>
            )
          })}
          {rentedProperties?.length === 0 && !loading &&
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