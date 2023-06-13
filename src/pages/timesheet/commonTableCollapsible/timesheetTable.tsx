import { GlobalTable } from "../../../components";
import { TagWarningIcon, TagSuccessIcon, TagPrimaryIcon } from "../../../assets/images";
import dayjs from "dayjs";

const TimesheetTable = (props: any) => {
  const { tableData } = props;

  const columns = [
    {
      key: "taskName",
      title: "Task Name",
      dataIndex: "taskName",
      render: (taskName: string) => <span className="capitalize">{taskName}</span>,
    },
    {
      key: "category",
      title: "Category",
      dataIndex: "taskCategory",
      render: (category: string) => (
        <span className="capitalize flex items-center gap-3">
          {category?.toLowerCase().includes("design") ? (
            <TagPrimaryIcon />
          ) : category?.toLowerCase()?.includes("development") ? (
            <TagSuccessIcon />
          ) : (
            <TagWarningIcon />
          )}
          {category}
        </span>
      ),
    },
    {
      key: "date",
      title: "Date",
      dataIndex: "taskDate",
      render: (taskDate: string) => <span>{dayjs(taskDate).format("DD/MM/YYYY")}</span>,
    },
    {
      key: "startTime",
      title: "Start Time",
      dataIndex: "startTime",
      render: (startTime: string) => <span>{dayjs(startTime).format("HH:MM")}</span>,
    },
    {
      key: "endTime",
      title: "End Time",
      dataIndex: "endTime",
      render: (endTime: string) => <span>{dayjs(endTime).format("HH:MM")}</span>,
    },
  ];

  return (
    <div className="timesheet-table">
      <GlobalTable bgWhiteTable pagination={false} columns={columns} tableData={tableData} />
    </div>
  );
};

export default TimesheetTable;
