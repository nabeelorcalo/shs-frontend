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
import { SearchBar, Input, Alert } from "../../../../components";
import "./manageVault.scss";
import File from "../../../../assets/images/ColorfullIconsProgressbar/Upload.png";
import GlobalTable from "../../../../components/Table/Table";
import More from "../../../../assets/images/ColorfullIconsProgressbar/More.svg";
import { CloseCircleFilled } from "@ant-design/icons";
import MyProfileDocUpload from "../../../../components/MyProfileDocUpload";
import MenuItem from "antd/es/menu/MenuItem";
import UploadDocument from "../../../../components/UploadDocument";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CustomDroupDown from "../dropDownCustom";

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
  const [open, setISOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [upLoadFile, setUpLoadFile] = useState(false);
  const [upLoadFolder, setUpLoadFolder] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [toggleOperation, setToggleOperation] = useState({
    isOpen: true,
    id: "",
  });

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
          <CustomDroupDown menu1={menu2} />
        </Space>
      ),
    },
  ];

  const handleChange = () => {
    console.log("log");
  };

  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };

  const menu1 = (
    <Menu>
      <Menu.Item
        onClick={() => {
          setUpLoadFile(true);
          setVisible(false);
        }}
        key="1"
      >
        Upload files
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setUpLoadFolder(true);
          setVisible(false);
        }}
        key="2"
      >
        Upload folder
      </Menu.Item>
    </Menu>
  );

  const menu2 = (
    <Menu>
      <Menu.Item key="1">View</Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          setShowDelete(!showDelete);
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  const router = useNavigate();
  const location = useLocation();

  const titleName = location.pathname.split("/");

  return (
    <div className="manage-vault-main">
      <Alert
        open={showDelete}
        setOpen={setShowDelete}
        type="error"
        okBtntxt="Delete"
        cancelBtntxt="Cancel"
      >
        <p>Are you sure you want to delete this?</p>
      </Alert>
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="manage-vault-title">
            <span className="manage-vault-title-text mr-2 capitalize">
              {titleName[2]}
            </span>
            <span className="dash-vault-line">|</span>
            <span
              onClick={() => router("/digivault")}
              className="manage-vault-title-text-sub ml-2 cursor-pointer"
            >
              DigiVault
            </span>
          </div>
        </Col>
        <Divider />
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Row gutter={[10, 20]}>
            <Col xxl={6} xl={6} lg={8} md={8} sm={24} xs={24}>
              <SearchBar size="middle" handleChange={handleChange} />
            </Col>

            <Col xxl={14} xl={12} lg={6} md={2} sm={0} xs={0}></Col>

            <Col xxl={4} xl={6} lg={10} md={14} sm={24} xs={24}>
              <Row gutter={[10, 10]}>
                <Col
                  className="flex justify-end"
                  xxl={12}
                  xl={12}
                  lg={12}
                  md={12}
                  sm={24}
                  xs={24}
                >
                  <Button
                    onClick={() => setISOpen(true)}
                    className="foldet-add-btn"
                  >
                    Create Folder
                  </Button>
                </Col>

                <Col
                  className="flex justify-end"
                  xxl={12}
                  xl={12}
                  lg={12}
                  md={12}
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
            className="text-[#A3AED0] "
            onClick={() => setISOpen(false)}
          />
        }
        footer={[
          <Button
            className="text-[#4a9d77] pr-4"
            onClick={() => setISOpen(false)}
            key="Cancel"
            style={{
              border: "1px solid #4a9d77",
            }}
          >
            Cancel
          </Button>,

          <Button className="bg-[#4a9d77] text-[#fff] pr-4"
            key="submit"
            style={{
              border: "1px solid #4a9d77",
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
          <Button className="text-[#4a9d77] pr-8"
            onClick={() => {
              setUpLoadFile(!upLoadFile);
            }}
            key="Cancel"
            style={{
              border: "1px solid #4a9d77",
            }}
          >
            Cancel
          </Button>,
          <Button className="text-[#fff] bg-[#4a9d77] pr-4"
            onClick={() => {
              setUpLoadFile(!upLoadFile);
            }}
            key="submit"
            style={{
              border: "1px solid #4a9d77",
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
          <CloseCircleFilled className="text-[#A3AED0]" style={{ color: "#A3AED0", fontSize: "20px" }} />
        }
        footer={[
          <Button className="text-[#4a9d77] pr-8"
            onClick={() => {
              setUpLoadFolder(!upLoadFolder);
            }}
            key="Cancel"
            style={{
              border: "1px solid #4a9d77",
            }}
          >
            Cancel
          </Button>,

          <Button className="text-[#fff] bg-[#4a9d77] pr-4"
            onClick={() => {
              setUpLoadFolder(!upLoadFolder);
            }}
            key="Upload"
            style={{
              border: "1px solid #4a9d77",
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
