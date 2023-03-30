import React from 'react'
import { Space } from 'antd'
import GrievanceDropdown from '../../../../components/Grievance/customDropdown'
import { ROUTES_CONSTANTS } from '../../../../config/constants'
import { GlobalTable } from '../../../../components'
import {
  GrievancesAvater1,
  GrievancesAvater2,
  GrievancesAvater3,
  GrievancesAvater4
} from '../../../../assets/images'

const escalatedByMeTableData = [
  {
    no: '01',
    avater: <GrievancesAvater1/>,
    subject: 'Attendance Log Issue',
    type: 'Others',
    date: '22/09/2022',
    escalatedBy: 'Julie Andrews',
    status: 'New',
  },
  {
    no: '02',
    avater: <GrievancesAvater2/>,
    subject: 'Working conditions',
    type: 'Discipline',
    date: '2/09/2022',
    escalatedBy: 'Sean Bean',
    status: 'In Progess',
  },
  {
    no: '03',
    avater:   <GrievancesAvater3/>,
    subject: 'Bullying',
    type: 'Personal',
    date: '22/09/2022',
    escalatedBy: 'Emma Thompson',
    status: 'Re-Opened',
  },
  {
    no: '04',
    avater:  <GrievancesAvater4/>,
    subject: 'Attendance Log Issue',
    type: 'Work',
    date: '04/09/2022',
    escalatedBy: 'Robert Carlyle',
    status: 'Resolved',
  },
]
const escalatedByMeTableColumns =
  [
    {
      dataIndex: 'no',
      key: 'no',
      title: 'No'
    },
    {
      dataIndex: 'avater',
      key: 'avater',
      title: 'Avater',
      render: (avater: any) => {
        return {
          children: (
           <span> {avater}</span>
          )
        }
      }
    },

    {
      dataIndex: 'escalatedBy',
      key: 'escalatedBy',
      title: 'Escalated By'
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
      dataIndex: 'status',
      key: 'status',
      title: 'Status',
      render: (text: string) => {
        return {
          children: (
            <div>
              <span
                className={`rounded-md px-2 py-1 text-white text-xs font-medium ${text === 'New'? 'new':
                 text === 'In Progess'? 'in-progress':text === 'Re-Opened'?'re-opened': text === 'Resolved' ? 'resolved' : ''} `}
              >
                {text}
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: "Action",
      key: "Action",
      render: (_: any, data: any) => (
        <Space size="middle">
          <GrievanceDropdown link={ROUTES_CONSTANTS.GRIEVANCES_Details} />
        </Space>
      ),
    },
  ]
const EscalatedToMe = () => {
  return (
    <GlobalTable
      columns={escalatedByMeTableColumns}
      pagination
      tableData={escalatedByMeTableData}
    />
  )
}

export default EscalatedToMe
