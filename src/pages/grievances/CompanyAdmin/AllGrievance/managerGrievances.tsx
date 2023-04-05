import React from 'react'
import {Space } from 'antd'
import GrievanceDropdown from '../../../../components/Grievance/customDropdown'
import { ROUTES_CONSTANTS } from '../../../../config/constants'
import { GlobalTable } from '../../../../components'
import Image1 from '../../../../assets/images/Grievances/avater-1.svg'
import Image2 from '../../../../assets/images/Grievances/avater-2.svg'
import Image3 from '../../../../assets/images/Grievances/avater-3.svg'
import Image4 from '../../../../assets/images/Grievances/avater-4.svg'
import './style.scss'


const managerGrievancesColumn =
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
            <><img src={avater} /></>
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
      dataIndex: 'escalatedTo',
      key: 'escalatedTo',
      title: 'Escalated To',
      render: (escalatedTo: string) => {
        return {
          children: (
            <>
              {escalatedTo}</>
          )
        }
      }
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
const ManagerGrievances = (props:any) => {
  return (
    <GlobalTable
      columns={managerGrievancesColumn}
      pagination
      tableData={props.managerGrievancesTableData}
    />
  )
}

export default ManagerGrievances
