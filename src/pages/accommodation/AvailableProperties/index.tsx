import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { AccommodationCard, Loader, Notifications } from '../../../components';
import {Empty, Spin} from 'antd';
import { LoadingOutlined } from "@ant-design/icons";
import { useRecoilValue, useRecoilState, useResetRecoilState} from "recoil";
import { availablePropertiesState, filterParamsState } from "../../../store";
import useAvailablePropertiesHook from "./actionHandler";
import useAccommodationHook from "../actionHandler"
import constants, {ROUTES_CONSTANTS} from '../../../config/constants'
import "./style.scss";



const AvailableProperties = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const {MEDIA_URL} = constants;
  const navigate = useNavigate();
  const location = useLocation();
  const { getAvailableProperties } = useAvailablePropertiesHook();
  const availableProperties = useRecoilValue(availablePropertiesState);
  const filterParams = useRecoilValue(filterParamsState);
  const resetFilterParams = useResetRecoilState(filterParamsState);
  const [loading, setLoading] = useState(false);
  const { saveProperty } = useAccommodationHook();



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    resetFilterParams()
    getAvailableProperties(setLoading)
  }, [])

  useEffect(() => {
    getAvailableProperties(setLoading, filterParams)
  }, [filterParams])
  

  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const postSaveProperty = async (id:any) => {
    setLoading(true)
    const { response } = await saveProperty({propertyId: id});
    setLoading(false)
    if(!response.error) {
      return (
        Notifications({ title: 'Success', description: response.message, type: 'success' })
      )
    }
  }


  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleDetailClick = (propertyId: any) => navigate(`/${ROUTES_CONSTANTS.PROPERTY_DETAIL}/${propertyId}`, {state: {from: location.pathname}})



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="available-properties">
      <Spin spinning={loading} indicator={<LoadingOutlined />}>
        <div className="shs-row placeholder-height">
          {availableProperties?.map((property:any) => {
            let tags: any[] = [];
            if(property.allBillsIncluded) tags.push('Utility Bils');
            if(property.propertyHas?.includes("washingMachine")) tags.push("Laundry");

            return (
              <div key={property.id} className="shs-col-5">
                <AccommodationCard
                  coverPhoto={`${MEDIA_URL}/${property?.coverImageData?.mediaId}.${property?.coverImageData?.metaData.extension}`}
                  offer={property?.offer?.monthlyDiscount > 0 ? property?.offer?.monthlyDiscount : null}
                  rent={property?.rent}
                  propertyAvailableFor={property?.rentFrequency}
                  propertyType={property?.propertyType}
                  totalBedrooms={property?.totalBedrooms}
                  totalBathrooms={property?.totalBathrooms}
                  address={property?.addressOne}
                  tags={tags}
                  onSave={() => postSaveProperty(property.id)}
                  onDetail={() => handleDetailClick(property.id)}
                  onChat={() => navigate(`/${ROUTES_CONSTANTS.CHAT}`)}
                />
              </div>
            )
          })}
          {availableProperties.length === 0 && !loading &&
            <div className="shs-col-full">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          }
        </div>
      </Spin>
    </div>
  )
}

export default AvailableProperties