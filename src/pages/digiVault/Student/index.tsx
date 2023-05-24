import { useEffect, useState } from "react";
import { Col, Divider, Progress, Row, Menu, Space } from "antd";
import { GlobalTable, Notifications } from "../../../components";
import { ColorfullIconsWithProgressbar } from "../../../components/ColorfullIconsWithProgressbar";
import DigivaultCard from "../../../components/DigiVaultCard";
import { useNavigate } from "react-router-dom";
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
  FileIcon,
  FolderIcon,
} from "../../../assets/images";
import CustomDroupDown from "./dropDownCustom";
import { Alert } from "../../../components";
import "./style.scss";
import useCustomHook from "../actionHandler";
import DigiVaultModals from "./Modals";
import dayjs from "dayjs";
import UnlockVault from "./newPasswordModal/unlockVaultModal/unlockVault";

const manageVaultArr = [
  {
    id: "1",
    titleImg: EducationImg,
    subImg: EducationImgSub,
    title: "Education",
    subTitle: "Manage your educational documents",
    path: "education",
    bgcolor: "#4CA4FD",
  },
  {
    id: "2",
    titleImg: BAnkingImg,
    subImg: BAnkingImgSub,
    title: "Banking",
    subTitle: "Manage your banking documents",
    path: "banking",
    bgcolor: "#5D89F2",
  },
  {
    id: "3",
    titleImg: HealthImg,
    subImg: HealthImgSub,
    title: "Health",
    subTitle: "Manage your health documents",
    path: "health",
    bgcolor: "#5D89F4",
  },
  {
    id: "4",
    titleImg: TransImg,
    subImg: TransImgSub,
    title: "Transportation",
    subTitle: "Manage your transportation documents",
    path: "transport",
    bgcolor: "#5D89F8",
  },
  {
    id: "5",
    titleImg: GovImg,
    subImg: GovImgSub,
    title: "Government",
    subTitle: "Manage your government documents",
    path: "government",
    bgcolor: "#5D89F8",
  },
  {
    id: "6",
    titleImg: Other,
    title: "Others",
    subTitle: "Manage your others documents",
    path: "others",
    bgcolor: "#5D89F8",
  },
];

const DigiVaultStudent = () => {
  const [state, setState] = useState({
    isToggle: false,
    delId: null
  })
  // const [unlockPassword, setUnlockPassword] = useState(null)
  const { getDigiVaultDashboard, studentVault, deleteFolderFile }: any = useCustomHook();
  const studentStorage: any = studentVault?.storage;

  useEffect(() => {
    getDigiVaultDashboard(null)
  }, [])

  // if (studentVault === undefined) {
  //   // Notifications({ title: 'Error', description: 'Please set your password', type: 'error' })
  //   // <UnlockVault />
  //   // setState({ ...state, unlockVault: true })
  // }

  const navigate = useNavigate();

  const menu1 = (id: any) => {
    return <Menu>
      <Menu.Item
        key="2"
        onClick={() => {
          setState(
            {
              ...state,
              isToggle: true,
              delId: id
            })
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
  }
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
    },
  ];
  const newTableData = studentVault?.recentFiles?.slice(0, 3).map((item: any, index: number) => {
    const modifiedDate = dayjs(item.createdAt).format("YYYY-MM-DD");
    return (
      {
        key: index,
        Title: <p>
          <span>{item.mode === 'file' ? <FileIcon /> : <FolderIcon />}</span>
          <span className="ml-2">{item.title}</span>
        </p>,
        datemodified: modifiedDate,
        size: item.size ? item.size : '---',
        Action: <Space size="middle">
          <CustomDroupDown menu1={menu1(item.id)} />
        </Space>
      }
    )
  })

  return (
    <div className="digivault">
      <Alert
        state={state.isToggle}
        setState={setState}
        type="error"
        okBtntxt="Delete"
        cancelBtntxt="Cancel"
        children={<p>Are you sure you want to delete this?</p>}
        okBtnFunc={() => deleteFolderFile(state.delId)}
      />
      <Row className="items-center">
        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
          <div className="digivault-title text-2xl font-semibold">
            DigiVault
          </div>
        </Col>

        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
          <div className="flex justify-end items-center gap-4">
            <DigiVaultModals />
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
              {manageVaultArr?.map((item: any, index: number) => {
                return (
                  <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                    <DigivaultCard
                      index={index}
                      bgColor={item.bgcolor}
                      onClick={() => navigate(item.path, { state: item.title })}
                      TitleImg={item.titleImg}
                      SubImg={item.subImg}
                      title={item.title}
                      subTitle={item.subTitle}
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
                <Progress
                  strokeLinecap="butt"
                  strokeWidth={10}
                  gapPosition="left"
                  type="circle"
                  percent={75} />
              </Col>
              <Col xxl={13} xl={12} lg={24} md={12} sm={14} xs={24} className="flex flex-col justify-center" >
                <div className="available-storage pb-4">Available Storage</div>
                <div className="available-storage-value">{studentStorage?.availableStorage}</div>
              </Col>
            </Row>
            <div className="pt-2">
              <ColorfullIconsWithProgressbar storage={studentStorage} />
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
                tableData={newTableData}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DigiVaultStudent;
