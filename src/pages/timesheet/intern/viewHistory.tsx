import CommonHeader from "../commonHeader";
import CommonTableCollapsible from "../commonTableCollapsible";
import { timesheetMock } from "../mockData";
import { Breadcrumb } from "../../../components";
import { Fragment, useEffect, useState } from "react";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import { useRecoilState } from "recoil";
import { dateRangeState } from "../../../store/timesheet";
import useCustomHook from "../actionHandler";
import InternTimeSheetHook from "./actionHandler";

const ViewHistory = () => {
  const [download, setDownload] = useState("");
  const [dateRange, setDateRange] = useRecoilState(dateRangeState);
  const [selectedHistory, setSelectedHistory] = useState<string>("");

  const action = useCustomHook();
  const { taskDateRange, taskInDate, fetchDateRangeTimesheet, fetchTasksInDate, rangeFilter } = InternTimeSheetHook();

  const PdfHeader = ["Date", "Total Tasks", "Total Time"];

  const PdfBody = taskDateRange?.map((task: any) => [task?.date, task?.tasks, task?.totalTime]);

  useEffect(() => {
    fetchUserData();
  }, [dateRange]);
  useEffect(() => {
    if (selectedHistory) handleChangeDate();
  }, [selectedHistory]);

  const fetchUserData = () => {
    const { startDate, endDate } = rangeFilter(dateRange);
    fetchDateRangeTimesheet({ startDate, endDate });
  };
  const handleChangeDate = () => {
    fetchTasksInDate({ date: selectedHistory });
  };
  return (
    <div className="view-history-wrapper">
      <Breadcrumb
        breadCrumbData={[
          { name: "History" },
          { name: "Timesheet", onClickNavigateTo: `/${ROUTES_CONSTANTS.TIMESHEET}` },
        ]}
      />

      <CommonHeader
        dateRange={dateRange}
        setDateRange={setDateRange}
        hideUser
        setDownload={(val: string) =>
          action.downloadPdfOrCsv(event, PdfHeader, taskDateRange, "Timesheet-Detail-History", PdfBody)
        }
      />

      {taskDateRange.length ? (
        taskDateRange.map((data: any, i: number) => (
          <Fragment key={i}>
            <CommonTableCollapsible
              key={i}
              id={i}
              dateTime={data.date}
              totalTasks={data.tasks}
              totalTime={data.totalTime}
              tableData={taskInDate || []}
              setSelectedHistory={setSelectedHistory}
            />
          </Fragment>
        ))
      ) : (
        <p className="font-medium opacity-[0.5] mt-[30px]">No History Found...</p>
      )}
    </div>
  );
};

export default ViewHistory;
