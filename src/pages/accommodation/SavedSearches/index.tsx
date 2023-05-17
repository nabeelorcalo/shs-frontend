import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import {Empty, Spin} from 'antd'
import { AccommodationCard } from '../../../components'
import "./style.scss";
import thumb1 from '../../../assets/images/gallery/thumb1.png'
import { useRecoilValue} from "recoil";
import { savedPropertiesState } from "../../../store";
import useSavedPropertiesHook from "./actionHandler";
import {ROUTES_CONSTANTS} from '../../../config/constants'


const SavedSearches = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate();
  const location = useLocation();
  const {getSavedProperties} = useSavedPropertiesHook();
  const savedProperties= useRecoilValue(savedPropertiesState);
  const [loading, setLoading] = useState(false);



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    getSavedProperties(setLoading)
  }, [])


  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleDetailClick = (propertyId: any) => navigate(`/property/${propertyId}`, {state: {from: location.pathname}})



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="saved-searches">
      <Spin spinning={loading}>
        <div className="shs-row placeholder-height">
          {savedProperties?.map((item:any) => {
            let tags: any[] = [];
            if(item.allBillsIncluded) tags.push('Utility Bils');
            if(item.propertyHas?.includes("washingMachine")) tags.push("Laundry");

            return (
              <div key={item.id} className="shs-col-5">
                <AccommodationCard
                  coverPhoto={thumb1}
                  offer={item.offer?.monthlyDiscount}
                  rent={item.rent}
                  propertyAvailableFor={item.rentFrequency}
                  propertyType={item.propertyType}
                  totalBedrooms={item.totalBedrooms}
                  totalBathrooms={item.totalBathrooms}
                  address={item.addressOne}
                  tags={tags}
                  onSave={() => console.log('handle clik')}
                  onDetail={() => handleDetailClick(item.id)}
                  onChat={() => navigate(`/${ROUTES_CONSTANTS.CHAT}`)}
                />
              </div>
            )
          })}
          {!savedProperties?.length && !loading &&
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