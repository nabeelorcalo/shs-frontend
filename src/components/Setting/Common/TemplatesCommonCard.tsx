import React, { useState } from "react";
import { Col, Row, Typography } from "antd";
import TemplateCommonDropdown from "./TemplateCommonDropdown";
import "./TemplatesCommonCard.scss";
interface ITEMPLATE {
  overview: {
    name: string;
    content: string;
  }[];
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  showDeleteModal: boolean;
  link: string;
}

const { Title, Text } = Typography;
const TemplatesCommonCard = (props: ITEMPLATE) => {
  const { overview, showDeleteModal, setShowDeleteModal, link } = props;
  return (
    <div className="templates-common-card">
      <Row gutter={[20, 20]} className="mt-5">
        {overview.map((data: any, index: any) => {
          return (
            <Col key={index} className="gutter-row flex" xs={24} md={6} xxl={6}>
              <div className="common-card-box-wrapper w-full">
                <div className="flex">
                  <div className="flex px-3 justify-between mt-2 w-full">
                    <div className="flex flex-col">
                      <Title level={5}>{data.name}</Title>
                      <Text className="text-sm font-normal">
                        {data.content}
                      </Text>
                    </div>

                    <span className="float-right cursor-pointer w-[40px]">
                      <TemplateCommonDropdown
                         link={link}
                        showDeleteModal={showDeleteModal}
                        setShowDeleteModal={setShowDeleteModal}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default TemplatesCommonCard;
