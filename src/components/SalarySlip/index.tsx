import { Card, Divider } from "antd";
import {
  Logo,
  Mail,
  IconLocation,
  UserIcon,
  DownlaodFileIcon,
} from "../../assets/images";
import { IconButton } from "../IconButton";
import SalarySlipTable from "./salarySlipTable";
import { Breadcrumb } from "../../components";
import "./style.scss";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentUserState } from "../../store";
import { ROUTES_CONSTANTS } from "../../config/constants";

export const SalarySlip = () => {

  const { state } = useLocation();
  const loggedUserDetail: any = useRecoilState(currentUserState)
  
  const tempArray = [
    { name: "Salary Slip" },
    { name: "Payments ", onClickNavigateTo: `/${ROUTES_CONSTANTS.PAYMENTS}` },
  ];

  const userDetail = [
    {
      title: loggedUserDetail?.address ? loggedUserDetail?.address : 'N/A',
      icon: <IconLocation />,
    },
    { title: loggedUserDetail[0]?.email ?? 'N/A', icon: <Mail /> },
  ];
  const recipentData = [
    {
      title: "Recipent",
      subData: [
        { icon: <UserIcon />, label: `${loggedUserDetail[0]?.firstName} ${loggedUserDetail[0]?.lastName}` },
        { icon: <IconLocation />, label: loggedUserDetail?.address ? loggedUserDetail?.address : 'N/A' },
        { icon: <Mail />, label: loggedUserDetail[0]?.email },
      ],
      rightSideData: [
        { title: "Salary Slip  No", description: "01432" },
        { title: "Date:", description: "October 22, 2022" },
      ],
    },
  ];

  const downloadClick = () => {
    window.print();
  };
  return (
    <div className="salarySlip-main-wrapper">
      <Breadcrumb breadCrumbData={tempArray} bordered={true} />
      <IconButton
        size="large"
        className="icon-btn download-btn"
        onClick={downloadClick}
        icon={<DownlaodFileIcon />}
      />
      <Card className="mt-5 main-salary-card">
        <div className="flex justify-between items-center max-sm:flex-col md:flex-row gap-3">
          <div className="w-52 flex justify-center" >
            <Logo className="logo" />
          </div>
          <div className="details flex flex-col gap-2 items-end">
            {userDetail.map((val: any) => (
              <div className="flex gap-2.5">
                <span className="text-secondary-color max-sm:text-xs md:text-lg">{val.title}</span>
                <span className="mt-1">{val?.icon}</span>
              </div>
            ))}
          </div>
        </div>
        <Divider />
        <div className="flex justify-between max-sm:flex-col md:flex-row gap-4">
          {recipentData.map((val: any) => (
            <>
              <div className="flex gap-4 flex-col recipent">
                <h3 className="text-primary-color text-lg font-semibold">
                  {val.title}
                </h3>
                {val.subData.map((item: any) => (
                  <div className="flex gap-3 items-center">
                    {item?.icon}
                    <span className="text-secondary-body-color max-sm:text-xs md:text-lg font-normal">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex xs:gap-5 md:gap-8 flex-col">
                {val.rightSideData?.map((item: any) => (
                  <>
                    <div className="flex gap-2 flex-col xs:text-left md:text-right">
                      <h3 className="text-primary-color text-lg font-semibold">
                        {item.title}
                      </h3>
                      <span className="text-secondary-body-color text-lg font-normal">
                        {item?.description}
                      </span>
                    </div>
                  </>
                ))}
              </div>
            </>
          ))}
        </div>
        {/* salary slip table */}
        <div className="mt-10">
          <SalarySlipTable tableData={state} />
          {/* {isShowNotification && (
            <ActionNotification heading="Success" description="File downloaded" icon={<Success />} />
          )} */}
        </div>
      </Card>
    </div>
  );
};
