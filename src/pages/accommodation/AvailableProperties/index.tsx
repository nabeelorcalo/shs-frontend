import {useState, useEffect} from "react";
import {useNavigate, useLocation} from 'react-router-dom';
import {AccommodationCard, Notifications} from '../../../components';
import {Empty, Spin} from 'antd';
import {LoadingOutlined} from "@ant-design/icons";
import {useRecoilValue, useResetRecoilState} from "recoil";
import {filterParamsState} from "../../../store";
import useAvailablePropertiesHook from "./actionHandler";
import useAccommodationHook from "../actionHandler";
import constants, {ROUTES_CONSTANTS} from '../../../config/constants';
import "./style.scss";


const AvailableProperties = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const {MEDIA_URL} = constants;
  const navigate = useNavigate();
  const location = useLocation();
  const { getAvailableProperties, availableProperties } = useAvailablePropertiesHook();
  const filterParams = useRecoilValue(filterParamsState);
  const resetFilterParams = useResetRecoilState(filterParamsState);
  const [loading, setLoading] = useState(false);
  const { saveProperty, unsaveProperty } = useAccommodationHook();
  const [isSave, setIsSave] = useState(false);
  const [firstRender, setFirstRender] = useState(true);


  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    resetFilterParams();
    getAvailableProperties(setLoading, {});
  }, []);

  useEffect(() => {
    if(firstRender) {
      setFirstRender(false)
    } else {
      getAvailableProperties(setLoading, filterParams);
    }
  }, [isSave, filterParams])
  

  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const postSaveProperty = async (propertyId:any, agentId:any) => {
    setLoading(true)
    const response = await saveProperty({propertyId: propertyId, agentId: agentId});
    setLoading(false)
    if(!response.error) {
      Notifications({ title: 'Success', description: response.message, type: 'success' })
      setIsSave(!isSave)
    }
  }

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
                  isSave={property?.isSaved}
                  onRemoveSave={() => postUnsaveProperty(property?.id, property?.userId)}
                  onSave={() => postSaveProperty(property?.id, property?.userId)}
                  onDetail={() => handleDetailClick(property?.id)}
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
export default AvailableProperties;
