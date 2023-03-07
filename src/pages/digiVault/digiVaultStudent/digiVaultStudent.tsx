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
import Video from "../../../assets/images/ColorfullIconsProgressbar/video.svg";
import Document from "../../../assets/images/ColorfullIconsProgressbar/doc.svg";
import Folder from "../../../assets/images/ColorfullIconsProgressbar/file.svg";
import DigivaultCard from "../../../components/DigiVaultCard/digivaultCard";
import SettingIcon from "../../../assets/images/ColorfullIconsProgressbar/Settings.svg";
import More from "../../../assets/images/ColorfullIconsProgressbar/More.svg";

const arraydata = [
  {
    icon: gallery,
    progressbarColor: "#4CA4FD",
    progressbarValue: 30,
    storage: "123GB",
    title: "Media",
  },
  {
    icon: Video,
    progressbarColor: "#E96F7C",
    progressbarValue: 60,
    storage: "126GB",
    title: "Video",
  },
  {
    icon: Document,
    progressbarColor: "#FFC15D",
    progressbarValue: 50,
    storage: "28GB",
    title: "Document",
  },
  {
    icon: Folder,
    progressbarColor: "#6AAD8E",
    progressbarValue: 80,
    storage: "128GB",
    title: "Other Files",
  },
];

const columns = [
  {
    title: "Title",
    dataIndex: "Title",
    key: "key",
    minWidth: 300,
  },
  {
    title: "Date Modified",
    dataIndex: "datemodified",
    key: "datemodified",
  },
  {
    title: "Size",
    dataIndex: "size",
    key: "size",
  },

  {
    title: "Action",
    key: "Action",
    render: (_: any, data: any) => (
      <Space size="middle">
        <div style={{ cursor: "pointer" }}>
          <img src={More} alt="threedots" />
        </div>
      </Space>
    ),
  },
];

const tableData = [
  {
    key: "01",
    Title: "file",
    datemodified: "kljdasfhuasd",
    size: "123",
    Actions: "fduhguisd",
  },
  {
    key: "02",
    Title: "file2",
    datemodified: "kljdasfhuasd",
    size: "123",
    Actions: "fduhguisd",
  },
  {
    key: "03",
    Title: "file3",
    datemodified: "kljdasfhuasd",
    size: "123",
    Actions: "fduhguisd",
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
              <img src={SettingIcon} alt="settIcon" width={24} height={24} />
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
              <Col xxl={10} xl={10} lg={10} md={10} sm={6} xs={24}>
                <Progress
                  strokeWidth={12}
                  strokeColor={"#5D89F4"}
                  strokeLinecap="butt"
                  type="circle"
                  percent={75}
                />
              </Col>
              <Col
                xxl={12}
                xl={12}
                lg={12}
                md={12}
                sm={6}
                xs={24}
                className="flex flex-col justify-center  ml-4"
              >
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
            <div className="recent-files-title font-semibold text-lg pb-6">
              Recent Files
            </div>
            <div className="recent-files-tible">
              <GlobalTable
                pagination={false}
                columns={columns}
                tableData={tableData}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DigiVaultStudent;
