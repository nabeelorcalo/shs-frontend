import { Row, Col } from "antd";
import React from "react";
import AllCardsTab from "./searchAllCard/Allcards";

const SerarchAll = () => {
  return (
    <Row>
      <Col lg={24}>
        <AllCardsTab />
      </Col>
    </Row>
  );
};

export default SerarchAll;
