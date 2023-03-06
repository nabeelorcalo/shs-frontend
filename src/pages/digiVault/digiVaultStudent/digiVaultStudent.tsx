import { DownCircleOutlined, SettingFilled } from "@ant-design/icons";
import { Button, Col, Divider, Row, Space, Switch } from "antd";
import React, { useState, useEffect } from "react";
import AppTabs from "../../../components/Tabs";
import "./digiVaultStudent.scss";
import SettingModal from "./settingModal/settingModal";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ColorfullIconsWithProgressbar } from "../../../components/ColorfullIconsWithProgressbar";
import icon from "../../../assets/images/ColorfullIconsProgressbar/media.svg";

const arraydata = [
  {
    icon: icon,
    progressbarColor: "red",
    progressbarValue: 20,
    storage: "128GB",
    title: "Media",
  },
  {
    icon: icon,
    progressbarColor: "yellow",
    progressbarValue: 50,
    storage: "128GB",
    title: "Media",
  },
  {
    icon: icon,
    progressbarColor: "red",
    progressbarValue: 20,
    storage: "128GB",
    title: "Media",
  },
  {
    icon: icon,
    progressbarColor: "red",
    progressbarValue: 80,
    storage: "128GB",
    title: "Media",
  },
  {
    icon: icon,
    progressbarColor: "red",
    progressbarValue: 20,
    storage: "128GB",
    title: "Media",
  },
];

const DigiVaultStudent = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [percentage, setPercentage] = useState(68);

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
        <Col xxl={18} xl={18} lg={18} md={18} sm={18} xs={24}>
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
        <Col xxl={6} xl={6} lg={6} md={6} sm={6} xs={24}>
          <div className="storage">
            <Row>
              <Col lg={8}>
                <div style={{ width: "100%" }}>
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                  />
                </div>
              </Col>
              <Col className="flex flex-col justify-center  ml-4" lg={12}>
                <div className="available-storage  pb-4">Available Storage</div>
                <div className="available-storage-value">130GB / 512GB</div>
              </Col>
            </Row>

            <div className="pt-8">
              <ColorfullIconsWithProgressbar arraydata={arraydata} />
            </div>
          </div>
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
