import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContractCard } from "../../../components/ContractCard/ContractCard";
import CommonHeader from "../commonHeader";
import { timesheetMock } from "../mockData";
import { Loader, NoDataFound, PageHeader } from "../../../components";
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";
import useCustomHook from "../actionHandler";
import AdminTimeSheetCustomHook from "./actionHandler";
import { UserAvatar } from "../../../assets/images";
import { dateRangeState, managerSearchState, selectedUserState, userSearchState } from "../../../store/timesheet";
import { useRecoilState } from "recoil";
import "./style.scss";

const CompanyAdmin = () => {
  const action = useCustomHook();
  const { fetchManagerUsers, managerUserList, managerLoading, fetchCompanyManagers, companyManagerList, rangeFilter } = AdminTimeSheetCustomHook();
  const [managerSearch, setManagerSearch] = useRecoilState(managerSearchState);
  const [dateRange, setDateRange] = useRecoilState(dateRangeState);
  const [firstLoad, setFirstLoad] = useState(true);
  const [selectedManager, setSelectedManager] = useRecoilState<any>(selectedUserState);
  const [userSearch, setUserSearch] = useRecoilState(userSearchState);
  const navigate = useNavigate();
  const PdfHeader = ["No", "User Name", "Designation", "Total Hours", "Progress", "Worked Hours"];
  const PdfBody = managerUserList.map((managerUser: any) => {
    return [
      managerUser?.userId,
      managerUser?.userDetail?.firstName + " " + managerUser?.userDetail?.lastName,
      managerUser?.userType,
      managerUser?.totalTime,
      `${managerUser?.workedPercentage}%`,
      managerUser?.workedTime,
    ];
  });

  useEffect(() => {
    setDateRange("this week");
  }, []);

  useEffect(() => {
    fetchCompanyManagersByAdmin();
  }, [managerSearch]);

  useEffect(() => {
    fetchUsersList();
  }, [dateRange, selectedManager, userSearch]);

  const fetchCompanyManagersByAdmin = () => {
    fetchCompanyManagers({ page: 1, limit: 1000, search: managerSearch });
  };

  const fetchUsersList = async () => {
    const { startDate, endDate } = rangeFilter(firstLoad ? "this week" : dateRange);
    fetchManagerUsers({ startDate, endDate, managerId: selectedManager?.managerId, search: userSearch }, () => {
      setFirstLoad(false);
    });
  };

  return (
    <div className="timesheet-wrapper">
      <PageHeader title="Timesheets" bordered />
      <CommonHeader
        setManagerSearch={setManagerSearch}
        managerSearch={managerSearch}
        user={selectedManager}
        setUser={setSelectedManager}
        dateRange={dateRange}
        setDateRange={setDateRange}
        users={companyManagerList}
        setUserSearch={setUserSearch}
        setDownload={() =>
          action.downloadPdfOrCsv(
            event,
            PdfHeader,
            managerUserList.map((managerUser: any) => {
              return {
                id: managerUser?.userId,
                userName: managerUser?.userDetail?.firstName + " " + managerUser?.userDetail?.lastName,
                userType: managerUser?.userType,
                totalTime: managerUser?.totalTime,
                percentage: `${managerUser?.workedPercentage}%`,
                workedTime: managerUser?.workedTime,
              };
            }),
            "Timesheet-History",
            PdfBody
          )
        }
      />
      {managerLoading ? (
        <Loader />
      ) : managerUserList?.length > 0 ? (
        managerUserList?.map((data: any, i) => (
          <ContractCard
            key={i}
            className="mt-[30px] timesheet-work-history"
            cardWithProgressBar
            userName={data?.userDetail?.firstName + " " + data?.userDetail?.lastName}
            designation={data.userType}
            userImg={`${constants.MEDIA_URL}/${data?.userDetail?.profileImage?.mediaId}.${data?.userDetail?.profileImage?.metaData?.extension}`}
            progress={data?.workedPercentage}
            strokeColor={"#3DC575"}
            totalHours={data?.totalTime}
            workedHours={data.workedTime}
            handleViewAll={() => {
              setUserSearch("");
              setManagerSearch("");
              setSelectedManager(null);
              navigate(`/${ROUTES_CONSTANTS.TIMESHEETHISTORY}/${data?.userId}`, {
                state: {
                  user: {
                    companyManager: {
                      image: `${constants.MEDIA_URL}/${data?.userDetail?.profileImage?.mediaId}.${data?.userDetail?.profileImage?.metaData?.extension}`,
                      ...data.userDetail,
                    },
                  },
                },
              });
            }}
          />
        ))
      ) : (
        <NoDataFound isNoBorder />
      )}
    </div>
  );
};

export default CompanyAdmin;
