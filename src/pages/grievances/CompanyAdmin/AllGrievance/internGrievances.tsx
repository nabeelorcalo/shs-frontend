import React from 'react'
import { Button, Space } from 'antd'
import GrievanceDropdown from '../../../../components/Grievance/customDropdown'
import { ROUTES_CONSTANTS } from '../../../../config/constants'
import { GlobalTable } from '../../../../components'
import Image1 from '../../../../assets/images/Grievances/avater-1.svg'
import Image2 from '../../../../assets/images/Grievances/avater-2.svg'
import Image3 from '../../../../assets/images/Grievances/avater-3.svg'
import Image4 from '../../../../assets/images/Grievances/avater-4.svg'
import { CloseOutlined } from '@ant-design/icons'
import './style.scss'

const internGrievancesTableData = [
  {
    no: '01',
    avater: Image1,
    subject: 'Attendance Log Issue',
    type: 'Others',
    date: '22/09/2022',
    escalatedBy: 'Julie Andrews',
    escalatedTo: 'Maria Sanoid',
    status: 'New',
  },
  {
    no: '02',
    avater: Image2,
    subject: 'Attendance Log Issue',
    type: 'Others',
    date: '22/09/2022',
    escalatedBy: 'Sean Bean',
    escalatedTo: 'David Miller',
    status: 'In Progess',
  },
  {
    no: '03',
    avater: Image3,
    subject: 'Attendance Log Issue',
    type: 'Others',
    date: '22/09/2022',
    escalatedBy: 'Emma Thompson',
    escalatedTo: 'Tom Hanks',
    status: 'Re-Opened',
  },
  {
    no: '04',
    avater: Image4,
    subject: 'Attendance Log Issue',
    type: 'Others',
    date: '22/09/2022',
    escalatedTo: 'David Miller',
    escalatedBy: 'Robert Carlyle',
    status: 'Resolved',
  },
]
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
            <><Button className='text-base font-semibold dashboard-primary-color escalated-btn'>
              {escalatedTo}<CloseOutlined /> </Button></>
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
const InternGrievances = () => {
  return (
    <GlobalTable
      columns={internGrievancesColumn}
      pagination
      tableData={internGrievancesTableData}
    />
  )
}

export default InternGrievances
