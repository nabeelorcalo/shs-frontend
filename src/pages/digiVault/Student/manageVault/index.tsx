import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Divider,
  Form,
  Menu,
  Modal,
  Row,
  Space,
  Input,
} from "antd";
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
import constants, { ROUTES_CONSTANTS } from "../../../../config/constants";
import PdfPreviewModal from "../../../candidates/PdfPreviewModal";
import { byteToHumanSize } from "../../../../helpers";

const ManageVault = () => {
  const [isState, setState] = useState<any>({
    isOpenModal: false,
    isVisible: false,
    uploadFolder: false,
    uploadFile: false,
    isOpenDelModal: false,
    DelModalId: null,
    files: [],
  });
  const [openPreview, setOpenPreview] = useState(false);
  const [preViewModal, setPreViewModal] = useState<any>({
    extension: "",
    url: "",
  });
  const [form] = Form.useForm();
  const {
    postCreateFolderFile,
    studentVault,
    deleteFolderFile,
  }: any = useCustomHook();

  const { state } = useLocation();
  const stateData = state.toLowerCase();
  const router = useNavigate();
  const location = useLocation();
  const titleName = location.pathname.split("/");
  const [selectArrayData, setSelectArrayData] = useState(studentVault?.dashboardFolders[stateData])

  const handleDropped = (event: any) => {
    event.preventDefault();
    setState((prevState: any) => ({
      ...prevState,
      files: Array.from(event.dataTransfer.files),
    }));
  };

  useEffect(() => {
    setSelectArrayData(studentVault?.dashboardFolders[stateData])
  }, [studentVault?.dashboardFolders[stateData]])

  const handleChangeSearch = (e: any) => {
    if (e.trim() === '') setSelectArrayData(studentVault?.dashboardFolders[stateData])
    else {
      const searchedData = selectArrayData?.filter((emp: any) => emp?.title?.toLowerCase()?.includes(e))
      setSelectArrayData(searchedData)
    }
  }

  const menu2 = (val: any) => {
    return (
      <Menu>
        <Menu.Item
          key="1"
          onClick={() => {
            val.mode === "folder"
              ? router(
                `/${ROUTES_CONSTANTS.DIGIVAULT}/${stateData}/${ROUTES_CONSTANTS.VIEW_DIGIVAULT}`,
                { state: { folderId: val.id, title: stateData } }
              )
              : setOpenPreview(true);
            setPreViewModal({
              extension: val?.mimeType.split("/").pop(),
              url: `${constants?.MEDIA_URL}/${val?.mediaId}.${val?.mimeType
                .split("/")
                .pop()}`,
            });
          }}
        >
          View
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => {
            setState((prevState: any) => ({
              ...prevState,
              isOpenDelModal: true,
              DelModalId: val.id,
            }));
            setSelectArrayData(studentVault?.dashboardFolders[stateData])
          }}
        >
          Delete
        </Menu.Item>
      </Menu>
    );
  };
  const newTableData = selectArrayData?.map(
    (item: any, index: number) => {
      const modifiedDate = dayjs(item.createdAt).format("YYYY-MM-DD");
      return {
        key: index,
        Title: (
          <p
            className={`${item.mode === "folder" && "cursor-pointer"}`}
            onClick={() =>
              item.mode === "folder" &&
              router(
                `/${ROUTES_CONSTANTS.DIGIVAULT}/${stateData}/${ROUTES_CONSTANTS.VIEW_DIGIVAULT}`,
                { state: { folderId: item.id, title: stateData } }
              )
            }
          >
            <span>{item.mode === "file" ? <FileIcon /> : <FolderIcon />}</span>
            <span className="ml-2">{item.title}</span>
          </p>
        ),
        datemodified: modifiedDate,
        size: item?.size ? byteToHumanSize(parseFloat(item?.size)) : "N/A",
        action: (
          <Space size="middle">
            <CustomDropDown menu1={menu2(item)} />
          </Space>
        ),
      };
    }
  );
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
      align: "center",
    },
  ];

  const onFinish = (values: any) => {
    values.root = state.toUpperCase();
    values.mode = "folder";
    values.folderId = "";

    postCreateFolderFile(values);
    form.resetFields();
    setState((prevState: any) => ({
      ...prevState,
      isOpenModal: false,
    }));
  };

  const modalHandler = () => {
    setState((prevState: any) => ({
      ...prevState,
      isOpenModal: false,
      uploadFile: false,
    }));
  };

  const upLoadModalHandler = () => {
    isState.files?.map((item: any) => {
      uploadFiles(item);
    });
  };

  const uploadFiles = (file: any) => {
    const payload: any = {
      root: stateData.toUpperCase(),
      title: file.name,
      mode: "file",
      folderId: "",
      file: file,
    };

    const digivautUploadFile = new FormData();
    Object.keys(payload).map((a: any) => {
      digivautUploadFile.append(a, payload[a]);
    });
    postCreateFolderFile(digivautUploadFile);
    setState((prevState: any) => ({
      ...prevState,
      uploadFile: false,
      files: [],
    }));
    setSelectArrayData(studentVault?.dashboardFolders[stateData])
  };

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
              <SearchBar
                size="middle"
                // handleChange={(e: any) => console.log(e)}
                handleChange={(e: any) => handleChangeSearch(e)}
              />
            </Col>
            <Col
              xl={18}
              md={24}
              sm={24}
              xs={24}
              className="flex max-sm:flex-col gap-4 justify-end"
            >
              <div>
                <Button
                  onClick={() =>
                    setState((prevState: any) => ({
                      ...prevState,
                      isOpenModal: true,
                    }))
                  }
                  className="folder-add-btn sm:w-full md:w-[173px]"
                >
                  Create Folder
                </Button>
              </div>
              <div className="div">
                <Button
                  className="manage-vault-btn flex items-center justify-center sm:w-full md:w-[160px]"
                  onClick={() =>
                    setState((prevState: any) => ({
                      ...prevState,
                      uploadFile: true,
                    }))
                  }
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
      </Row>
      <Modal
        className="folders-modal"
        open={isState.isOpenModal}
        onCancel={modalHandler}
        centered
        closeIcon={
          <CloseCircleFilled className="text-success-placeholder-color" />
        }
        footer={false}
        width={700}
        title="Create new folder"
      >
        <div className="mt-8 mb-8">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ remember: false }}
          >
            <Form.Item
              name="title"
              label="Folder Name"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input
                className="input"
                placeholder="Enter folder Name"
                type="text"
              />
            </Form.Item>
            <div className="flex justify-end items-center gap-3">
              <Button
                className="cancel-btn"
                onClick={modalHandler}
                key="Cancel"
              >
                Cancel
              </Button>
              <Button htmlType="submit" className="submit-btn" key="submit">
                Create
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
            uploadFile: false,
          }));
        }}
        width={705}
        closeIcon={
          <CloseCircleFilled className="text-success-placeholder-color" />
        }
        footer={[
          <Button className="cancel-btn" onClick={modalHandler} key="Cancel">
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
        <UploadDocument
          handleDropped={handleDropped}
          setFiles={setState}
          files={isState}
        />
      </Modal>
      <PdfPreviewModal
        setOpen={setOpenPreview}
        open={openPreview}
        preViewModal={preViewModal}
      />
    </div>
  );
};

export default ManageVault;
