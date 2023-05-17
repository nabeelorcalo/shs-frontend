import React from 'react'
import { Space } from 'antd'
import GrievanceDropdown from '../../../../components/Grievance/customDropdown'
import { ROUTES_CONSTANTS } from '../../../../config/constants'
import { GlobalTable } from '../../../../components'

const EscalatedToMeTableColumn =
  [
    {
      dataIndex: 'no',
      key: 'no',
      title: 'No'
    },
    {
      dataIndex: 'avater',
      key: 'avater',
      title: 'Avatar',
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
                className={`rounded-md px-2 py-1  text-white text-sm font-normal ${text === 'New' ? 'new' :
                  text === 'In Progess' ? 'in-progress' : text === 'Re-Opened' ? 're-opened' : text === 'Resolved' ? 'resolved' : ''} `} >
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
      columns={EscalatedToMeTableColumn}
      pagination
      tableData={props.escalatedToMeTableData}
    />
  )
}

export default EscalatedToMe
