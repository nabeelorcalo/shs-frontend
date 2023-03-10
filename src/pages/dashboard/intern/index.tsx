import { useState } from "react";
import { Col, Row } from 'antd';
import PageHeader from '../../../components/PageHeader';
import TimeTracking from "../../../components/timeTRacking";
import "../style.scss";

const Intern = () => {
  return (
    <>
      <PageHeader
        title={
          <div className="font-medium">
            It's good to have you back,&nbsp;
            <span className="page-header-secondary-color">
              Maria Sanoid
            </span>
          </div>
        }
      />

      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={8}>
          <TimeTracking />
        </Col>
        {/* <Col xs={12} sm={16} md={12} lg={8} xl={4}>
          Col
        </Col>
        <Col xs={12} sm={4} md={6} lg={8} xl={10}>
          Col
        </Col> */}
      </Row>
    </>
  )
}

export default Intern