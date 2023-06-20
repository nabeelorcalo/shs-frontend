import { Space } from "antd";
import GrievanceDropdown from "../../../../components/Grievance/customDropdown";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import { GlobalTable } from "../../../../components";
import dayjs from "dayjs";
const statusObj: any = {
  NEW: "new",
  INPROGRESS: "in-progress",
  REOPEN: "re-opened",
  RESOLVED: "resolved",
};
const UniversitesTablecolumn = [
  {
    dataIndex: "id",
    key: "id",
    title: "No",
  },
  {
    dataIndex: "subject",
    key: "subject",
    title: "Subject",
  },

  {
    dataIndex: "type",
    key: "type",
    title: "Type",
    render: (text: any) => <span className="capitalize">{text?.toLowerCase()}</span>,
  },
  {
    dataIndex: "date",
    key: "createdAt",
    title: "Date",
    render: (text: any) => <span>{dayjs(text).format("DD-MM-YYYY")}</span>,
  },
  {
    dataIndex: "escalatedTo",
    key: "escalatedTo",
    title: "Escalated To",
    render: (text: any, record: any) => <span>{record?.escalated?.firstName + " " + record.escalated?.lastName}</span>,
  },
  {
    dataIndex: "status",
    key: "status",
    title: "Status",
    render: (text: string) => {
      return {
        children: (
          <div>
            <span className={`rounded-md px-2 py-1  text-white text-sm font-normal capitalize ${statusObj[text]} `}>
              {statusObj[text]}
            </span>
          </div>
        ),
      };
    },
  },

  {
    title: "Actions",
    key: "Action",
    render: (_: any, data: any) => (
      <Space size="middle">
        <GrievanceDropdown link={ROUTES_CONSTANTS.GRIEVANCES_DETAILS} />
      </Space>
    ),
  },
];
const EscalatedToMe = (props: any) => {
  return <GlobalTable columns={UniversitesTablecolumn} pagination tableData={props.escalatedToMeTableData} />;
};

export default EscalatedToMe;
