import { Space } from 'antd'
import GrievanceDropdown from '../../../../components/Grievance/customDropdown'
import { ROUTES_CONSTANTS } from '../../../../config/constants'
import { GlobalTable } from '../../../../components'
const UniversitesTablecolumn =
  [
    {
      dataIndex: 'no',
      key: 'no',
      title: 'No'
    },
    {
      dataIndex: 'subject',
      key: 'subject',
      title: 'Subject'
    },

    {
      dataIndex: 'type',
      key: 'type',
      title: 'Type'
    },
    {
      dataIndex: 'date',
      key: 'date',
      title: 'Date'
    },
    {
      dataIndex: 'escalatedTo',
      key: 'escalatedTo',
      title: 'Escalated To'
    },
    {
      dataIndex: 'status',
      key: 'status',
      title: 'Status',
      render: (text: string) => {
        return {
          children: (
            <div>
              <span
                className={`rounded-md px-2 py-1  text-white text-sm font-normal font-[outfit]  ${text === 'New' ? 'new' :
                  text === 'In Progess' ? 'in-progress' : text === 'Re-Opened' ? 're-opened' : text === 'Resolved' ? 'resolved' : ''} `}
              >
                {text}
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
  ]
const EscalatedToMe = (props: any) => {
  return (
    <GlobalTable
      columns={UniversitesTablecolumn}
      pagination
      tableData={props.escalatedToMeTableData}
    />
  )
}

export default EscalatedToMe
