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
  PageHeader,
} from "../../../components";
import constants from "../../../config/constants";
import {
  PerformanceAnalyticsData,
  topPerformers,
  universityList,
} from "./mockData";
import "../style.scss";
import { gutter } from "..";
import { useRecoilValue } from "recoil";
import {
  announcementDataState,
  currentUserRoleState,
  currentUserState,
} from "../../../store";
import useCustomHook from "../companyAdmin/actionHandler";

const Manager = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const action = useCustomHook();
  const announcementData: any = useRecoilValue(announcementDataState);
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
  const userData = useRecoilValue(currentUserState);

  const handleAddAnnouncement = () => {
    setIsShowModal(true);
  };
  useEffect(() => {
    console.log("userData", announcementData);
    action.getData();
  }, []);
  return (
    <>
      <PageHeader
        title={
          <div className="font-medium">
            It's good to have you back,&nbsp;
            <span className="page-header-secondary-color">
              {" "}
              {userData.firstName + " " + userData.lastName}
            </span>
          </div>
        }
      />
      <Row gutter={gutter}>
        <Col xs={24} sm={24} xl={17} xxl={19}>
          <Row className="rounded-2xl bg-white wrapper-shadow">
            <Col xs={24} lg={9} xl={10} className="p-5">
              <CountingCard
                totalInterns={33}
                present={6}
                myInterns={9}
                onLeave={3}
              />
            </Col>
            <Col xs={24} lg={15} xl={14}>
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
                  style={{ height: 300 }}
                />
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} xl={7} xxl={5}>
          <TopPerformers topPerformersList={topPerformers} />
        </Col>
        <Col xs={24} sm={24} xl={6} xxl={7}>
          <AnnouncementList
            data={announcementData}
            role={role}
            handleAddAnnouncement={handleAddAnnouncement}
            height={460}
          />
        </Col>

        <Col xs={24} sm={24} lg={24} xl={18} xxl={12}>
          <Row gutter={gutter}>
            <Col xs={24}>
              <AttendanceAndListingGraph
                title="Listing"
                level={4}
                graphName="attendance"
                styling={{ height: 228 }}
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

        <Col xs={24} xxl={5}>
          <Row gutter={gutter}>
            <Col xs={24} lg={12} xxl={24}>
              <LeaveDetails
                title={"Who’s Away"}
                date={"10 Nov, 2022"}
                sickLeaves={["", "", "", ""]}
                casualLeaves={["", "", ""]}
                medicalLeaves={[""]}
                workFromHome=""
              />
            </Col>
            <Col xs={24} lg={12} xxl={24}>
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

export default Manager;
