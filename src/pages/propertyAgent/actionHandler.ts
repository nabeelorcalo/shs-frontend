import React from "react";
import api from "../../api";
import apiEndpints from "../../config/apiEndpoints";
import constants from "../../config/constants";
import { getListingState, getPropertAgents } from "../../store/getListingState";
import { useRecoilState } from "recoil";
import {useEffect} from 'react';
            
const useCustomHook = () => {
  const [propertListingData, setPropertListingData] = useRecoilState(getListingState);
  const [totalData, setTotalData] = useRecoilState(getPropertAgents);
 
  const { PROPERTY_GET_LISTING_STATS,  PROPERTY_Get_TOTAL_AGENTS } = apiEndpints;
  const propertgetlistingstata = async () => {
    const { data } = await api.get(PROPERTY_GET_LISTING_STATS);
    setPropertListingData(data);
  }
    useEffect(() => {
      propertgetlistingstata();
    }, [])
  
  // propertagents
  const propertGetTotalAgents= async () => {
    const { data } = await api.get(PROPERTY_Get_TOTAL_AGENTS );
    setTotalData(data);
  }
    useEffect(() => {
      propertGetTotalAgents();
    }, [])
  
  return {
    propertListingData,
    totalData,
  };
};

export default useCustomHook;