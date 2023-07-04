import React from "react";
import api from "../../api";
import apiEndpints from "../../config/apiEndpoints";
import constants from "../../config/constants";
import {
  getAllListingState,
  getListingGraphState,
  getListingState,
  getPropertAgents,
  getPropertyAgentState,
  getRecentActivities,
  getRecentListingState,
} from "../../store/getListingState";
import { useRecoilState } from "recoil";
import { Notifications } from "../../components";

const useCustomHook = () => {
  const [propertListingData, setPropertListingData] =
    useRecoilState(getListingState);
  const [totalData, setTotalData] = useRecoilState(getPropertAgents);
  const [recentListing, setRecentLisiting] = useRecoilState(
    getRecentListingState
  );
  const [generalActivity, setGeneralActivity] =
    useRecoilState(getRecentActivities);
  const [allPropertyAgents, setAllPropertyAgents] = useRecoilState(
    getPropertyAgentState
  );
  const [getStatGraph, setGetStatsGraph] = useRecoilState(getListingGraphState);
  const [allListing,setAllListing] = useRecoilState(getAllListingState)

  const {
    PROPERTY_GET_LISTING_STATS,
    PROPERTY_Get_TOTAL_AGENTS,
    GET_RECENT_LISTING,
    GET_GENERAL_ACTIVITY,
    GET_PROPERTY_AGENTS,
    GET_LISTING_STATS_FOR_GRAPH,
    FORGOTPASSWORD,
    UPDATE_PUBLICATION_STATUS,
    UPDATE_VERIFICATION_STATUS,
    GET_ALL_LISTINGS
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
  const getPropertyAgents = async (param: any) => {
    const { data } = await api.get(GET_PROPERTY_AGENTS, param);
    setAllPropertyAgents(data);
  };

  // graph
  const getAllStatsGraph = async () => {
    const { data } = await api.get(GET_LISTING_STATS_FOR_GRAPH);
    setGetStatsGraph(data);
  };

  // GET ALL LISTING

  const getAllListingData = async (param:any) => {
    const { data } = await api.get(GET_ALL_LISTINGS,param);
    setAllListing(data);
  };
  
  const forgotpassword = async (body: any): Promise<any> => {
    const { data } = await api.post(FORGOTPASSWORD, body);
    return data;
  };

  const updateStatus = async (propertyId: any, publicationStatus: any) => {
    const responseOne = await api.patch(
      `${UPDATE_VERIFICATION_STATUS}?propertyId=${propertyId}&verificationStatus=checked`
    );
    console.log(responseOne, "responseOne");
    const response = await api.patch(
      `${UPDATE_PUBLICATION_STATUS}?propertyId=${parseInt(propertyId)}&publicationStatus=${publicationStatus}`
    );
    return response;
  };

  return {
    propertgetlistingstata,
    propertGetTotalAgents,
    getRecentListing,
    generalActivityData,
    getPropertyAgents,
    getAllStatsGraph,
    getStatGraph,
    forgotpassword,
    updateStatus,
    getAllListingData,
    allListing
  };
};

export default useCustomHook;
