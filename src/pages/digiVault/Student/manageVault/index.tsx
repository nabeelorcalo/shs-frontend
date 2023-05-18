import { useEffect, useState } from "react";
import { Button, Col, Divider, Dropdown, Form, Menu, Modal, Row, Space, Input } from "antd";
import { SearchBar, Alert } from "../../../../components";
import { FolderIcon, FileIcon, Upload } from "../../../../assets/images";
import { GlobalTable } from "../../../../components";
import { CloseCircleFilled } from "@ant-design/icons";
import UploadDocument from "../../../../components/UploadDocument";
import { useNavigate, useLocation } from "react-router-dom";
import CustomDropDown from "../dropDownCustom";
import "./style.scss";
import useCustomHook from "../../actionHandler";
import dayjs from "dayjs";
import { ROUTES_CONSTANTS } from "../../../../config/constants";

const ManageVault = () => {
  const [isState, setState] = useState<any>({
    isOpenModal: false,
    isVisible: false,
    uploadFolder: false,
    uploadFile: false,
    isOpenDelModal: false,
    DelModalId: null,
    files: [],
    fileName: '',
  });
  // const [files, setFiles] = useState<any>([])
  const [form] = Form.useForm();
  const {
    postCreateFolderFile,
    getDigiVaultDashboard,
    studentVault,
    deleteFolderFile,
    SearchFolderContent
  }: any = useCustomHook();
  const { state } = useLocation();
  const stateData = state.toLowerCase();
  const router = useNavigate();
  const location = useLocation();
  const titleName = location.pathname.split("/");

  useEffect(() => {
    getDigiVaultDashboard()
  }, [])

  const handleDropped = (event: any) => {
    event.preventDefault()
    setState((prevState: any) => ({
      ...prevState,
      files: Array.from(event.dataTransfer.files)
    }))
  }
  const menu2 = (val: any) => {
    return <Menu>
      {val.mode === 'folder' && <Menu.Item
        key="1"
        onClick={() => router(
          `/${ROUTES_CONSTANTS.DIGIVAULT}/${stateData}/${ROUTES_CONSTANTS.VIEW_DIGIVAULT}`,
          { state: { folderId: val.id, title: stateData } })}>
        View</Menu.Item>}
      <Menu.Item
        key="2"
        onClick={() => {
          setState((prevState: any) => ({
            ...prevState,
            isOpenDelModal: true,
            DelModalId: val.id
          }));
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
  };
  const newTableData = studentVault?.dashboardFolders[stateData]?.map((item: any, index: number) => {
    const modifiedDate = dayjs(item.createdAt).format("YYYY-MM-DD");
    return (
      {
        key: index,
        Title: <p>
          <span>{item.mode === 'file' ? <FileIcon /> : <FolderIcon />}</span>
          <span className="ml-2">{item.title}</span>
        </p>,
        datemodified: modifiedDate,
        size: item.size ? item.size + ' KB' : '---',
        action: <Space size="middle">
          <CustomDropDown menu1={menu2(item)} />
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

  const onFinish = (values: any) => {
    values.root = state;
    postCreateFolderFile(values);
    form.resetFields();
    setState((prevState: any) => ({
      ...prevState,
      isOpenModal: false
    }));
  }

  const modalHandler = () => {
    setState((prevState: any) => ({
      ...prevState,
      isOpenModal: false,
    }));
  }

  const upLoadModalHandler = () => {
    const sendFile = {
      root: stateData,
      name: isState?.files[0]?.name,
      size: isState.files[0].size
    }
    postCreateFolderFile(sendFile)
    setState((prevState: any) => ({
      ...prevState,
      uploadFile: false,
      uploadFolder: false,
      fileName: isState.files[0]?.name
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
              <SearchBar size="middle" handleChange={(e: any) => SearchFolderContent(stateData, e)} />
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
                <Button className="manage-vault-btn flex items-center justify-center" onClick={() =>
                  setState((prevState: any) => ({
                    ...prevState,
                    uploadFile: true,
                  }))}
                >
                  <Space>
                    <img
                      className="flex items-center"
                      src={Upload}
                      alt="fileIcon"
                    />
                    <span>Upload</span>
                  </Space>
                </Button>
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
            onClick={upLoadModalHandler}
            key="submit"
          >
            Upload
          </Button>,
        ]}
      >
        <UploadDocument handleDropped={handleDropped} setFiles={setState} files={isState} />
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
            onClick={upLoadModalHandler}
            key="Upload"
          >
            Upload
          </Button>,
        ]}
      >
        <UploadDocument handleDropped={handleDropped} setFiles={setState} files={isState} />
      </Modal>
    </div >
  );
};

export default ManageVault;
