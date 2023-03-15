import React from "react";
import { Row, Col } from "antd";
import { BoxWrapper } from "../../../components/BoxWrapper/BoxWrapper";

const index = () => {
  return (
    <div className="chat-main">
      <Row gutter={20}>
        <Col xxl={6} xl={12} lg={12} md={12} sm={12} xs={24}>
          <BoxWrapper>fwefwefwefwefwef</BoxWrapper>
        </Col>
        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
          <BoxWrapper>fwefwefwefwefwef</BoxWrapper>
        </Col>
        <Col xxl={6} xl={12} lg={12} md={12} sm={12} xs={24}>
          <BoxWrapper>fwefwefwefwefwef</BoxWrapper>
        </Col>
      </Row>
    </div>
  );
};

export default index;
