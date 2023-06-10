import { useParams } from "react-router-dom";
import CommonHeader from "../commonHeader";
import { timesheetMock } from "../mockData";
import CommonTableCollapsible from "../commonTableCollapsible/index";
import "./style.scss";
import { Breadcrumb } from "../../../components";
import { useEffect, useState } from "react";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import useCustomHook from "../actionHandler";
import AdminTimeSheetCustomHook from "./actionHandler";
import { dateRangeState, managerSearchState, selectedUserState, userSearchState } from "../../../store/timesheet";
import { useRecoilState } from "recoil";

const TimeSheetHistory = () => {
  const action = useCustomHook();
  const { taskDateRange, companyManagerList, fetchDateRangeTimesheet, taskInDate, rangeFilter, fetchTasksInDate } =
    AdminTimeSheetCustomHook();
  const { id } = useParams();
  const [managerSearch, setManagerSearch] = useRecoilState(managerSearchState);
  const [dateRange, setDateRange] = useRecoilState(dateRangeState);
  const [selectedManager, setSelectedManager] = useRecoilState<any>(selectedUserState);
  const [selectedHistory, setSelectedHistory] = useState<string>("");
  const [userSearch, setUserSearch] = useRecoilState(userSearchState);
  // const findTimesheet = timesheetMock.find((timesheet) => timesheet.id === "1");

  const PdfHeader = ["Date", "Total Tasks", "Total Time"];
  const PdfInnerHeader = ["Task Name", "Category", "Date", "Start Time", "End Time"];

  const PdfBody = taskDateRange?.map((task: any) => [task?.date, task?.tasks, task?.totalTime]);

  useEffect(() => {
    fetchUserData();
  }, [id, dateRange]);
  useEffect(() => {
    if (selectedHistory) handleChangeDate();
  }, [selectedHistory]);

  const fetchUserData = () => {
    const { startDate, endDate } = rangeFilter(dateRange);
    fetchDateRangeTimesheet({ startDate, endDate, userId: id });
  };
  const handleChangeDate = () => {
    fetchTasksInDate({ date: selectedHistory, userId: id });
  };

  return (
    <div className="timesheet-history">
      <Breadcrumb
        breadCrumbData={[
          { name: "History" },
          { name: "Timesheet", onClickNavigateTo: `/${ROUTES_CONSTANTS.TIMESHEET}` },
        ]}
      />
      <CommonHeader
        setManagerSearch={setManagerSearch}
        setUserSearch={setUserSearch}
        user={selectedManager}
        setUser={setSelectedManager}
        dateRange={dateRange}
        setDateRange={setDateRange}
        users={companyManagerList}
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
          />
        ))
      ) : (
        <p className="font-medium opacity-[0.5] mt-[30px]">No History Found...</p>
      )}
    </div>
  );
};

export default TimeSheetHistory;
