import React, { useState } from "react";
import { Col, Row, Typography, Divider } from "antd";
const { Title, Text } = Typography;
import { NavLink, Outlet } from "react-router-dom";
import "./Template.scss";

let overview = [
  {
    name: "Offer Letter",
    content:
      "This template  will be used to formally offer a job or position to a candidate and outlines the terms and conditions of employment.",
    link: "/settings/template/template-offer-letters",
  },
  {
    name: "Contract",
    content:
      "This template  will be used to formally offer a job or position to a candidate and outlines the terms and conditions of employment.",
    link: "/settings/template/contract",
  },
  {
    name: "Rejection Letter",
    content:
      "This template  will be used to formally offer a job or position to a candidate and outlines the terms and conditions of employment.",
    link: "/settings/template/rejection-letter",
  },
  {
    name: "Certificate of Appreciation",
    content:
      "This template  will be used to formally offer a job or position to a candidate and outlines the terms and conditions of employment.",
    link: "/settings/template/certificate-of-appreciation",
  },
  {
    name: "Certificate of Completion",
    content:
      "This template  will be used to formally offer a job or position to a candidate and outlines the terms and conditions of employment.",
    link: "/settings/template/certificate-of-completion",
  },
];

const SettingTemplate: React.FC = () => {
  return (
    <div className="template-setting cursor-pointer ">
      <Row gutter={[10, 10]} >
        {overview.map((data: any, index) => {
          return (
            <Col key={index} className="gutter-row" xs={24} md={24} lg={12} xxl={8}>
              <NavLink key={index} to={data.link}>
                <div className="template-box-wrapper">
                  <div className="flex px-3 justify-between mt-2 w-full">
                    <div className="flex flex-col">
                      <Title level={5} className="title">
                        {data.name}
                      </Title>
                      <Divider className="mt-1 " />
                      <Text className="text-sm font-normal pb-2">
                        {data.content}
                      </Text>
                    </div>
                  </div>
                </div>
              </NavLink>
            </Col>
          );
        })}
      </Row>
      <Outlet />
    </div>
  );
};

export default SettingTemplate;
