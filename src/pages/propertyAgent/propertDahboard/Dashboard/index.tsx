import React from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Typography } from "antd";
import { MonthlyPerfomanceChart } from "../../../../components";
import { activityData, cardData, graphData, innerCard } from "./DashboardMock";
import "../../style.scss";

const MainDashboard = () => {
  const nivagate = useNavigate();
  return (
    <div className="main-dashboard">
      <Row gutter={[20, 10]}>
        {cardData.map((item, index) => {
          return (
            <>
              <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24}>
                <div className="card-main">
                  <div className="flex items-center p-2">
                    <div className="img-bg">
                      <img src={item.img} alt="" />
                    </div>

                    <div className="ml-3">
                      <Typography className="card-title">
                        {item.cardTitle}
                      </Typography>
                      <Typography className="card-number">
                        {item.cardNumber}
                      </Typography>
                    </div>
                  </div>
                  {item.cardNumber === "33" && (
                    <>
                      {item.status.map((item, index) => {
                        return (
                          <>
                            <div className="status flex justify-end items-center">
                              <div
                                className="status-dot"
                                style={{
                                  background:
                                    item.statusDot === "Active"
                                      ? "#3DC575"
                                      : "#D83A52",
                                }}
                              ></div>
                              <Typography className="status-card ml-2">
                                {item.statusDot}
                                <span className="ml-2">{item.number}</span>
                              </Typography>
                            </div>
                          </>
                        );
                      })}
                    </>
                  )}
                </div>
              </Col>
            </>
          );
        })}
      </Row>

      <Row gutter={[50,20]} className="mt-5">
        <Col xxl={12} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="graph-card">
            <MonthlyPerfomanceChart
              heading={"Properties Stats"}
              columnWidthRatio="0.3"
              marginRatio="1.5"
              color={["#4A9D77", "#E95060", "#FFC15D"]}
              data={graphData}
            />
          </div>
        </Col>
        <Col xxl={6} xl={12} lg={12} md={24} sm={24} xs={24} className="recent-card">
          <div >
            <Typography className="recent-card-typo">
              Recent Activities
            </Typography>
            <div className="inner-activities flex mt-4">
              <Row gutter={[20,20]}>
                {activityData.map((item, index) => {
                  return (
                    <Col span={24}>
                      <Row gutter={[0,20]}>
                        <Col xxl={3} xl={3} lg={3} md={2} sm={3} xs={4}>
                          <Typography className="text-[#A0A3BD] text-sm font-normal font-[outfit]">
                            {item.date}
                          </Typography>
                        </Col>
                        <hr />
                        <Col xxl={16} xl={16} lg={15} md={18} sm={17} xs={19}>
                          <div className="ml-2">
                            <Typography className="text-primary-color text-sm font-semibold font-[outfit]">
                              {item.userStatus}
                            </Typography>
                            <div className="flex ">
                              <img src={item.img} alt="1" />
                              <Typography className="text-teriary-color text-sm font-normal font-[outfit] mr-10 ml-3">
                                {item.detail}
                              </Typography>
                            </div>
                            <Typography className="text-teriary-color text-sm font-normal font-[outfit]">
                              {item.time}
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
              {innerCard.map((item, index) => {
                return (
                  <>
                    <div
                      onClick={() =>
                        item.status === "Published"
                          ? nivagate("published")
                          : item.status === "Rejected"
                          ? nivagate("rejected")
                          : item.status === "Pending"
                          ? nivagate("pending")
                          : ""
                      }
                      className="inner-card"
                    >
                      <Row>
                        <Col xxl={18} xl={18} lg={18} md={18} sm={24} xs={24}>
                          <Typography>
                            <span className="text-sm font-medium color-[#363565]">
                              {item.name}
                            </span>
                            <span className="text-xs font-normal color-[#A0A3BD]">
                              {item.recentActivity}
                            </span>
                          </Typography>
                          <Typography>
                            <span className="text-xs font-normal color-[#A0A3BD]">
                              Address:
                            </span>
                            <span className="text-xs font-normal color-[#4E4B66]">
                              {item.address}
                            </span>
                          </Typography>
                          <Typography className="text-xs font-normal color-[#A0A3BD]">
                            {item.time}
                          </Typography>
                        </Col>
                        <Col xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}>
                          <Typography className="flex justify-end font-medium text-base color-[#4E4B66]">
                            {item.price}
                          </Typography>
                          <div
                            className="p-1 mt-4 rounded-[6px]"
                            style={{
                              background:
                                item.status === "Published"
                                  ? "#3DC575"
                                  : item.status === "Rejected"
                                  ? "#D83A52"
                                  : item.status === "Pending"
                                  ? "#FFC15D"
                                  : "",
                            }}
                          >
                            <Typography className="cursor-pointer text-xs font-normal text-white text-center ">
                              {item.status}
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
