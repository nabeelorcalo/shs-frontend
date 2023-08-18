import { Tooltip } from "antd";
import { GlobalTable } from "../../../../components";
import HistoryModal from "../HistoryModal";
import AttendaceLog from "../AttendanceLogModal";

const AllData = (props: any) => {
  const { tableData, state, setState, label, pagination, loading, pagesObj, handleTableChange, setLoading, args } = props;

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Subject",
      dataIndex: "Subject",
      key: "Subject",
      minWidth: 300,
      render: (_: any, data: any) => (
        <Tooltip color={"#363565"} placement="bottom" title={data.Subject}>
          <p>{data.Subject}</p>
        </Tooltip>
      ),
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "Type",
    },
    {
      title: "Reported By",
      dataIndex: "ReportedBy",
      key: "Reported By",
    },
    {
      title: "Role",
      dataIndex: "Role",
      key: "Role",
    },
    {
      title: "Priority",
      key: "Priority",
      dataIndex: 'priority'
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
    },
    {
      title: "Assigned",
      dataIndex: "Assigned",
      key: "Assigned",
    },
    {
      title: "Status",
      key: "Status",
      dataIndex: 'status',
    },
    {
      title: "Action",
      key: "Action",
      dataIndex: "action",
    },
  ];

  return (
    <div>
      <HistoryModal state={state} setHistory={setState} />
      {state.openModal && <AttendaceLog open={state} setOpen={setState} label={label} setLoading={setLoading} args={args} />}
      <div>
        <GlobalTable
          id="helpdeskTable"
          loading={loading}
          pagination={pagination}
          columns={columns}
          tableData={tableData}
          pagesObj={pagesObj}
          handleTableChange={handleTableChange}
        />
      </div>
    </div>
  );
};

export default AllData;