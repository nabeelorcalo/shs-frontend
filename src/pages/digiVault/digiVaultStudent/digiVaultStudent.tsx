import { Button, Col, Row, Space, Switch } from "antd";
import React from "react";
import "./digiVaultStudent.scss";

const DigiVaultStudent = () => {
  return (
    <div className="digivault">
      <Row className="p-8">
        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
          <div className="font-semibold text-lg">DigiVault</div>
        </Col>
        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
          <Space>
            <div className="flex items-center">
              <p className="pr-2">Lock</p>
              <Switch />
            </div>
            <Button></Button>
          </Space>
        </Col>
      </Row>
      <Row gutter={20} className="">
        <Col xxl={16} xl={16} lg={16} md={16} sm={16} xs={24}>
          <div style={{ border: "1px solid red", height: "200px" }}>
            <Row gutter={[8, 20]} className="p-2">
              <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={24}>
                <div
                  style={{ border: "1px solid green", height: "80px" }}
                ></div>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={24}>
                <div
                  style={{ border: "1px solid orange", height: "80px" }}
                ></div>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={24}>
                <div
                  style={{ border: "1px solid green", height: "80px" }}
                ></div>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={24}>
                <div
                  style={{ border: "1px solid green", height: "80px" }}
                ></div>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={24}>
                <div
                  style={{ border: "1px solid orange", height: "80px" }}
                ></div>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={24}>
                <div
                  style={{ border: "1px solid green", height: "80px" }}
                ></div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={24}>
          <div style={{ border: "1px solid blue", height: "200px" }}></div>
        </Col>
      </Row>
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div style={{ border: "1px solid blue", height: "400px" }}>table</div>
        </Col>
      </Row>
    </div>
  );
};

export default DigiVaultStudent;
