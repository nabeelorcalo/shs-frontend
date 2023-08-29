import { useState } from "react";
import api from "../../../api";
import endpoints from "../../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import {
  agentDashboardListingGraphState,
  agentDashboardWidgetsState,
  agentReservationState,
  agentDashboardPropertiesSaveViewState,
} from "../../../store";
import dayjs from "dayjs";
const {
  AGENT_DASHBOARD_WIDGETS,
  AGENT_DASHBOARD_LISTING_GRAPH,
  GET_RESERVATIONS,
  PROPERTIESSAVEDVIEWCOUNT,
} = endpoints;

const useCustomHook = () => {
  // ============================== property agent Dashboard states ================================== //
  const [peopertyAgentLoaders, setPropertyAgentLoaders] = useState({
    isAgentDashboardWidgetLoading: false,
    isAgentListingGraphLoading: false,
    isAgentReservationLoading: false,
    isAgentDashboardPropertiesSaveViewLoading: false,
  });
  // dashboard attendence Average
  const [agentDashboardWidgets, setAgentDashboardWidget] = useRecoilState<any>(
    agentDashboardWidgetsState
  );
  // dashboard attendence Average
  const [
    agentDashboardPropertiesSaveView,
    setAgentDashboardPropertiesSaveView,
  ] = useRecoilState<any>(agentDashboardPropertiesSaveViewState);
  // agent Dashboard Listing Graph
  const [agentListingGraph, setAgentListingGraph] = useRecoilState<any>(
    agentDashboardListingGraphState
  );
  // agent reservation table data
  const [agentReservation, setAgentReservation] = useRecoilState<any>(
    agentReservationState
  );
  // ================XXXX========= property agent Dashboard states ==============XXXX================ //

  // ============================== property agent Dashboard functions ================================== //
  // agent dashboard
  const getAgentDashboardWidget = async () => {
    setPropertyAgentLoaders(prev => ({ ...prev, isAgentDashboardWidgetLoading: true }))
    await api.get(AGENT_DASHBOARD_WIDGETS).then((res: any) => {
      setAgentDashboardWidget(res?.data[0]);
    });
    setPropertyAgentLoaders(prev => ({ ...prev, isAgentDashboardWidgetLoading: false }))
  };
  // get agent Dashboard Listing Graph
  const getAgentListingGraph = async () => {
    setPropertyAgentLoaders(prev => ({ ...prev, isAgentListingGraphLoading: true }))
    await api.get(AGENT_DASHBOARD_LISTING_GRAPH).then((res: any) => {
      setAgentListingGraph(
        res?.data?.map((obj: any) => ({
          status:
            obj?.type === "all"
              ? "Reserved"
              : `${obj?.type.slice(0, 1).toUpperCase()}${obj?.type.slice(1)}`,
          month: obj?.month,
          value: obj?.value,
        }))
      );
    });
    setPropertyAgentLoaders(prev => ({ ...prev, isAgentListingGraphLoading: false }))
  };
  // get reservation table data
  const getReservationTableData = async () => {
    setPropertyAgentLoaders(prev => ({ ...prev, isAgentReservationLoading: true }))
    await api.get(GET_RESERVATIONS).then((res: any) => {

      setAgentReservation(
        res?.data?.map((obj: any) => ({
          key: obj?.id,
          name: `${obj?.tenant?.firstName} ${obj?.tenant?.lastName}`,
          bookingDates: `${dayjs(obj?.bookingStartDate).format(
            "DD/MM/YYYY"
          )} - ${dayjs(obj?.bookingEndDate).format("DD/MM/YYYY")}`,
          rent: `£${obj?.rent}`,
        }))
      );
    });
    setPropertyAgentLoaders(prev => ({ ...prev, isAgentReservationLoading: false }))
  };
  const getSavedViewProperties = async () => {
    setPropertyAgentLoaders(prev => ({ ...prev, isAgentDashboardPropertiesSaveViewLoading: true }))
    await api.get(PROPERTIESSAVEDVIEWCOUNT).then(({ data }: any) => {
      setAgentDashboardPropertiesSaveView({
        totalViews: data?.totalViews,
        favourites: data?.savedProperties,
      });
    });
    setPropertyAgentLoaders(prev => ({ ...prev, isAgentDashboardPropertiesSaveViewLoading: false }))
  };
  // =============XXXX============= property agent Dashboard functions ==============XXXX================ //

  return {
    peopertyAgentLoaders,
    // agent dashboard widgets
    getAgentDashboardWidget,
    agentDashboardWidgets,
    getSavedViewProperties,
    agentDashboardPropertiesSaveView,
    // agent Dashboard Listing Graph
    getAgentListingGraph,
    agentListingGraph,
    // agent reservation table
    getReservationTableData,
    agentReservation,
  };
};

export default useCustomHook;
