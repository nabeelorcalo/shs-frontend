import { useEffect, useState } from "react";
import { Button, Col, Divider, Progress, Row, Switch, Menu } from "antd";
import SettingModal from "./settingModal";
import { GlobalTable } from "../../../components";
import { ColorfullIconsWithProgressbar } from "../../../components/ColorfullIconsWithProgressbar";
import DigivaultCard from "../../../components/DigiVaultCard";
import { useNavigate } from "react-router-dom";
import NewPasswordModal from "./newPasswordModal";
import {
  EducationImg,
  EducationImgSub,
  BAnkingImg,
  BAnkingImgSub,
  HealthImg,
  HealthImgSub,
  TransImg,
  TransImgSub,
  GovImg,
  GovImgSub,
  Other,
  Gallery,
  Doc,
  Video,
  File,
  SettingIcon,
} from "../../../assets/images";
import CustomDroupDown from "./dropDownCustom";
import { Alert } from "../../../components";
import "./style.scss";
import useCustomHook from "../actionHandler";

const manageVaultArr = [
  {
    id: "1",
    titleImg: EducationImg,
    subImg: EducationImgSub,
    Title: "Education",
    subTitle: "Manage your educational documents",
    path: "education",
    bgcolor: "#4CA4FD",
  },
  {
    id: "2",
    titleImg: BAnkingImg,
    subImg: BAnkingImgSub,
    Title: "Banking",
    subTitle: "Manage your banking documents",
    path: "banking",
    bgcolor: "#5D89F2",
  },
  {
    id: "3",
    titleImg: HealthImg,
    subImg: HealthImgSub,
    Title: "Health",
    subTitle: "Manage your health documents",
    path: "health",
    bgcolor: "#5D89F4",
  },
  {
    id: "4",
    titleImg: TransImg,
    subImg: TransImgSub,
    Title: "Transportation",
    subTitle: "Manage your transportation documents",
    path: "transport",
    bgcolor: "#5D89F8",
  },
  {
    id: "5",
    titleImg: GovImg,
    subImg: GovImgSub,
    Title: "Government",
    subTitle: "Manage your government documents",
    path: "government",
    bgcolor: "#5D89F8",
  },
  {
    id: "6",
    titleImg: Other,
    Title: "Others",
    subTitle: "Manage your others documents",
    path: "others",
    bgcolor: "#5D89F8",
  },
];
const tableData = [
  {
    id: "1",
    key: "01",
    Title: "file",
    datemodified: "kljdasfhuasd",
    size: "123",
    Actions: "fduhguisd",
  },
  {
    id: "2",
    key: "02",
    Title: "file2",
    datemodified: "kljdasfhuasd",
    size: "123",
    Actions: "fduhguisd",
  },
  {
    id: "3",
    key: "03",
    Title: "file3",
    datemodified: "kljdasfhuasd",
    size: "123",
    Actions: "fduhguisd",
  },
];

const DigiVaultStudent = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [newPass, setNewPass] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const { getDigiVaultDashboard, studentVault }: any = useCustomHook();

  useEffect(() => {
    getDigiVaultDashboard()
  }, [])
  const studentStorage: any = studentVault?.storage;
  const menu1 = (
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

  const navigate = useNavigate();

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
      dataIndex: "Action",
      render: (_: any, data: any) => <CustomDroupDown menu1={menu1} />,
    },
  ];

  return (
    <div className="digivault">
      <Alert
        state={showDelete}
        setState={setShowDelete}
        type="error"
        okBtntxt="Delete"
        cancelBtntxt="Cancel"
        children={<p>Are you sure you want to delete this?</p>}
      />

      <NewPasswordModal
        newPass={newPass}
        setNewPass={setNewPass}
        setIsChecked={setIsChecked}
      />
      <SettingModal modal2Open={modal2Open} setModal2Open={setModal2Open} />
      <Row className="items-center">
        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
          <div className="digivault-title text-2xl font-semibold">
            DigiVault
          </div>
        </Col>

        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
          <div className="flex justify-end items-center gap-4">
            <div className="flex items-center">
              <p className="pr-2 text-teriary-color">Lock</p>
              <Switch
                checked={isChecked}
                onClick={() => {
                  setNewPass(true);
                }}
              />
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
      <Row gutter={[20, 10]} className="">
        <Col xxl={18} xl={16} lg={16} md={24} sm={24} xs={24}>
          <div className="manage-vault ">
            <div className="text-2xl font-semibold primary-color">
              Manage your vault
            </div>
            <Row gutter={[15, 15]} className="p-7">
              {studentVault?.dashboardFolders?.map((item: any, index: number) => {
                return (
                  <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                    <p>{item.title}</p>

                    <DigivaultCard
                      // index={index}
                      // bgColor={item.bgcolor}
                      // onClick={() => navigate()}
                      // TitleImg={item.titleImg}
                      // SubImg={item.subImg}
                      title={item.title}
                    // subTitle={item.subTitle}
                    />
                  </Col>
                );
              })}
            </Row>
          </div>
        </Col>
        <Col xxl={6} xl={8} lg={8} md={24} sm={24} xs={24}>
          <div className="storage">
            <Row gutter={[20, 10]} className="storage-bar-header max-sm:text-center">
              <Col xxl={11} xl={12} lg={24} md={8} sm={8} xs={24}>
                <Progress strokeLinecap="butt" strokeWidth={10} gapPosition="left" type="circle" percent={75} />
              </Col>
              <Col xxl={13} xl={12} lg={24} md={12} sm={14} xs={24} className="flex flex-col justify-center" >
                <div className="available-storage pb-4">Available Storage</div>
                <div className="available-storage-value">{studentStorage?.availableStorage}</div>
              </Col>
            </Row>
            <div className="pt-2">
              <ColorfullIconsWithProgressbar />
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
