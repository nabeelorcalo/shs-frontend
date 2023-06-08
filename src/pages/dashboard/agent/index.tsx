import { Row, Col } from "antd";
import { useEffect, useRef, useState } from "react";
import { AttendanceAndListingGraph, CountingCard, FavouritesViewCard, PageHeader } from "../../../components";
import ReservationsTable from "./ReservationsTable";
import "../style.scss";
import { gutter } from "..";
import useCustomHook from "../actionHandler";

const Agent = () => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
  const {
    //countingCard data
    countingCardData: { totalProperties, totalVacantProperties, totalReservedProperties, totalOccupiedProperties },
  } = useCustomHook();

  const [state, setState] = useState({
    list: [],
    loading: false,
  });

  const loadMoreData = () => {
    setState((prevState) => {
      return {
        ...prevState,
        loading: !state.loading,
      };
    });

    fetch("https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo")
      .then((res) => res.json())
      .then((body) => {
        setState((prevState) => {
          return {
            ...prevState,
            list: body.results,
            loading: !state.loading,
          };
        });
      })
      .catch(() => {});
  };


  useEffect(() => {
    if (shouldLoogged.current) {
      shouldLoogged.current = false;
      loadMoreData();
    }
  }, []);

  return (
    <>
      <PageHeader bordered title="Dashboard" />
      <Row gutter={gutter}>
        <Col xs={24}>
          <CountingCard
            totalListings={totalProperties}
            occupiedProperties={totalOccupiedProperties}
            reservedProperties={totalReservedProperties}
            vacantProperties={totalVacantProperties}
            isSeprate
          />
        </Col>

        <Col xs={24} xl={12}>
          <Row gutter={gutter}>
            <Col xs={24}>
              <FavouritesViewCard totalViews={33} favourites={6} />
            </Col>
            <Col xs={24}>
              <AttendanceAndListingGraph title="Listing" level={4} graphName="listings" styling={{ height: 418 }} />
            </Col>
          </Row>
        </Col>
        <Col xs={24} xl={12}>
          <ReservationsTable />
        </Col>
      </Row>
    </>
  );
};

export default Agent;
