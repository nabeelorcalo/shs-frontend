import { DownCircleOutlined, SettingFilled } from "@ant-design/icons";
import { Button, Col, Row, Space, Switch } from "antd";
import React from "react";
import AppTabs from "../../../components/Tabs";
import "./digiVaultStudent.scss";


const DigiVaultStudent = () => {
  return (
    <div className="digivault">
      <Row className="p-8">
        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
          <div className="font-semibold text-lg">DigiVault</div>
        </Col>
        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
          <div className="flex justify-end items-center gap-4">
            <div className="flex items-center">
              <p className="pr-2">Lock</p>
              <Switch />
            </div>
            <Button style={{ background: "#E6F4F9" }}>
              <span className="font-normal text-sm">Settings</span>{" "}
              <SettingFilled style={{ color: "#A0A3BD" }} />
            </Button>
          </div>
        </Col>
      </Row>

      <Row gutter={20} className="">
        <Col xxl={16} xl={16} lg={16} md={16} sm={16} xs={24}>
          <div style={{ border: "1px solid red", height: "200px" }}>
            <div
              style={{ color: "#363565" }}
              className="text-2xl font-semibold"
            >
              Manage your vault
            </div>
            <Row gutter={[8, 20]} className="p-2">
              <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={24}>
                <div className="vault-card">
                 
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={24}>
          <div style={{ border: "1px solid blue", height: "200px" }}></div>
        </Col>
      </Row>

      <Row className="pt-4">
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div style={{ border: "1px solid blue", height: "400px" }}>table</div>
        </Col>
      </Row>
    </div>
  );
};

export default DigiVaultStudent;
