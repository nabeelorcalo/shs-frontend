import { useEffect, useState } from "react";
import { Button, Col, Divider, Menu, Modal, Row, Space } from "antd";
import { SearchBar, Alert, PdfPreviewModal } from "../../../../components";
import { FileIcon, Upload } from "../../../../assets/images";
import { GlobalTable } from "../../../../components";
import { CloseCircleFilled } from "@ant-design/icons";
import UploadDocument from "../../../../components/UploadDocument";
import { useNavigate, useLocation } from "react-router-dom";
import CustomDropDown from "../dropDownCustom";
import useCustomHook from "../../actionHandler";
import dayjs from "dayjs";
import "./style.scss";
import constants from "../../../../config/constants";
import { byteToHumanSize } from "../../../../helpers";

const ManageViewVault = () => {
  const [isState, setState] = useState<any>({
    isOpenModal: false,
    isVisible: false,
    uploadFile: false,
    isOpenDelModal: false,
    DelModalId: null,
    files: [],
    fileName: "",
    search: null,
  });
  const [openPreview, setOpenPreview] = useState(false);
  const [preViewModal, setPreViewModal] = useState<any>({
    extension: "",
    url: "",
  });
  const { postCreateFolderFile, getFolderContent, folderContent, deleteFolderFile }: any = useCustomHook();
  const { state } = useLocation();
  const { folderId, title } = state;
  const router = useNavigate();

  useEffect(() => {
    getFolderContent(isState.search, state);
  }, [isState.search]);

  const handleDropped = (event: any) => {
    event.preventDefault();
    setState((prevState: any) => ({
      ...prevState,
      files: Array.from(event.dataTransfer.files),
    }));
  };

  const menu2 = (item: any) => {
    return (
      <Menu>
        <Menu.Item
          key="1"
          onClick={() => {
            setOpenPreview(true);
            setPreViewModal({
              extension: item?.mimeType.split("/").pop(),
              url: `${constants?.MEDIA_URL}/${item?.mediaId}.${item?.mimeType.split("/").pop()}`,
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
              DelModalId: item.id,
            }));
          }}
        >
          Delete
        </Menu.Item>
      </Menu>
    );
  };
  const newTableData = folderContent?.map((item: any, index: number) => {
    const modifiedDate = dayjs(item.createdAt).format("YYYY-MM-DD");
    return {
      key: index,
      Title: (
        <p>
          <span>
            <FileIcon />
          </span>
          <span className="ml-2">{item.title}</span>
        </p>),
      datemodified: modifiedDate,
      size: item.size ? byteToHumanSize(parseFloat(item.size)) : "N/A",
      action: <Space size="middle">
        <CustomDropDown menu1={menu2(item)} />
      </Space>
    };
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
      dataIndex: "action",
      key: "Action",
      align: "center",
    },
  ];

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
      root: title.toUpperCase(),
      title: file.name,
      mode: "file",
      folderId: folderId,
      file: file,
    };

    const digivautUploadFile = new FormData();
    Object.keys(payload).map((a: any) => {
      digivautUploadFile.append(a, payload[a]);
    });
    postCreateFolderFile(digivautUploadFile, state);
    setState((prevState: any) => ({
      ...prevState,
      uploadFile: false,
      files: [],
    }));
  };

  return (
    <div className="manage-vault-main">
      <Alert
        state={isState.isOpenDelModal}
        setState={setState}
        type="error"
        okBtntxt="Delete"
        cancelBtntxt="Cancel"
        okBtnFunc={() => deleteFolderFile(isState.DelModalId, state)}
      >
        <p>Are you sure you want to delete this?</p>
      </Alert>
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="manage-vault-title">
            <span className="manage-vault-title-text mr-2 capitalize">View</span>
            <span className="dash-vault-line">|</span>
            <span
              onClick={() => router(`/digivault/${title}`, { state: title })}
              className="manage-vault-title-text-sub ml-2 cursor-pointer"
            >
              {title}
            </span>
            <span className="dash-vault-line"> |</span>
            <span onClick={() => router("/digivault")} className="manage-vault-title-text-sub ml-2 cursor-pointer">
              DigiVault
            </span>
          </div>
        </Col>
        <Divider />
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Row gutter={[20, 20]}>
            <Col xl={6} md={24} sm={24} xs={24}>
              <SearchBar handleChange={(e: any) => setState({ ...isState, search: e })} />
            </Col>
            <Col xl={18} md={24} sm={24} xs={24} className="flex max-sm:flex-col gap-4 justify-end">
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
                    <img className="flex items-center" src={Upload} alt="fileIcon" />
                    <span>Upload</span>
                  </Space>
                </Button>
              </div>
            </Col>
            <Col xs={24}>
              <GlobalTable pagination={false} columns={columns} tableData={newTableData} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        className="folders-modal"
        centered
        title="Upload File"
        open={isState.uploadFile}
        onCancel={() => {
          setState((prevState: any) => ({
            ...prevState,
            uploadFile: false,
          }));
        }}
        width={600}
        closeIcon={<CloseCircleFilled className="text-success-placeholder-color" />}
        footer={[
          <Button className="cancel-btn" onClick={modalHandler} key="Cancel">
            Cancel
          </Button>,
          <Button className="submit-btn" onClick={upLoadModalHandler} key="submit">
            Upload
          </Button>,
        ]}
      >
        <UploadDocument handleDropped={handleDropped} setFiles={setState} files={isState} />
      </Modal>
      <PdfPreviewModal setOpen={setOpenPreview} open={openPreview} preViewModal={preViewModal} />
    </div>
  );
};

export default ManageViewVault;
