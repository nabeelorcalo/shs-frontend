import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Typography } from "antd";
import { MonthlyPerfomanceChart } from "../../../../components";
import { activityData, graphData, innerCard } from "./DashboardMock";
import useCustomHook from "../../actionHandler";
import {
  Approved,
  Clip,
  Pending,
  People,
  Reject,
} from "../../../../assets/images";
import "../../style.scss";
import { useRecoilState } from "recoil";
import {
  getListingGraphState,
  getListingState,
  getPropertAgents,
  getRecentListingState,
} from "../../../../store/getListingState";
import dayjs from "dayjs";
import { getRecentActivities } from "../../../../store/getListingState";
import constants from "../../../../config/constants";

const MainDashboard = () => {
  const navigate = useNavigate();
  const {
    getAllStatsGraph,
    getStatGraph,
    propertgetlistingstata,
    generalActivityData,
    propertGetTotalAgents,
    getRecentListing,
  } = useCustomHook();
  const propertyData = useRecoilState<any>(getListingState);
  const totalAgent = useRecoilState<any>(getPropertAgents);
  const recentList = useRecoilState<any>(getRecentListingState);
  const recentActivity = useRecoilState<any>(getRecentActivities);
  const graphStats = useRecoilState<any>(getListingGraphState);

  useEffect(() => {
    propertgetlistingstata();
    propertGetTotalAgents();
    getRecentListing();
    generalActivityData();
    getAllStatsGraph();
  }, []);

  return (
    <div className="main-dashboard">
      <div style={{ overflowX: "scroll", cursor: "pointer" }}>
        <div className="flex items-center gap-3">
          <div className="flex items-center flex-wrap xl:flex-nowrap gap-3">
            {totalAgent[0]?.map((item: any, index: any) => {
              return (
                <div className="card-main w-[100%] md:w-[350px]">
                  <div className=" flex items-center p-2">
                    <div className="rounded-[10px] h-[60px] w-[60px] light-gray-bg-color p-[0.2rem]">
                      <div className="img-bg pl-2 pt-2 pr-1">
                        <People />
                      </div>
                    </div>
                    <div className="ml-3">
                      <Typography className="card-title ">
                        Properties Agents
                      </Typography>
                      <Typography className="card-number pt-2">
                        {item?.totalAgents}
                      </Typography>
                    </div>
                  </div>
                  <div className="status flex justify-end items-center pr-3 pb-1">
                    <div className="status-dot-active mr-[0.8rem]"></div>
                    <Typography className="status-card ml-2">
                      Active
                      <span className="ml-2">({item?.activeAgents})</span>
                    </Typography>
                  </div>
                  <div className="status flex justify-end items-center pr-3">
                    <div className="status-dot-inactive"></div>
                    <Typography className="status-card ml-2">
                      Inactive
                      <span className="ml-2">({item?.inactiveAgents})</span>
                    </Typography>
                  </div>
                </div>
              );
            })}
            {propertyData[0]?.map((item: any, index: any) => {
              return (
                <>
                  <div className="card-main w-[100%] md:w-[350px]">
                    <div className=" flex items-center p-2">
                      <div className="rounded-[10px] h-[60px] w-[60px] light-gray-bg-color p-[0.2rem]">
                        <div className="img-bg pl-2 pt-2 pr-1">
                          <Clip />
                        </div>
                      </div>
                      <div className="ml-3">
                        <Typography className="card-title">
                          Total Listing
                        </Typography>
                        <Typography className="card-number pt-2">
                          {item?.totalListings}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className="card-main w-[100%] md:w-[350px]">
                    <div className=" flex items-center p-2">
                      <div className="rounded-[10px] h-[60px] w-[60px] light-yellow-bg-color p-[0.2rem]">
                        <div className="img-bg pl-2 pt-2 pr-1">
                          <Pending />
                        </div>
                      </div>
                      <div className="ml-3">
                        <Typography className="card-title">
                          Pending Listings
                        </Typography>
                        <Typography className="card-number pt-2">
                          {item?.pendingListings}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className="card-main w-[100%] md:w-[350px]">
                    <div className=" flex items-center p-2">
                      <div className="rounded-[10px] h-[60px] w-[60px] light-green-bg-color p-[0.2rem]">
                        <div className="img-bg pl-2 pt-2 pr-1">
                          <Approved />
                        </div>
                      </div>
                      <div className="ml-3">
                        <Typography className="card-title">
                          Approved Listings
                        </Typography>
                        <Typography className="card-number pt-2">
                          {item?.approvedListings}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className="card-main w-[100%] md:w-[350px]">
                    <div className=" flex items-center p-2">
                      <div className="rounded-[10px] h-[60px] w-[60px] light-red-bg-color p-[0.2rem]">
                        <div className="img-bg pl-2 pt-2 pr-1">
                          <Reject />
                        </div>
                      </div>
                      <div className="ml-3">
                        <Typography className="card-title">
                          Rejected Listings
                        </Typography>
                        <Typography className="card-number pt-2">
                          {item?.rejectedListings}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <Row gutter={[50, 20]} className="mt-5">
        <Col xxl={12} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="graph-card">
            <MonthlyPerfomanceChart
              heading={"Properties Stats"}
              columnWidthRatio="0.4"
              marginRatio="1.5"
              color={["#4A9D77", "#E95060", "#FFC15D"]}
              data={getStatGraph ?? [0]}
              height="50vh"
            />
          </div>
        </Col>
        <Col
          xxl={6}
          xl={12}
          lg={12}
          md={24}
          sm={24}
          xs={24}
          className="recent-card"
        >
          <div>
            <Typography className="recent-card-typo">
              Recent Activities
            </Typography>
            <div className="inner-activities flex mt-4">
              <Row gutter={[20, 20]}>
                {recentActivity[0]?.map((item: any, index: any) => {
                  return (
                    <Col span={24}>
                      <Row gutter={[0, 20]}>
                        <Col xxl={3} xl={3} lg={3} md={2} sm={3} xs={4}>
                          <Typography className="text-success-placeholder-color text-xs font-normal">
                            {dayjs(item?.createdAt).format("DD/MMM")}
                          </Typography>
                        </Col>
                        <hr />
                        <Col xxl={16} xl={16} lg={15} md={18} sm={17} xs={19}>
                          <div className="ml-2">
                            <Typography className="text-primary-color text-sm font-semibold">
                              {item?.activity}
                            </Typography>
                            <div className="flex ">
                              <img
                                src={
                                  item?.performedByuser?.profileImage?.metaData?.mimetype
                                    ? `${constants.MEDIA_URL}/${item?.performedByuser?.profileImage.mediaId}.${item?.performedByuser?.profileImage.metaData.extension}`
                                    : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                }
                                alt="userImage"
                                className="w-[30px] rounded-[100px]"
                              />
                              <Typography className="text-teriary-color text-sm font-normal mr-8 ml-2">
                                {item?.activity === "user sign up"
                                  ? item?.performedByuser?.firstName +
                                  " " +
                                  item?.performedByuser?.lastName +
                                  " registerd successfully"
                                  : item?.activity === "addAssement"
                                    ? item?.performedByuser?.firstName +
                                    " " +
                                    item?.performedByuser?.lastName +
                                    " add assesment"
                                    : item?.activity === "create internship"
                                      ? item?.performedByuser?.firstName +
                                      " " +
                                      item?.performedByuser?.lastName +
                                      " created internship"
                                      : item?.activity === "create company manager"
                                        ? item?.performedByuser?.firstName +
                                        " " +
                                        item?.performedByuser?.lastName +
                                        " added company manager"
                                        : null}
                              </Typography>
                            </div>
                            <Typography className="text-teriary-color text-sm font-normal">
                              {dayjs(item?.createdAt).format("HH:mm a")}
                            </Typography>
                          </div>
                        </Col>
                        <Col xxl={4} xl={4} lg={4} md={3} sm={3} xs={24}>
                          <div className="text-info-bg-color p-1 white-color text-center rounded-lg">
                            View
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  );
                })}
              </Row>
            </div>
            <div className="text-center ">
              <a href="activityData" className="underline decoration-2">
                View All
              </a>
            </div>
          </div>
        </Col>
        <Col xxl={6} xl={12} lg={12} md={24} sm={24} xs={24}>
          <div className="recent-card-listing">
            <Typography className="recent-card-typo">Recent Listing</Typography>
            <div className="main-inner-cards">
              {recentList[0]?.map((item: any, index: any) => {
                return (
                  <>
                    <div
                      onClick={() =>
                        item?.publicationStatus === "published" ||
                          "rejected" ||
                          "pending"
                          ? navigate(`${item.id}`)
                          : ""
                      }
                      className="inner-card"
                    >
                      <Row>
                        <Col xxl={18} xl={18} lg={18} md={18} sm={24} xs={24}>
                          <Typography>
                            <span className="text-sm font-medium primary-color">
                              {item?.user?.firstName} {item?.user?.lastName}
                            </span>
                            <span className="text-xs font-normal text-success-placeholder-color">
                              &nbsp;Recent listed new property
                            </span>
                          </Typography>
                          <Typography>
                            <span className="text-xs font-normal text-success-placeholder-color">
                              Address:
                            </span>
                            <span className="text-xs font-normal text-secondary-color ">
                              {item?.addressOne}
                            </span>
                          </Typography>
                          <Typography className="text-xs font-normal text-success-placeholder-color">
                            {dayjs(item?.createdAt).format("HH:mm a")}
                          </Typography>
                        </Col>
                        <Col xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}>
                          <Typography className="flex justify-end font-medium text-base text-secondary-color">
                            £{item?.rent}
                          </Typography>
                          <div
                            className="p-1 mt-4 rounded-[6px]"
                            style={{
                              background:
                                item?.publicationStatus === "published"
                                  ? "#3DC575"
                                  : item?.publicationStatus === "rejected"
                                    ? "#D83A52"
                                    : item?.publicationStatus === "pending"
                                      ? "#FFC15D"
                                      : "",
                            }}
                          >
                            <Typography className="cursor-pointer text-xs font-normal white-color text-center capitalize">
                              {item?.publicationStatus}
                            </Typography>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </>
                );
              })}
              <div className="text-center">
                <a href="ListingRequest" className="underline decoration-2">
                  View All
                </a>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MainDashboard;
