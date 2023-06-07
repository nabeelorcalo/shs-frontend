import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import {Empty, Spin} from 'antd';
import { AccommodationCard, Loader } from '../../../components';
import "./style.scss";
import { useRecoilValue, useResetRecoilState} from "recoil";
import { filterParamsState } from "../../../store";
import useSavedPropertiesHook from "./actionHandler";
import constants, {ROUTES_CONSTANTS} from '../../../config/constants';


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



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    resetFilterParams()
    getSavedProperties(setLoading)
  }, [])

  useEffect(() => {
    getSavedProperties(setLoading, filterParams)
  }, [filterParams])



  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleDetailClick = (propertyId: any) => navigate(`/property/${propertyId}`, {state: {from: location.pathname}})


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="saved-searches">
      <Spin spinning={loading} indicator={<Loader />}>
        <div className="shs-row placeholder-height">
          {savedProperties?.map((property:any) => {
            let tags: any[] = [];
            if(property?.allBillsIncluded) tags.push('Utility Bils');
            if(property?.propertyHas?.includes("washingMachine")) tags.push("Laundry");

            return (
              <div key={property.id} className="shs-col-5">
                <AccommodationCard
                  coverPhoto={`${MEDIA_URL}/${property?.coverImageData?.mediaId}.${property?.coverImageData?.metaData?.extension}`}
                  offer={property.offer?.monthlyDiscount}
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