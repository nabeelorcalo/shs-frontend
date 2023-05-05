import React from 'react'
import { Button, Space } from 'antd'
import GrievanceDropdown from '../../../../components/Grievance/customDropdown'
import { ROUTES_CONSTANTS } from '../../../../config/constants'
import { GlobalTable } from '../../../../components'
import { CloseOutlined } from '@ant-design/icons'
import icon from '../../../../assets/images/Grievances/escalatedCrossIcon.svg'
import './style.scss'


const internGrievancesColumn =
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
            <><span className='p-2  text-base font-semibold dashboard-primary-color  escalated-btn'>
              {escalatedTo}</span><CloseOutlined className='px-2 escalated-icon' /> </>
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
const InternGrievances = (props: any) => {
  return (
    <GlobalTable
      columns={internGrievancesColumn}
      pagination
      tableData={props.internGrievancesTableData}
    />
  )
}

export default InternGrievances
