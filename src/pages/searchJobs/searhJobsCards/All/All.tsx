import React, { useState } from "react";
import { Row, Col } from "antd";
import AllCardsTab from "./searchAllCard/Allcards";
import { Navigate, useNavigate } from "react-router-dom";

const SerarchAll = () => {
  const navigate = useNavigate();

  return (
    <Row gutter={[20, 20]}>
      {[1, 2, 3, 4, 5, 6].map((data: any, i: number) => (
        <>
        {console.log(data)}
          <Col lg={8} key={i}>
            <AllCardsTab
              handleDetailClick={() =>
                navigate(`/search-jobs/job-details/${data}`)
              }
            />
          </Col>
        </>
      ))}
    </Row>
  );
};

export default SerarchAll;
