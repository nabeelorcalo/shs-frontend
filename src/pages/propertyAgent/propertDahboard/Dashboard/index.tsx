import { Col, Row, Typography } from "antd";
import React from "react";
import { MonthlyPerfomanceChart } from "../../../../components";
import { propertiesStatsData } from "../../../../components/ChartsOfGraphs/chartsMockData/propertiesStats";
import "./Dashboard.scss";
import { cardData, graphData, innerCard } from "./DashboardMock";
import { useNavigate } from 'react-router-dom';

const MainDashboard = () => {

const nivagate = useNavigate()

  return (
    <div className="main-dashboard">
      <Row gutter={[10, 10]}>
        {cardData.map((item, index) => {
          return (
            <>
              <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={24}>
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

      <Row gutter={[10, 10]} className="mt-2">
        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
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
        <Col xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}>
          <div className="recent-card">
            <Typography className="recent-card-typo">
              Recent Activities
            </Typography>
            <div className="inner-activities"></div>
          </div>
        </Col>
        <Col xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}>
          <div  className="recent-card-listing">
            <Typography className="recent-card-typo">Recent Listing</Typography>
            <div className="main-inner-cards">
              {innerCard.map((item, index) => {
                return (
                  <>
                    <div onClick={() => item.status === "Published" ? nivagate("published") : item.status === "Rejected"? nivagate("rejected"):''} className="inner-card">
                      <Row>
                        <Col xxl={18} xl={18} lg={18} md={18} sm={24} xs={24}>
                          <Typography>
                            <span
                              style={{
                                fontFamily: "Outfit",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "22px",
                                color: "#363565",
                              }}
                            >
                              {item.name}
                            </span>
                            <span
                              style={{
                                fontFamily: "Outfit",
                                fontSize: "12px",
                                fontWeight: 400,

                                color: "#A0A3BD",
                              }}
                            >
                              {" "}
                              {item.recentActivity}
                            </span>
                          </Typography>
                          <Typography>
                            <span
                              style={{
                                fontFamily: "Outfit",
                                fontSize: "12px",
                                fontWeight: 400,
                                color: "#A0A3BD",
                              }}
                            >
                              Address:
                            </span>{" "}
                            <span
                              style={{
                                fontFamily: "Outfit",
                                fontSize: "12px",
                                fontWeight: 400,
                                color: "#4E4B66",
                              }}
                            >
                              {item.address}
                            </span>
                          </Typography>
                          <Typography
                            style={{
                              fontFamily: "Outfit",
                              fontSize: "12px",
                              fontWeight: 400,

                              color: "#A0A3BD",
                            }}
                          >
                            {item.time}
                          </Typography>
                        </Col>
                        <Col xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}>
                          <Typography
                            className="flex justify-end"
                            style={{
                              fontFamily: "Outfit",
                              fontSize: "16px",
                              fontWeight: 500,
                              lineHeight: "24px",
                              color: "#4E4B66",
                            }}
                          >
                            {item.price}
                          </Typography>
                          <div
                            className="p-1 mt-4"
                            style={{
                              background:
                                item.status === "Published"
                                  ? "#3DC575"
                                  : item.status === "Rejected"
                                  ? "#D83A52"
                                  : item.status === "Pending"
                                  ? "#FFC15D"
                                  : "",
                              borderRadius: "6px",
                            }}
                          >
                            <Typography
                              style={{
                                fontFamily: "Outfit",
                                fontSize: "12px",
                                fontWeight: 400,
                                textAlign: "center",
                                color: "#FFFFFF",
                              }}
                            >
                              {item.status}
                            </Typography>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MainDashboard;
