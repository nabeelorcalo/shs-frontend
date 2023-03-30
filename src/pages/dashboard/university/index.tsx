import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import {
  AnnouncementList,
  AnnouncementModal,
  AttendanceAndListingGraph,
  BirthdayWishes,
  CountingCard,
  LeaveDetails,
  MonthlyPerfomanceChart,
  TopPerformers,
  UniversityCard,
  PageHeader
} from "../../../components";
import userData from "../../../config/constants";
import {
  PerformanceAnalyticsData,
  topPerformers,
  universityList,
} from "./mockData";
import "../style.scss";
import { gutter } from "..";

const University = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
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

    fetch(
      "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    )
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
      .catch(() => { });
  };

  const handleAddAnnouncement = () => {
    setIsShowModal(true);
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <>
      <PageHeader
        title={
          <div className="font-medium">
            It's good to have you back,&nbsp;
            <span className="page-header-secondary-color">Maria Sanoid</span>
          </div>
        }
      />
      <Row gutter={gutter}>
        <Col xs={24} >
          <CountingCard
            totalInterns={33}
            present={6}
            myInterns={9}
            onLeave={3}
            isSeprate
          />
        </Col>
        <Col xs={24} sm={24} xl={17} xxl={19}>
          <Row className="rounded-2xl bg-white wrapper-shadow">

            <Col xs={24} lg={16} xl={14}>
              <div className="p-5">
                <MonthlyPerfomanceChart
                  XField="city"
                  YField="value"
                  color={["#9BD5E8", "#F08D97", "#78DAAC"]}
                  columnStyle={{
                    radius: [20, 20, 0, 0],
                  }}
                  columnWidthRatio={0.2}
                  data={PerformanceAnalyticsData}
                  fontSize="20px"
                  fontWeight="500"
                  heading="Performance Analytics"
                  isGroup
                  marginRatio=".5"
                  seriesField="type"
                  textColor="#4E4B66"
                  style={{ height: 285 }}
                />
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} xl={7} xxl={5}>
          <TopPerformers topPerformersList={topPerformers} />
        </Col>

        <Col xs={24} sm={24} lg={24} xl={18} xxl={12}>
          <Row gutter={gutter}>
            <Col xs={24}>
              <AttendanceAndListingGraph
                title="Listing"
                level={4}
                graphName="attendance"
                styling={{ height: 230 }}
              />
            </Col>
            <Col xs={24}>
              <Row gutter={gutter} justify="space-between">
                {universityList?.map(({ logo, title, peopleList }) => (
                  <Col flex={1}>
                    <UniversityCard
                      logo={logo}
                      title={title}
                      maxCount={6}
                      list={peopleList}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default University;
