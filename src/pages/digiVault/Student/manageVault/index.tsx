import { useState } from "react";
import { Button, Col, Divider, Dropdown, Form, Menu, Modal, Row, Space, Input } from "antd";
import { SearchBar, Alert } from "../../../../components";
import { Upload } from "../../../../assets/images";
import { GlobalTable } from "../../../../components";
import { CloseCircleFilled } from "@ant-design/icons";
import UploadDocument from "../../../../components/UploadDocument";
import { useNavigate, useLocation } from "react-router-dom";
import { DEFAULT_VALIDATIONS_MESSAGES } from '../../../../config/validationMessages'
import CustomDropDown from "../dropDownCustom";
import "./style.scss";
import useCustomHook from "../../actionHandler";

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

const ManageVault = () => {
  const [open, setISOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [upLoadFile, setUpLoadFile] = useState(false);
  const [upLoadFolder, setUpLoadFolder] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [form] = Form.useForm();
  const { state } = useLocation();
  const { postCreateFolderFile } = useCustomHook();

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
          <CustomDropDown menu1={menu2} />
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
  const onFinish = (values: any) => {
    values.root = state;
    postCreateFolderFile(values)
  }
  return (
    <div className="manage-vault-main">
      <Alert
        state={showDelete}
        setState={setShowDelete}
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
          <Row gutter={[20, 20]}>
            <Col xl={6} md={24} sm={24} xs={24}>
              <SearchBar size="middle" handleChange={handleChange} />
            </Col>
            <Col xl={18} md={24} sm={24} xs={24} className="flex max-sm:flex-col gap-4 justify-end">
              <div>
                <Button onClick={() => setISOpen(true)} className="folder-add-btn" >
                  Create Folder
                </Button>
              </div>
              <div className="div">
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
                        src={Upload}
                        alt="fileIcon"
                      />
                      <span>Upload</span>
                    </Space>
                  </Button>
                </Dropdown>
              </div>
            </Col>
            <Col xs={24}>
              <GlobalTable
                pagination={false}
                columns={columns}
                tableData={tableData}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        className="folders-modal"
        open={open}
        centered
        closeIcon={<CloseCircleFilled className="text-success-placeholder-color" onClick={() => setISOpen(false)} />}
        footer={false}
        title="Create new folder"
      >
        <div className="mt-8 mb-8">
          <Form form={form}
            layout='vertical'
            onFinish={onFinish}
            initialValues={{ remember: false }}
            validateMessages={DEFAULT_VALIDATIONS_MESSAGES}>
            <Form.Item name="folderName" label="Folder Name" rules={[{ required: true }, { type: "string" }]}>
              <Input className="input" placeholder="Enter folder Name" type="text" />
            </Form.Item>
            <div className="d-flex justify-end items-center">
              <Button
                className="cancel-btn"
                onClick={() => setISOpen(false)}
                key="Cancel">
                Cancel
              </Button>,

              <Button
                htmlType="submit"
                className="submit-btn"
                key="submit">
                Submit
              </Button>
            </div>
          </Form>
          {/* <label>Folder Name</label>
          <Input
            type="input"
            handleChange={handleChange}
            placeholder="Enter folder name"
          /> */}
        </div>
      </Modal>

      <Modal
        className="folders-modal"
        centered
        title="Upoad File"
        open={upLoadFile}
        onCancel={() => {
          setUpLoadFile(!upLoadFile);
        }}
        width={600}
        maskClosable={false}
        closeIcon={<CloseCircleFilled className="text-success-placeholder-color" />}
        footer={[
          <Button
            className="cancel-btn"
            onClick={() => {
              setUpLoadFile(!upLoadFile);
            }}
            key="Cancel"
          >
            Cancel
          </Button>,
          <Button
            className="submit-btn"
            onClick={() => {
              setUpLoadFile(!upLoadFile);
            }}
            key="submit"
          >
            Upload
          </Button>,
        ]}
      >
        <UploadDocument />
      </Modal>

      <Modal
        className="folders-modal"
        centered
        title="Upoad Folder"
        open={upLoadFolder}
        onCancel={() => {
          setUpLoadFolder(!upLoadFolder);
        }}
        maskClosable={false}
        closeIcon={<CloseCircleFilled className="text-success-placeholder-color" />}
        footer={[
          <Button
            className="cancel-btn"
            onClick={() => {
              setUpLoadFolder(!upLoadFolder);
            }}
            key="Cancel"
          >
            Cancel
          </Button>,

          <Button
            className="submit-btn"
            onClick={() => {
              setUpLoadFolder(!upLoadFolder);
            }}
            key="Upload"
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
