import React from "react";
import api from "../../api";
import apiEndpints from "../../config/apiEndpoints";
import constants from "../../config/constants";
import { getListingState, getPropertAgents, getRecentActivities, getRecentListingState } from "../../store/getListingState";
import { useRecoilState } from "recoil";
            
const useCustomHook = () => {
  const [propertListingData, setPropertListingData] = useRecoilState(getListingState);
  const [totalData, setTotalData] = useRecoilState(getPropertAgents);
  const [recentListing, setRecentLisiting] = useRecoilState(getRecentListingState)
  const [generalActivity, setGeneralActivity] = useRecoilState(getRecentActivities);

  const { PROPERTY_GET_LISTING_STATS,  PROPERTY_Get_TOTAL_AGENTS, GET_RECENT_LISTING , GET_GENERAL_ACTIVITY} = apiEndpints;
  const propertgetlistingstata = async () => {
    const { data } = await api.get(PROPERTY_GET_LISTING_STATS);
    setPropertListingData(data);
  }
   
  // propertagents
  const propertGetTotalAgents= async () => {
    const { data } = await api.get(PROPERTY_Get_TOTAL_AGENTS );
    setTotalData(data);
  }

  // GET Recent Listing
   
  const getRecentListing = async () => {
    const {data} = await api.get(GET_RECENT_LISTING);
    setRecentLisiting(data);
  }

  // genral activity
  const generalActivityData = async () => {
    const { data } = await api.get(GET_GENERAL_ACTIVITY);
    setGeneralActivity(data);
   }
  
  return {
    propertgetlistingstata,
    propertGetTotalAgents,
    getRecentListing,
    generalActivityData
  };
};

export default useCustomHook;