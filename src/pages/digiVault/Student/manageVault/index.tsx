import { useEffect, useState } from "react";
import { Button, Col, Divider, Dropdown, Form, Menu, Modal, Row, Space, Input } from "antd";
import { SearchBar, Alert } from "../../../../components";
import { Upload } from "../../../../assets/images";
import { GlobalTable } from "../../../../components";
import { CloseCircleFilled } from "@ant-design/icons";
import UploadDocument from "../../../../components/UploadDocument";
import { useNavigate, useLocation } from "react-router-dom";
import CustomDropDown from "../dropDownCustom";
import "./style.scss";
import useCustomHook from "../../actionHandler";
import dayjs from "dayjs";

const ManageVault = () => {
  const [isState, setState] = useState({
    isOpenModal: false,
    isVisible: false,
    uploadFolder: false,
    uploadFile: false,
    isOpenDelModal: false,
    DelModalId: null
  })
  const [form] = Form.useForm();
  const { postCreateFolderFile, getDigiVaultDashboard, studentVault, deleteFolderFile }: any = useCustomHook();
  const { state } = useLocation();
  const stateData = state.toLowerCase();

  useEffect(() => {
    getDigiVaultDashboard(null)
  }, [])
  const menu2 = (id: any) => (
    <Menu>
      <Menu.Item key="1">View</Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          setState((prevState: any) => ({
            ...prevState,
            isOpenDelModal: true,
            DelModalId: id
          }));
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
  );
  const newTableData = studentVault?.dashboardFolders[stateData]?.map((item: any, index: number) => {
    const modifiedDate = dayjs(item.createdAt).format("YYYY-MM-DD");
    return (
      {
        key: index,
        Title: item.title,
        datemodified: modifiedDate,
        size: item.size ? item.size : '---',
        action: <Space size="middle">
          <CustomDropDown menu1={menu2(item.id)} />
        </Space>
      }
    )
  })
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
      dataIndex: "action",
      key: "Action",
    },
  ];

  const handleChange = () => {
    // console.log("log");
  };

  const menu1 = (
    <Menu>
      <Menu.Item
        onClick={() => {
          setState((prevState: any) => ({
            ...prevState,
            uploadFile: true,
            isVisible: false
          }));
        }}
        key="1"
      >
        Upload files
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setState((prevState) => ({
            ...prevState,
            uploadFolder: true,
            isVisible:false
          }));
        }}
        key="2"
      >
        Upload folder
      </Menu.Item>
    </Menu>
  );

  const router = useNavigate();
  const location = useLocation();

  const titleName = location.pathname.split("/");
  const onFinish = (values: any) => {
    values.root = state;
    postCreateFolderFile(values);
    setState((prevState: any) => ({
      ...prevState,
      isOpenModal: false
    }));
  }

  const modalHandler = () => {
    setState((prevState: any) => ({
      ...prevState,
      isOpenModal: false,
      uploadFile: false,
      uploadFolder: false
    }));
  }

  return (
    <div className="manage-vault-main">
      <Alert
        state={isState.isOpenDelModal}
        setState={setState}
        type="error"
        okBtntxt="Delete"
        cancelBtntxt="Cancel"
        okBtnFunc={() => deleteFolderFile(isState.DelModalId)}
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
                <Button
                  onClick={() => setState((prevState: any) => ({
                    ...prevState,
                    isOpenModal: true
                  }))}
                  className="folder-add-btn" >
                  Create Folder
                </Button>
              </div>
              <div className="div">
                <Dropdown
                  overlay={menu1}
                  visible={isState.isVisible}
                  onVisibleChange={() => setState((prevState: any) => ({
                    ...prevState,
                    isVisible: true
                  }))}
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
            tableData={newTableData}
          />
        </Col>
      </Row>
    </Col>
      </Row >
      <Modal
        className="folders-modal"
        open={isState.isOpenModal}
        onCancel={modalHandler}
        centered
        closeIcon={<CloseCircleFilled className="text-success-placeholder-color" />}
        footer={false}
        title="Create new folder"
      >
        <div className="mt-8 mb-8">
          <Form form={form}
            layout='vertical'
            onFinish={onFinish}
            initialValues={{ remember: false }}
          >
            <Form.Item name="folderName" label="Folder Name" rules={[{ required: true }, { type: "string" }]}>
              <Input className="input" placeholder="Enter folder Name" type="text" />
            </Form.Item>
            <div className="d-flex justify-end items-center">
              <Button
                className="cancel-btn"
                onClick={modalHandler}
                key="Cancel">
                Cancel
              </Button>
              <Button
                htmlType="submit"
                className="submit-btn"
                key="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Modal>

      <Modal
        className="folders-modal"
        centered
        title="Upoad File"
        open={isState.uploadFile}
        onCancel={() => {
          setState((prevState: any) => ({
            ...prevState,
            uploadFile: false
          }));
        }}
        width={600}
        closeIcon={<CloseCircleFilled className="text-success-placeholder-color" />}
        footer={[
          <Button
            className="cancel-btn"
            onClick={modalHandler}
            key="Cancel"
          >
            Cancel
          </Button>,
          <Button
            className="submit-btn"
            onClick={modalHandler}
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
        open={isState.uploadFolder}
        onCancel={() => {
          setState((prevState: any) => ({
            ...prevState,
            uploadFolder: false
          }));
        }}
        closeIcon={<CloseCircleFilled className="text-success-placeholder-color" />}
        footer={[
          <Button
            className="cancel-btn"
            onClick={modalHandler}
            key="Cancel"
          >
            Cancel
          </Button>,

          <Button
            className="submit-btn"
            onClick={modalHandler}
            key="Upload"
          >
            Upload
          </Button>,
        ]}
      >
        <UploadDocument />
      </Modal>
    </div >
  );
};

export default ManageVault;
