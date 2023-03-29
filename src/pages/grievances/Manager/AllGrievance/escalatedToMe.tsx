import React from 'react'
import {Space} from 'antd'
import GrievanceDropdown from '../../../../components/Grievance/customDropdown'
import { ROUTES_CONSTANTS } from '../../../../config/constants'
import { GlobalTable } from '../../../../components'

const UniversitesTableData =  [
    {
      no: '01',
      subject:'Attendance Log Issue',
      type: 'Others',
      date: '22/09/2022',
      escalatedTo: 'Maria Sanoid',
      status: 'New',
    },
    {
      no: '02',
      subject:'Working conditions',
      type: 'Discipline',
      date: '22/09/2022',
      escalatedTo: 'Maria Sanoid',
      status: 'In Progess',
    },
    {
      no: '03',
      subject:'Bullying',
      type: 'Personal',
      date: '22/09/2022',
      escalatedTo: 'Maria Sanoid',
      status: 'Re-Opened',
    },
    {
      no: '04',
      subject:'Attendance Log Issue',
      type: 'work',
      date: '22/09/2022',
      escalatedTo: 'Maria Sanoid',
      status: 'Resolved',
    },
 
  ]
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
      render: (text:string) => {
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
    columns={UniversitesTablecolumn}
    pagination
    tableData={UniversitesTableData}
  />
  )
}

export default EscalatedToMe
