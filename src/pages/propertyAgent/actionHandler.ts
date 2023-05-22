import React from "react";
import api from "../../api";
import apiEndpints from "../../config/apiEndpoints";
import constants from "../../config/constants";
import { getListingState, getPropertAgents, getRecentListingState } from "../../store/getListingState";
import { useRecoilState } from "recoil";
            
const useCustomHook = () => {
  const [propertListingData, setPropertListingData] = useRecoilState(getListingState);
  const [totalData, setTotalData] = useRecoilState(getPropertAgents);
  const [recentListing, setRecentLisiting] = useRecoilState(getRecentListingState)

  const { PROPERTY_GET_LISTING_STATS,  PROPERTY_Get_TOTAL_AGENTS, GET_RECENT_LISTING } = apiEndpints;
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
    console.log(data, '><>>data from recent<><');
    setRecentLisiting(data);
  }
  
  return {
    propertgetlistingstata,
    propertGetTotalAgents,
    getRecentListing
  };
};

export default useCustomHook;