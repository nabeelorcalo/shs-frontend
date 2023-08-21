import { Row, Col } from "antd";
import { useEffect, useRef, useState } from "react";
import { AttendanceAndListingGraph, CountingCard, FavouritesViewCard, Loader, PageHeader } from "../../../components";
import ReservationsTable from "./ReservationsTable";
import "../style.scss";
import { gutter } from "..";
import useCustomHook from "../actionHandler";

const Agent = () => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
  const {
    isLoading,
    //countingCard data
    agentDashboardWidgets,
    getAgentDashboardWidget,
    getSavedViewProperties,
    agentDashboardPropertiesSaveView: { totalViews = 0, favourites = 0 },
    // agent Dashboard Listing Graph
    getAgentListingGraph,
    agentListingGraph,
    // agent reservation table
    getReservationTableData,
    agentReservation,
  } = useCustomHook();

  useEffect(() => {
    if (shouldLoogged.current) {
      shouldLoogged.current = false;
      getAgentDashboardWidget();
      getAgentListingGraph();
      getReservationTableData();
      getSavedViewProperties();
    }
  }, []);

  return <>
    <PageHeader bordered title="Dashboard" />
    <Row gutter={gutter}>
      <Col xs={24}>
        <CountingCard
          totalListings={agentDashboardWidgets?.totalProperties ?? 0}
          occupiedProperties={agentDashboardWidgets?.totalOccupiedProperties ?? 0}
          reservedProperties={agentDashboardWidgets?.totalReservedProperties ?? 0}
          vacantProperties={agentDashboardWidgets?.totalVacantProperties ?? 0}
          isSeprate
        />
      </Col>

      <Col xs={24} xl={12}>
        <Row gutter={gutter}>
          <Col xs={24}>
            <FavouritesViewCard totalViews={totalViews} favourites={favourites} />
          </Col>
          <Col xs={24}>
            <AttendanceAndListingGraph
              listingsData={agentListingGraph}
              title="Listings"
              level={4}
              graphName="listings"
              styling={{ height: 418 }}
            />
          </Col>
        </Row>
      </Col>
      <Col xs={24} xl={12}>
        <ReservationsTable agentReservation={agentReservation} loading={isLoading} />
      </Col>
    </Row>
  </>
};

export default Agent;
