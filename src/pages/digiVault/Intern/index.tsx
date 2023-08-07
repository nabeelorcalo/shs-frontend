import { useEffect, useState } from "react";
import { Col, Divider, Progress, Row } from "antd";
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
} from "../../../assets/images";
import DigiVaultModals from "../Student/Modals";
import useCustomHook from "../actionHandler";
import RecentFiles from "../Student/recent-files";
import "../Student/style.scss";
import { useRecoilValue } from "recoil";
import { newDigiList } from "../../../store";

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

const DigiVaultIntern = () => {
  const navigate = useNavigate();
  const { getDigiVaultDashboard, studentVault }: any = useCustomHook();
  const studentVaultData = useRecoilValue(newDigiList)
  const [state, setState] = useState<any>({
    isToggle: false,
    delId: null,
    isPassword: studentVault?.lockResponse ? false : true,
    isLock: ((studentVaultData !== undefined && studentVault?.lockResponse['isLock']))
      ? studentVault?.lockResponse['isLock'] : false,
  })
  const [isLockUnLockPassword,
    setIsLockUnLockPassword] = useState((studentVaultData === undefined &&
      (!state.isLock && studentVaultData !== undefined))
      ? true : false)
  const studentStorage: any = studentVault?.storage;

  useEffect(() => {
    getDigiVaultDashboard(null)
  }, [])

console.log(studentVault,studentVaultData);


  return (
    <div className="digivault">
      <Row className="items-center">
        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
          <div className="digivault-title text-2xl font-semibold">
            DigiVault
          </div>
        </Col>

        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
          <div className="flex justify-end items-center gap-4">
            <DigiVaultModals
              isLockUnLockPassword={isLockUnLockPassword}
              setIsLockUnLockPassword={setIsLockUnLockPassword}
              isLock={state.isLock}
              autoLock={studentVault?.lockResponse ? studentVault?.lockResponse?.autoLockAfter : 1}
            />
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
            <Row gutter={[20, 25]} className="p-7">
              {manageVaultArr.map((item, index) => {
                return (
                  <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                    <DigivaultCard
                      index={index}
                      bgColor={item.bgcolor}
                      onClick={() => studentVault === undefined ?
                        (setIsLockUnLockPassword(true),
                          setState({ ...state, isLock: true })
                        )
                        :
                        navigate(item.path, { state: item.Title })}
                      TitleImg={item.titleImg}
                      SubImg={item.subImg}
                      title={item.Title}
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
                  percent={getStoragePercentage(
                    studentStorage?.availableStorage
                  )}
                />
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
          <RecentFiles myStates={state} setState={setState} studentVault={studentVault} />
        </Col>
      </Row>
    </div>
  );
}

function getStoragePercentage(data: any) {
  if (!data) return 0;
  const [used, i, available, x] = data.split(" ");
  return Math.ceil((Number(used) / 1000 / Number(available)) * 100);
}

export default DigiVaultIntern