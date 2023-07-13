import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import {Empty, Spin} from 'antd';
import { LoadingOutlined } from "@ant-design/icons";
import { AccommodationCard, Notifications } from '../../../components';
import { useRecoilValue, useResetRecoilState} from "recoil";
import { filterParamsState } from "../../../store";
import useSavedPropertiesHook from "./actionHandler";
import constants, {ROUTES_CONSTANTS} from '../../../config/constants';
import "./style.scss";
import useAccommodationHook from "../actionHandler"


const SavedSearches = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const {MEDIA_URL} = constants;
  const navigate = useNavigate();
  const location = useLocation();
  const {getSavedProperties, savedProperties} = useSavedPropertiesHook();
  const filterParams = useRecoilValue(filterParamsState);
  const resetFilterParams = useResetRecoilState(filterParamsState);
  const [loading, setLoading] = useState(false);
  const { unsaveProperty } = useAccommodationHook();
  const [isSave, setIsSave] = useState(false);
  const [firstRender, setFirstRender] = useState(true);



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    resetFilterParams();
    getSavedProperties(setLoading, {})
  }, []);

  useEffect(() => {
    if(firstRender) {
      setFirstRender(false)
    } else {
      getSavedProperties(setLoading, filterParams)
    }
  }, [isSave, filterParams])



  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const postUnsaveProperty = async (propertyId:any, agentId:any) => {
    setLoading(true)
    const response = await unsaveProperty({propertyId: propertyId, agentId: agentId});
    setLoading(false)
    if(!response.error) {
      Notifications({ title: 'Success', description: response.message, type: 'success' })
      setIsSave(!isSave)
    }
  }



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleDetailClick = (propertyId: any) => navigate(`/property/${propertyId}`, {state: {from: location.pathname}})


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="saved-searches">
      <Spin spinning={loading} indicator={<LoadingOutlined />}>
        <div className="shs-row placeholder-height">
          {savedProperties?.map((property:any) => {
            let tags: any[] = [];
            if(property?.allBillsIncluded) tags.push('Utility Bils');
            if(property?.propertyHas?.includes("washingMachine")) tags.push("Laundry");

            return (
              <div key={property.id} className="shs-col-5">
                <AccommodationCard
                  coverPhoto={`${MEDIA_URL}/${property?.coverImageData?.mediaId}.${property?.coverImageData?.metaData?.extension}`}
                  offer={property?.offer?.monthlyDiscount > 0 ? property?.offer?.monthlyDiscount : null}
                  rent={property?.rent}
                  propertyAvailableFor={property?.rentFrequency}
                  propertyType={property?.propertyType}
                  totalBedrooms={property?.totalBedrooms}
                  totalBathrooms={property?.totalBathrooms}
                  address={property?.addressOne}
                  tags={tags}
                  isSave={true}
                  onRemoveSave={() => postUnsaveProperty(property?.id, property?.userId)}
                  onDetail={() => handleDetailClick(property.id)}
                  onChat={() => navigate(`/${ROUTES_CONSTANTS.CHAT}`)}
                />
              </div>
            )
          })}
          {savedProperties?.length === 0 && !loading &&
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