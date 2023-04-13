import { Row, Col } from "antd";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../../store";
import { gutter } from "..";
import {
  AnnouncementList,
  BirthdayWishes,
  InternshipSummaryChart,
  LeaveDetails,
  MonthlyPerfomanceChart,
  AnnouncementModal,
  CountingCard,
  TopPerformers,
  UniversityCard,
  AttendanceAndListingGraph,
  PageHeader,
} from "../../../components";
import "../style.scss";
import {
  PerformanceAnalyticsData,
  topPerformers,
  universityList,
} from "./mockData";
import PiplineTable from "./PiplineTable";
import Constants from "../../../config/constants";

const CompanyAdmin = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [state, setState] = useState({
    list: [],
    loading: false,
    birthdayWishlist: [
      {
        avatar:
          "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
        date: "Jennie Duncan",
        id: 1,
        name: "Jennie Duncan",
      },
      {
        avatar:
          "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
        date: "Jennie Duncan",
        id: 2,
        name: "Duncan",
      },
      {
        avatar:
          "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
        date: "Jennie Duncan",
        id: 3,
        name: "Jennien",
      },
    ],
  });
  const role = useRecoilValue(currentUserRoleState);

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
      .catch(() => {});
  };
  const handleAddAnnouncement = () => {
    setIsShowModal(true);
  };
  const handleSelect = (value: string) => {};
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
        <Col xs={24} xl={15} xxl={16}>
          <PiplineTable handleSelect={handleSelect} />
        </Col>
        <Col xs={24} xl={9} xxl={8}>
          <InternshipSummaryChart
            autoFit
            barStyle={{
              lineCap: "round",
            }}
            colorField="name"
            heading="Internships Summary"
            innerRadius={0.5}
            intervalPadding={9.1}
            maxAngle={360}
            padding="auto"
            radius={0.8}
            xAxis={{
              label: null,
            }}
            xField="name"
            yField="star"
            height={315}
          />
        </Col>
        <Col xs={24}>
          <CountingCard
            totalApplicants={33}
            totalUniversities={6}
            totalInternsComapany={9}
            totalManagers={3}
            isSeprate={true}
          />
        </Col>
        <Col xs={24} xl={8} xxl={6}>
          <AnnouncementList
            data={state.list}
            loading={state.loading}
            loadMoreData={loadMoreData}
            role={role}
            handleAddAnnouncement={handleAddAnnouncement}
            height={460}
          />
        </Col>
        <Col xs={24} md={24} xl={16} xxl={13}>
          <Row gutter={gutter} className="flex-col">
            <Col>
              <div className="bg-white rounded-2xl p-5 wrapper-shadow">
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
                  style={{ height: 235 }}
                />
              </div>
            </Col>

            <Col xs={24}>
              <AttendanceAndListingGraph
                title="Attendance"
                level={4}
                graphName="attendance"
                styling={{ height: 230 }}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} xl={24} xxl={5}>
          <Row gutter={gutter}>
            <Col xs={24} xl={12} xxl={24}>
              <TopPerformers
                topPerformersList={topPerformers}
                user={Constants?.COMPANY_ADMIN}
              />
            </Col>
            <Col xs={24} xl={12} xxl={24}>
              <LeaveDetails
                title={"Who’s Away"}
                sickLeaves={["", "", "", ""]}
                casualLeaves={["", "", ""]}
                medicalLeaves={[""]}
                workFromHome=""
                date="10 Nov, 2023"
                user={Constants?.COMPANY_ADMIN}
              />
            </Col>
          </Row>
        </Col>

        <Col xs={24}>
          <Row gutter={gutter} align="middle">
            <Col xs={24} lg={24} xl={24} xxl={19}>
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
            <Col xs={24} lg={24} xxl={5}>
              <BirthdayWishes wishList={state.birthdayWishlist} />
            </Col>
          </Row>
        </Col>
      </Row>
      <AnnouncementModal
        isShowModal={isShowModal}
        close={() => setIsShowModal(false)}
      />
    </>
  );
};

export default CompanyAdmin;
