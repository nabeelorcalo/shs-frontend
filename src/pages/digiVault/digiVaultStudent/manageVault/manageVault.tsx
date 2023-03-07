import {
  Button,
  Col,
  Divider,
  Dropdown,
  Menu,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import React, { useState } from "react";
import { SearchBar, Input } from "../../../../components";
import "./manageVault.scss";
import File from "../../../../assets/images/ColorfullIconsProgressbar/Upload.png";
import GlobalTable from "../../../../components/Table/Table";
import More from "../../../../assets/images/ColorfullIconsProgressbar/More.svg";
import { CloseCircleFilled } from "@ant-design/icons";
import MyProfileDocUpload from "../../../../components/MyProfileDocUpload";
import MenuItem from "antd/es/menu/MenuItem";
import UploadDocument from "../../../../components/UploadDocument";

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

const ManageVault = (props: any) => {
  const { title = "Education" } = props;

  const [open, setISOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [upLoadFile, setUpLoadFile] = useState(false);
  const [upLoadFolder, setUpLoadFolder] = useState(false);

  const handleChange = () => {
    console.log("log");
  };

  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };

  const menu1 = (
    <Menu>
      <Menu.Item onClick={() => setUpLoadFile(true)} key="1">
        Upload files
      </Menu.Item>
      <Menu.Item onClick={() => setUpLoadFolder(true)} key="2">
        Upload folder
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="manage-vault-main">
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="manage-vault-title">
            <span className="manage-vault-title-text mr-2">{title}</span>
            <span className="dash-vault-line">|</span>
            <span className="manage-vault-title-text-sub ml-2">DigiVault</span>
          </div>
        </Col>
        <Divider />
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Row>
            <Col xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}>
              <SearchBar size="large" handleChange={handleChange} />
            </Col>

            <Col xxl={12} xl={12} lg={12} md={12} sm={0} xs={0}></Col>

            <Col className="" xxl={3} xl={3} lg={3} md={3} sm={24} xs={24}>
              <Button
                onClick={() => setISOpen(true)}
                className="foldet-add-btn"
              >
                Create Folder
              </Button>
            </Col>

            <Col
              className="flex justify-end"
              xxl={3}
              xl={3}
              lg={3}
              md={3}
              sm={24}
              xs={24}
            >
              <Dropdown
                overlay={menu1}
                visible={visible}
                onVisibleChange={handleVisibleChange}
                trigger={["click"]}
              >
                <Button className="manage-vault-btn flex items-center justify-center">
                  <Space>
                    <img
                      className="flex items-center"
                      src={File}
                      alt="fileIcon"
                    />
                    <span>Upload</span>
                  </Space>
                </Button>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-8">
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <GlobalTable
            pagination={false}
            columns={columns}
            tableData={tableData}
          />
        </Col>
      </Row>

      <Modal
        open={open}
        closeIcon={
          <CloseCircleFilled
            onClick={() => setISOpen(false)}
            style={{ color: "#A3AED0", fontSize: "20px" }}
          />
        }
        footer={[
          <Button
            onClick={() => setISOpen(false)}
            key="Cancel"
            style={{
              border: "1px solid #4a9d77",
              color: "#4a9d77",
              padding: "0px 20px",
            }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            style={{
              backgroundColor: "#4a9d77",
              border: "1px solid #4a9d77",
              color: "#fff",
              padding: "0px 20px",
            }}
          >
            Submit
          </Button>,
        ]}
        title="Create new folder"
      >
        <div className="mt-8 mb-8">
          <label>Folder Name</label>
          {/* <Input placeholder="Enter folder name" size="large" /> */}
          <Input
            type="input"
            handleChange={handleChange}
            placeholder="Enter folder name"
          />
        </div>
      </Modal>

      <Modal
        title="Upoad File"
        open={upLoadFile}
        onCancel={() => {
          setUpLoadFile(!upLoadFile);
        }}
        width={600}
        maskClosable={false}
        closeIcon={
          <CloseCircleFilled style={{ color: "#A3AED0", fontSize: "20px" }} />
        }
        footer={[
          <Button
            onClick={() => {
              setUpLoadFile(!upLoadFile);
            }}
            key="Cancel"
            style={{
              border: "1px solid #4a9d77",
              color: "#4a9d77",
              padding: "0px 20px",
            }}
          >
            Cancel
          </Button>,
          <Button
            onClick={() => {
              setUpLoadFile(!upLoadFile);
            }}
            key="submit"
            style={{
              backgroundColor: "#4a9d77",
              color: "#fff",
              border: "1px solid #4a9d77",
              padding: "0px 20px",
            }}
          >
            Upload
          </Button>,
        ]}
      >
        <UploadDocument />
      </Modal>

      <Modal
        title="Upoad Folder"
        open={upLoadFolder}
        onCancel={() => {
          setUpLoadFolder(!upLoadFolder);
        }}
        maskClosable={false}
        closeIcon={
          <CloseCircleFilled style={{ color: "#A3AED0", fontSize: "20px" }} />
        }
        footer={[
          <Button
            onClick={() => {
              setUpLoadFolder(!upLoadFolder);
            }}
            key="Cancel"
            style={{
              border: "1px solid #4a9d77",
              color: "#4a9d77",
              padding: "0px 20px",
            }}
          >
            Cancel
          </Button>,
          <Button
            onClick={() => {
              setUpLoadFolder(!upLoadFolder);
            }}
            key="Upload"
            style={{
              backgroundColor: "#4a9d77",
              color: "#fff",
              border: "1px solid #4a9d77",
              padding: "0px 20px",
            }}
          >
            Upload
          </Button>,
        ]}
      >
        <UploadDocument />
      </Modal>
    </div>
  );
};

export default ManageVault;
