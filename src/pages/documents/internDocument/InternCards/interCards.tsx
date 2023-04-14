import React from "react";
import { Col, Row } from "antd";
import { Star } from "../../../../assets/images";
import { BoxWrapper } from "../../../../components/BoxWrapper/boxWrapper"; 

const InterCards = () => {
  return (
    <div>
      <BoxWrapper
        boxShadow={"box-shadow: 0px 0px 8px 1px rgba(9, 161, 218, 0.1);"}
      >
        <Row>
          <Col lg={6}>
            <Star />
          </Col>
        </Row>
      </BoxWrapper>
    </div>
  );
};

export default InterCards;
