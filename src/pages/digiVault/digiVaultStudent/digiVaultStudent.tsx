import { DownCircleOutlined, SettingFilled } from "@ant-design/icons";
import { Button, Col, Divider, Row, Space, Switch } from "antd";
import React, { useState } from "react";
import AppTabs from "../../../components/Tabs";
import "./digiVaultStudent.scss";
import SettingModal from "./settingModal/settingModal";

const DigiVaultStudent = () => {
  const [modal2Open, setModal2Open] = useState(false);
  return (
    <div className="digivault">
      <SettingModal modal2Open={modal2Open} setModal2Open={setModal2Open} />
      <Row className="items-center">
        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
          <div className="digivault-title">DigiVault</div>
        </Col>

        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
          <div className="flex justify-end items-center gap-4">
            <div className="flex items-center">
              <p style={{ color: "#6E7191" }} className="pr-2">
                Lock
              </p>
              <Switch />
            </div>
            <Button onClick={() => setModal2Open(true)} className="setting-btn">
              <span className="setting-btn-text font-normal text-sm">
                Settings
              </span>
              <SettingFilled style={{ color: "#A0A3BD" }} />
            </Button>
          </div>
        </Col>
      </Row>
      <Divider />

      <Row gutter={20} className="">
        <Col xxl={16} xl={16} lg={16} md={16} sm={16} xs={24}>
          <div className="manage-vault">
            <div
              style={{ color: "#363565" }}
              className="text-2xl font-semibold"
            >
              Manage your vault
            </div>
            <Row gutter={[8, 20]} className="p-2">
              <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={24}>
                <div className="vault-card"></div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={24}>
          <div className="storage"></div>
        </Col>
      </Row>

      <Row className="pt-4">
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="recent-files">
            <div className="recent-files-title font-semibold text-lg">
              Recent Files
            </div>
            <div className="recent-files-tible"></div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DigiVaultStudent;
