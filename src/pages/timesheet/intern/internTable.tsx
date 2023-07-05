import dayjs from "dayjs";
import { ClockDarkIcon } from "../../../assets/images";
import { GlobalTable, BoxWrapper, SimpleTimer } from "../../../components";
import { Divider } from "antd";
import { Fragment } from "react";

const InternTable = (props: any) => {
  const { tableData, totalTime, setEditData, setEditModal, editModal, editData, setAddModal } = props;
  const columns = [
    {
      key: "timer",
      title: "",
      dataIndex: "",
      render: (_: any, record: any) => (
        <div
          onClick={() => {
            setEditModal(true);
            setEditData(record);
            setAddModal(false);
          }}
        >
          <SimpleTimer hideCounter iconHiehgt={"32px"} iconWidth={"32px"} />
        </div>
      ),
    },
    { key: "taskName", title: "Task Name", dataIndex: "taskName" },
    { key: "category", title: "Category", dataIndex: "taskCategory" },
    {
      key: "date",
      title: "Date",
      dataIndex: "taskDate",
      render: (taskDate: any) => <span>{dayjs(taskDate).format("DD/MM/YYYY")}</span>,
    },
    {
      key: "startTime",
      title: "Start Time",
      dataIndex: "startTime",
      render: (startTime: any, record: any) => <span>{dayjs(record?.startTime).format("HH:mm")}</span>,
    },
    {
      key: "endTime",
      title: "End Time",
      dataIndex: "endTime",
      render: (endTime: any, record: any) => <span>{dayjs(record?.endTime).format("HH:mm")}</span>,
    },
  ];

  // const tableData = [
  //     {
  //         id: '1',
  //         taskName: 'UI/UX design',
  //         category: 'design task',
  //         date: '01/05/2023',
  //         startTime: '01:10',
  //         endTime: '03:45'
  //     },
  //     {
  //         id: '2',
  //         taskName: 'homepage deisgn',
  //         category: 'outdoor activities',
  //         date: '01/05/2023',
  //         startTime: '01:10',
  //         endTime: '03:45'
  //     },
  //     {
  //         id: '3',
  //         taskName: 'field task',
  //         category: 'research',
  //         date: '01/05/2023',
  //         startTime: '01:10',
  //         endTime: '03:45'
  //     },
  //     {
  //         id: '4',
  //         taskName: 'website research',
  //         category: 'design task',
  //         date: '01/05/2023',
  //         startTime: '01:10',
  //         endTime: '03:45'
  //     },
  // ]

  return (
    <BoxWrapper boxShadow="0px 0px 8px 1px rgba(9, 161, 218, 0.1)" className="intern-table">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="day-selection text-base">Today</p>
        <div className="clock-time flex items-center gap-3">
          <ClockDarkIcon />
          <p className="font-medium">{totalTime}</p>
        </div>
      </div>
      <Divider />
      <GlobalTable
        bgWhiteTable
        columns={columns}
        tableData={tableData}
        pagination={false}
        onRow={(record: any) => ({
          onClick: () => {
            setEditModal(true);
            setEditData(record);
            setAddModal(false);
          },
          style: { cursor: "pointer" },
        })}
      />
    </BoxWrapper>
  );
};

export default InternTable;
