import React from "react";
import api from "../../api";
import apiEndpints from "../../config/apiEndpoints";
import constants from "../../config/constants";
import {
  getListingGraphState,
  getListingState,
  getPropertAgents,
  getPropertyAgentState,
  getRecentActivities,
  getRecentListingState,
} from "../../store/getListingState";
import { useRecoilState } from "recoil";

const useCustomHook = () => {
  const [propertListingData, setPropertListingData] =useRecoilState(getListingState);
  const [totalData, setTotalData] = useRecoilState(getPropertAgents);
  const [recentListing, setRecentLisiting] = useRecoilState(getRecentListingState);
  const [generalActivity, setGeneralActivity] =useRecoilState(getRecentActivities);
  const [allPropertyAgents, setAllPropertyAgents] =useRecoilState(getPropertyAgentState);
  const [getStatGraph, setGetStatsGraph] = useRecoilState(getListingGraphState);

  const {
    PROPERTY_GET_LISTING_STATS,
    PROPERTY_Get_TOTAL_AGENTS,
    GET_RECENT_LISTING,
    GET_GENERAL_ACTIVITY,
    GET_PROPERTY_AGENTS,
    GET_LISTING_STATS_FOR_GRAPH
  } = apiEndpints;
  const propertgetlistingstata = async () => {
    const { data } = await api.get(PROPERTY_GET_LISTING_STATS);
    setPropertListingData(data);
  };

  // propertagents
  const propertGetTotalAgents = async () => {
    const { data } = await api.get(PROPERTY_Get_TOTAL_AGENTS);
    setTotalData(data);
  };

  // GET Recent Listing
  const getRecentListing = async () => {
    const { data } = await api.get(GET_RECENT_LISTING);
    setRecentLisiting(data);
  };

  // genral activity
  const generalActivityData = async () => {
    const { data } = await api.get(GET_GENERAL_ACTIVITY);
    setGeneralActivity(data);
  };

  // allpropertyAgents
  const getPropertyAgents = async () => {
    const { data } = await api.get(GET_PROPERTY_AGENTS);
    setAllPropertyAgents(data)
  }

  // graph
  const getAllStatsGraph = async () => {
    const { data } = await api.get(GET_LISTING_STATS_FOR_GRAPH);
    setGetStatsGraph(data);
  
  }

  return {
    propertgetlistingstata,
    propertGetTotalAgents,
    getRecentListing,
    generalActivityData,
    getPropertyAgents,
    getAllStatsGraph,
    getStatGraph
  };
};

export default useCustomHook;
