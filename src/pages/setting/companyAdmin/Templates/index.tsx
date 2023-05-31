import React, { useEffect, useState } from "react";
import { Col, Row, Typography, Divider } from "antd";
const { Text } = Typography;
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import useTemplatesCustomHook from "./actionHandler";
import "./Template.scss";

const SettingTemplate: React.FC = () => {
  const navigate = useNavigate()
  let overview = [
    {
      type: "offerLetter",
      name: "Offer Letter",
      content:
        "This template  will be used to formally offer a job or position to a candidate and outlines the terms and conditions of employment.",
      link: `${ROUTES_CONSTANTS.TEMPLATE_OFFER_LETTER}`
    },
    {
      type: "contract",
      name: "Contract",
      content:
        "This template  will be used to formally offer a job or position to a candidate and outlines the terms and conditions of employment.",
      link: `${ROUTES_CONSTANTS.TEMPLATE_CONTRACT}`
    },
    {
      type: "rejectionLetter",
      name: "Rejection Letter",
      content:
        "This template  will be used to formally offer a job or position to a candidate and outlines the terms and conditions of employment.",
      // link: `${ROUTES_CONSTANTS.REJECTION_LETTER_NEW_TEMPLATE}`
      link: `${ROUTES_CONSTANTS.TEMPLATE_REJECTION_LETTER}`
    },
    {
      type: "certificateOfAppreciation",
      name: "Certificate of Appreciation",
      content:
        "This template  will be used to formally offer a job or position to a candidate and outlines the terms and conditions of employment.",
      // link: `${ROUTES_CONSTANTS.TCA_NEW_TEMPLATE}`
      link: `${ROUTES_CONSTANTS.TEMPLATE_CERTIFICATE_APPRECIATION}`
    },
    {
      type: "certificateOfCompletion",
      name: "Certificate of Completion",
      content:
        "This template  will be used to formally offer a job or position to a candidate and outlines the terms and conditions of employment.",
      // link: `${ROUTES_CONSTANTS.TCC_NEW_TEMPLATE}`
      link: `${ROUTES_CONSTANTS.TEMPLATE_CERTIFICATION_COMPLETION}`
    },
  ];

  return (
    <div className="template-setting cursor-pointer ">
      <Row gutter={[10, 10]} >
        {overview.map((data: any, index) => {
          return (
            <Col key={index} className="gutter-row" xs={24} md={24} xl={12} xxl={8}>
              <div onClick={() => { navigate(data.link, { state: data.type }) }}>
                <div className="template-box-wrapper">
                  <div className="flex px-3 justify-between mt-2 w-full">
                    <div className="flex flex-col">
                      <Text className="text-lg font-semibold text-primary-color">{data?.name}</Text>
                      <Divider className="mt-1 " />
                      <Text className="text-sm font-normal pb-2">
                        {data.content}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
      <Outlet />
    </div>
  );
};

export default SettingTemplate;
