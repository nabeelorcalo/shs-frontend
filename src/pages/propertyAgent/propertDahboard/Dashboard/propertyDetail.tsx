import { Col, Divider, Row, Typography } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";
import backButton from "../../../../assets/images/profile/propertyagent/BackLoginButton.svg";
import pf from "../../../../assets/images/profile/propertyagent/pf.png";
import { propertDetailSide } from "./DashboardMock";
import "./Dashboard.scss";
import AppTabs from "../../../../components/Tabs";
import ListingDetails from "./propertyTabs/listingDetails";
import DocumentDetails from "./propertyTabs/documentDetails";

const items = [
  {
    key: "1",
    label: "Listing Details",
    children: <ListingDetails />,
  },
  {
    key: "2",
    label: "Documents",
    children: <DocumentDetails/>,
  },
];

const PropertyDetail = () => {
  const locate = useLocation();

  const status = location.pathname.split("/");

  return (
    <div className="propert-detail">
      <Row>
        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
          <div>
            <Typography>Property Details</Typography>
          </div>
        </Col>
        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
          <div
            className="flex justify-end"
            style={{ textTransform: "capitalize" }}
          >
            <Typography
              style={{
                background:
                  status[2] === "published"
                    ? "#3DC575"
                    : status[2] === "rejected"
                    ? "#D83A52"
                    : status[2] === "pending"
                    ? "#FFC15D"
                    : "",

                width: "82px",
                textAlign: "center",
                color: "#FFFFFF",
                padding: "2px 5px 5px 2px",
                borderRadius: "8px",
              }}
            >
              {status[2]}
            </Typography>
          </div>
        </Col>
      </Row>
      <Divider />
      <Row gutter={15}>
        <Col xxl={6} xl={6} lg={7} md={6} sm={6} xs={24}>
          <div
            className="border-solid border-2 border-indigo-600"
            style={{
              background: "#FFFFFF",
              boxShadow: " 0px 0px 8px 1px rgba(9, 161, 218, 0.1)",
              borderRadius: "8px",
            }}
          >
            {propertDetailSide.map((item, index) => {
              return (
                <>
                  <div className="flex p-2">
                    <div>
                      <img src={backButton} alt="" />
                    </div>

                    <div className="grid mx-auto">
                      <img src={pf} alt="" />
                      <Typography>Darrell Steward</Typography>
                      <Typography>Property Agent</Typography>
                    </div>
                  </div>
                  <Divider />
                  <center className="social-info">
                    <div className="social-icon flex items-center mt-3">
                      <img src={item.iconEmail} alt="" />
                      <Typography className="emp-social">
                        {item.email}
                      </Typography>
                    </div>
                    <div className="social-icon flex items-center mt-3">
                      <img src={item.iconPhone} alt="" />
                      <Typography className="emp-social">
                        {item.phone}
                      </Typography>
                    </div>
                    <div className="social-icon flex items-center mt-3 mb-1">
                      <img src={item.iconLocation} alt="" />
                      <Typography className="emp-social">
                        {item.location}
                      </Typography>
                    </div>
                  </center>
                  <div>
                    <Typography className="ml-4">Attachments</Typography>
                  </div>
                  <center>
                    {item.attachments.map((item, index) => {
                      return (
                        <>
                          <img src={item.skill} alt="" />
                        </>
                      );
                    })}
                  </center>
                </>
              );
            })}
          </div>
        </Col>
        <Col xxl={18} xl={18} lg={17} md={18} sm={18} xs={24}>
          <div
            style={{
              border: "1px solid blue",
              background: "#FFFFFF",
              boxShadow: " 0px 0px 8px 1px rgba(9, 161, 218, 0.1)",
              borderRadius: "8px",
            }}
            className="p-2"
          >
            <AppTabs items={items} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PropertyDetail;
