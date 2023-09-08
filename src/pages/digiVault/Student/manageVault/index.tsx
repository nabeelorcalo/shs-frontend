import { useEffect, useState } from "react";
import {
  Col,
  Divider,
  Form,
  Menu,
  Modal,
  Row,
  Space,
  Input,
  MenuProps,
  Dropdown,
} from "antd";
import { SearchBar, Alert, PdfPreviewModal, ButtonThemePrimary, ButtonThemeSecondary } from "../../../../components";
import { FolderIcon, FileIcon, Upload, More } from "../../../../assets/images";
import { GlobalTable } from "../../../../components";
import { CloseCircleFilled } from "@ant-design/icons";
import UploadDocument from "../../../../components/UploadDocument";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.scss";
import useCustomHook from "../../actionHandler";
import dayjs from "dayjs";
import constants, { ROUTES_CONSTANTS } from "../../../../config/constants";
import { byteToHumanSize } from "../../../../helpers";

const ManageVault = () => {
  const [openPreview, setOpenPreview] = useState(false);
  const [preViewModal, setPreViewModal] = useState<any>({
    extension: "",
    url: "",
  });
  const [form] = Form.useForm();
  const {
    loading,
    postCreateFolderFile,
    studentVault,
    deleteFolderFile, isState, setState
  }: any = useCustomHook();

  const { state } = useLocation();
  const stateData = state?.toLowerCase();
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

  const PopOver = (props: any) => {
    const { item } = props
    let items: MenuProps['items'] = [
      {
        key: "1",
        label: <a
          onClick={() => {
            setOpenPreview(true)
            setPreViewModal({
              extension: item?.mimeType?.split("/")?.pop(),
              url: `${constants?.MEDIA_URL}/${item?.mediaId}.${item?.mimeType?.split("/")?.pop()}`,
            });
            item.mode === "folder"
              ? router(
                `/${ROUTES_CONSTANTS.DIGIVAULT}/${stateData}/${ROUTES_CONSTANTS.VIEW_DIGIVAULT}`,
                { state: { folderId: item.id, title: stateData } }
              )
              : setOpenPreview(true);
          }}
        >View</a>
      },
      {
        key: '2',
        label: <a
          onClick={() => {
            setState((prevState: any) => ({
              ...prevState,
              isOpenDelModal: true,
              DelModalId: item.id,
            }));
            setSelectArrayData(studentVault?.dashboardFolders[stateData])
          }}
        >Delete</a>
      }
    ];

    return (
      <Dropdown
        menu={{ items }}
        trigger={['click']}
        placement="bottomRight"
        overlayStyle={{ width: 180 }}
      >
        <More className="cursor-pointer" />
      </Dropdown>
    )
  }

  const newTableData = selectArrayData?.map(
    (item: any) => {
      const modifiedDate = dayjs(item.createdAt).format("YYYY-MM-DD");
      return {
        key: item.id,
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
        action: <PopOver item={item} />
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
    postCreateFolderFile(values).then(() => {
      setState({ ...isState, isOpenModal: false })
    })
    form.resetFields();
  };

  const modalHandler = () => {
    form.resetFields();
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
      root: stateData?.toUpperCase(),
      title: file.name,
      mode: "file",
      folderId: "",
      file: file,
    };

    const digivautUploadFile = new FormData();
    Object.keys(payload)?.map((a: any) => {
      digivautUploadFile?.append(a, payload[a]);
    });
    postCreateFolderFile(digivautUploadFile);
    // !loading && setState((prevState: any) => ({
    //   ...prevState,
    //   uploadFile: false,
    //   files: [],
    // }));
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
            <span className="manage-vault-title-text mr-2 capitalize">{titleName[2]}</span>
            <span className="dash-vault-line">|</span>
            <span onClick={() => router("/digivault")} className="manage-vault-title-text-sub ml-2 cursor-pointer">
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
                handleChange={(e: any) => handleChangeSearch(e)}
                placeholder="Search by title"
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
                <ButtonThemeSecondary
                  onClick={() =>
                    setState((prevState: any) => ({
                      ...prevState,
                      isOpenModal: true,
                    }))
                  }
                >
                  Create Folder
                </ButtonThemeSecondary>
              </div>
              <div className="div">
                <ButtonThemePrimary
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
                </ButtonThemePrimary>
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
              <ButtonThemeSecondary
                onClick={modalHandler} 
                key="Cancel"
              >
                Cancel
              </ButtonThemeSecondary>
              <ButtonThemePrimary htmlType="submit" key="submit">
                Create
              </ButtonThemePrimary>
            </div>
          </Form>
        </div>
      </Modal>

      {isState?.uploadFile && <Modal
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
        width={705}
        closeIcon={ 
          <CloseCircleFilled className="text-success-placeholder-color" />
        }
        footer={[
          <ButtonThemeSecondary onClick={modalHandler} key="Cancel">
            Cancel
          </ButtonThemeSecondary>,
          <ButtonThemePrimary loading={loading} onClick={upLoadModalHandler} key="submit">
           {loading ? 'Uploading' : 'Upload'}
          </ButtonThemePrimary>,
        ]} 
      >
        <UploadDocument
          handleDropped={handleDropped}
          setFiles={setState}
          files={isState}
        />
      </Modal>}
      {openPreview && <PdfPreviewModal
        setOpen={setOpenPreview}
        open={openPreview}
        preViewModal={preViewModal}
      />}
    </div>
  );
};

export default ManageVault;
