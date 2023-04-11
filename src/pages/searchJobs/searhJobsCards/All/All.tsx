import React, { useState } from "react";
import { Row, Col } from "antd";
import AllCardsTab from "./searchAllCard/Allcards";

const SerarchAll = () => {
  return (
    <Row gutter={[20,20]}>
      {[1, 2, 3, 4, 5, 6].map((data: any,i:number) => (
        <Col lg={8} key={i}>
          <AllCardsTab />
        </Col>
      ))}
    </Row>
  );
};

export default SerarchAll;
