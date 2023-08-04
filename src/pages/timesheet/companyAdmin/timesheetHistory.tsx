import { useParams, useLocation } from "react-router-dom";
import CommonHeader from "../commonHeader";
// import { timesheetMock } from "../mockData";
import CommonTableCollapsible from "../commonTableCollapsible/index";
import "./style.scss";
import { Breadcrumb, Loader } from "../../../components";
import { useEffect, useState } from "react";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import useCustomHook from "../actionHandler";
import AdminTimeSheetCustomHook from "./actionHandler";
import { dateRangeState, managerSearchState, selectedUserState, userSearchState } from "../../../store/timesheet";
import { useRecoilState } from "recoil";

const TimeSheetHistory = () => {
  const action = useCustomHook();
  const { taskDateRange, companyManagerList, fetchDateRangeTimesheet, taskInDate, rangeFilter, fetchTasksInDate } = AdminTimeSheetCustomHook();
  const { id } = useParams();
  const { user: userData } = useLocation()?.state;
  const [managerSearch, setManagerSearch] = useRecoilState(managerSearchState);
  const [dateRange, setDateRange] = useRecoilState(dateRangeState);
  const [selectedManager, setSelectedManager] = useRecoilState<any>(selectedUserState);
  const [selectedHistory, setSelectedHistory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [userSearch, setUserSearch] = useRecoilState(userSearchState);
  const [openCollapseId, setOpenCollapseId] = useState<any>(null);
  // const findTimesheet = timesheetMock.find((timesheet) => timesheet.id === "1");

  const PdfHeader = ["Date", "Total Tasks", "Total Time"];
  const PdfInnerHeader = ["Task Name", "Category", "Date", "Start Time", "End Time"];

  const PdfBody = taskDateRange?.map((task: any) => [task?.date, task?.tasks, task?.totalTime]);

  useEffect(() => {
    fetchUserData();
  }, [id, dateRange, userSearch]);
  useEffect(() => {
    if (selectedHistory) handleChangeDate();
  }, [selectedHistory]);

  const fetchUserData = () => {
    setLoading(true);
    const { startDate, endDate } = rangeFilter(dateRange);
    let params: any = { startDate, endDate, userId: id };
    if (userSearch) params["search"] = userSearch;
    fetchDateRangeTimesheet(params, () => {
      setLoading(false);
    });
  };
  const handleChangeDate = () => {
    fetchTasksInDate({ date: selectedHistory, userId: id });
  };

  return (
    <div className="timesheet-history">
      <Breadcrumb breadCrumbData={[{ name: "History" }, { name: "Timesheet", onClickNavigateTo: `/${ROUTES_CONSTANTS.TIMESHEET}` }]} />
      <CommonHeader
        setManagerSearch={setManagerSearch}
        setUserSearch={setUserSearch}
        placeholder={"Search By Date"}
        user={userData}
        setUser={setSelectedManager}
        dateRange={dateRange}
        setDateRange={setDateRange}
        users={companyManagerList}
        disabled={true}
        setDownload={(val: string) =>
          action.downloadPdfOrCsv(
            event,
            PdfHeader,
            // PdfInnerHeader,
            taskDateRange,
            "Timesheet-Detail-History",
            PdfBody
          )
        }
      />

      {taskDateRange?.length ? (
        taskDateRange.map((data: any, index: number) => (
          <CommonTableCollapsible
            key={index}
            id={index}
            dateTime={data.date}
            totalTasks={data.tasks}
            totalTime={data.totalTime}
            tableData={taskInDate || []}
            setSelectedHistory={setSelectedHistory}
            isOpen={openCollapseId === index}
            setCollapseOpen={(isOpen: any) => setOpenCollapseId(isOpen ? index : null)}
          />
        ))
      ) : loading ? (
        <Loader />
      ) : (
        <p className="font-medium opacity-[0.5] mt-[30px]">No History Found...</p>
      )}
    </div>
  );
};

export default TimeSheetHistory;
