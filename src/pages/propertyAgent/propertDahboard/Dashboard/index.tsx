import { Col, Row, Typography } from "antd";
import React from "react";
import { MonthlyPerfomanceChart } from "../../../../components";
import { propertiesStatsData } from "../../../../components/ChartsOfGraphs/chartsMockData/propertiesStats";
import "./Dashboard.scss";
import { activityData, cardData, graphData, innerCard } from "./DashboardMock";
import { useNavigate } from "react-router-dom";

const MainDashboard = () => {
  const nivagate = useNavigate();

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
            <div className="inner-activities flex mt-4">
              <Row>
                {activityData.map((item, index) => {
                  return (
                    <>
                        <div style={{ display: "flex" ,marginBottom:'1rem'}}>
                  <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
                    <Typography>{item.date}</Typography>
                  </Col>
                  <hr />
                  <Col xxl={15} xl={15} lg={15} md={24} sm={24} xs={24}>
                    <div className="ml-2">
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#14142A",
                        }}
                      >
                        {item.userStatus}
                      </Typography>
                      <div className="flex ">
                        <img src={item.img} alt="1" />
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontWeight: 400,
                            color: "#6E7191",
                            marginRight: "10px",
                            marginLeft:"10px"
                          }}
                        >
                          {item.detail}
                        </Typography>
                    
                      </div>
                      <Typography  style={{
                            fontSize: "14px",
                            fontWeight: 400,
                            color: "#6E7191",
                            // marginRight: "10px",
                            // marginLeft:"10px"
                          }}>{item.time}</Typography>
                    </div>
                        </Col>
                        <Col xxl={3} xl={3} lg={3} md={24} sm={24} xs={24}>
                        <div
                          
                          style={{ background: " #4783FF",padding:"4px", color:"white" ,textAlign:"center",width:"140%",borderRadius:"8px"}}
                        >
                          View
                        </div>
                        </Col>
                </div>
                    </>
                  )
                })}
               
              </Row>
             
            </div>
            <div className="text-center ">
                  <a href="activityData" className="underline decoration-2">View All</a> </div>
            </div>
        </Col>
        <Col xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}>
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
              })}<div className="text-center ">
              <a href="ListingRequest" className="underline decoration-2">View All</a> </div>
        </div>
            </div>
            
          
          
        </Col>
      </Row>
    </div>
  );
};

export default MainDashboard;
