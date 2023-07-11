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
import jsPDF from "jspdf";
import csv from "../../helpers/csv";

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
  const [allListing, setAllListing] = useRecoilState(getAllListingState);

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
    GET_ALL_LISTINGS,
    BLOCK_PROPERTY_ACCESS,
    UNBLOCK_PROPERTY_ACCESS,
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
  const generalActivityData = async (param: any) => {
    const { data } = await api.get(GET_GENERAL_ACTIVITY, param);
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

  const getAllListingData = async (param: any) => {
    const { data } = await api.get(GET_ALL_LISTINGS, param);
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
      `${UPDATE_PUBLICATION_STATUS}?propertyId=${parseInt(
        propertyId
      )}&publicationStatus=${publicationStatus}`
    );
    return response;
  };

  const didParseCell = async (item: any) => {
    if (item.row.section === "head")
      item.cell.styles.fillColor = [230, 244, 249];
    else item.cell.styles.fillColor = false;
  };
  const didDrawCell = async (item: any) => {
    if (item.column.dataKey === 2 && item.section === "body") {
      const xPos = item.cell.x;
      const yPos = item.cell.y;
      var dim = 20;
    }
  };

  const downloadPdfOrCsv = (
    event: any,
    header: any,
    data: any,
    fileName: any,
    body: any
  ) => {
    if (event === "pdf" || event === "Pdf")
      pdf(`${fileName}`, header, data, body);
    else csv(`${fileName}`, header, data, false);
  };

  const pdf = (fileName: string, header: any, data: any, body: any) => {
    const title = fileName;
    const unit = "pt";
    const size = "A4";
    const orientation = "landscape";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    doc.text(title, marginLeft, 40);
    doc.autoTable({
      head: [header],
      body: body,
      margin: { top: 50 },
      headStyles: {
        fillColor: [230, 244, 249],
        textColor: [20, 20, 42],
        fontStyle: "normal",
        fontSize: 12,
      },
      didParseCell: didParseCell,
      didDrawCell: didDrawCell,
    });

    doc.save(`${fileName}.pdf`);
  };

  const propertyAgentAccess = async (
    email: any,
    values: any,
    onSuccess?: () => void
  ) => {
    const response = await api.patch(
      `${
        values?.access === "block"
          ? BLOCK_PROPERTY_ACCESS
          : UNBLOCK_PROPERTY_ACCESS
      }?email=${email}`
    );
    if (onSuccess) onSuccess();
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
    allListing,
    downloadPdfOrCsv,
    propertyAgentAccess,
  };
};

export default useCustomHook;
