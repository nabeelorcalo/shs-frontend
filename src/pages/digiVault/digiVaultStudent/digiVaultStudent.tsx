import { DownCircleOutlined, SettingFilled } from "@ant-design/icons";
import { Button, Col, Divider, Progress, Row, Space, Switch } from "antd";
import React, { useState, useEffect } from "react";
import AppTabs from "../../../components/Tabs";
import "./digiVaultStudent.scss";
import SettingModal from "./settingModal/settingModal";
import GlobalTable from "../../../components/Table/Table";
import "react-circular-progressbar/dist/styles.css";
import { ColorfullIconsWithProgressbar } from "../../../components/ColorfullIconsWithProgressbar";
import gallery from "../../../assets/images/ColorfullIconsProgressbar/media.svg";
import Video from "../../../assets/images/ColorfullIconsProgressbar/video.png";
import Document from "../../../assets/images/ColorfullIconsProgressbar/document.png";
import Folder from "../../../assets/images/ColorfullIconsProgressbar/folder.png";
import DigivaultCard from "../../../components/DigiVaultCard/digivaultCard";

const arraydata = [
  {
    icon: gallery,
    progressbarColor: "red",
    progressbarValue: 30,
    storage: "128GB",
    title: "Media",
  },
  {
    icon: Video,
    progressbarColor: "red",
    progressbarValue: 60,
    storage: "128GB",
    title: "Video",
  },
  {
    icon: Document,
    progressbarColor: "red",
    progressbarValue: 50,
    storage: "128GB",
    title: "Document",
  },
  {
    icon: Folder,
    progressbarColor: "red",
    progressbarValue: 80,
    storage: "128GB",
    title: "Folder",
  },
];

const columns = [
    {
        title: 'No',
        dataIndex: 'key',
        key: 'key',
        minWidth: 300
    },
    {
        title: 'Date Applied',
        dataIndex: 'dateApplied',
        key: 'dateApplied',
    },
    {
        title: 'Company',
        dataIndex: 'company',
        key: 'company',

    },
    {
        title: 'Type of work',
        dataIndex: 'typeOfWork',
        key: 'typeOfWork',
        width: 200,

    },
    {
        title: 'Internship Type',
        dataIndex: 'internshipType',
        key: 'internshipType',
    },
    {
        title: 'Nature of work',
        dataIndex: 'natureOfWork',
        key: 'natureOfWork',
    },
    {
        title: 'position',
        dataIndex: 'Position',
        key: 'Position',
    },
    {
        title: 'Status',
        dataIndex: 'Status',
        key: 'Status',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_: any, data: any) => (
            <Space size="middle">
                <a onClick={()=>alert(`Id For The Editabel record is  ${data.key} `)}>Edit</a>
                <a onClick={()=>alert(`deleted record id  ${data.key} `)}>Delete</a>
            </Space>
        ),
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
                <div>
                  <DigivaultCard />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xxl={6} xl={6} lg={6} md={6} sm={6} xs={24}>
          <div className="storage">
            <Row className="storage-bar-header">
              <Col lg={10}>
                <Progress
                  strokeColor={"#5D89F4"}
                  strokeLinecap="butt"
                  type="circle"
                  percent={75}
                />
              </Col>
              <Col className="flex flex-col justify-center  ml-4" lg={14}>
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
            <div className="recent-files-tible">
              <GlobalTable columns={columns}/>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DigiVaultStudent;
