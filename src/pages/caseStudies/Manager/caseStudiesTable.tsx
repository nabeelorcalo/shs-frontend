import React from 'react'
import { GlobalTable } from '../../../components'
import Image from '../../../assets/images/Grievances/avater-1.svg'
import DropDownNew from '../../../components/Dropdown/DropDownNew'
import { useNavigate } from 'react-router'
import { ThreeDots } from '../../../assets/images'
import './style.scss'

const CaseStudiesTable = () => {

  const navigate = useNavigate();
  const escalatedByMeTableData = [
    {
      no: '01',
      avater: Image,
      name:"Mino Marina",
      ReportName: 'September 2022',
      department: 'Design',
      assessmentDate: '20/09/2022',
      reportingManager: '+44 7700 900077',
      status: 'Pending',
    },
    {
      no: '02',
      name:"Craig Donin",
      avater: Image,
      ReportName: 'September 2022',
      department: 'Research',
      assessmentDate: '20/09/2022',
      reportingManager: '+44 2078 628009',
      status: 'Pending',
    },
    {
      no: '03',
      name:"Gustavo Korsgaard",
      avater: Image,
      ReportName: 'August 2022',
      department: 'Business',
      assessmentDate: '20/09/2022',
      reportingManager: '+44 2078 628009',
      status: 'Pending',
    },
    {
      no: '04',
      name:"Omar Schleifer",
      avater: Image,
      ReportName: 'September 2022',
      department: 'Management',
      assessmentDate: '20/09/2022',
      reportingManager: '+44 7700 900077',
      status: 'Pending',
    },
    {
      no: '05',
      avater: Image,
      name:"Adison Donin",
      ReportName: 'University of London',
      department: 'Development',
      assessmentDate: '20/09/2022',
      reportingManager: '+44 2078 628009',
      status: 'Approved',
    },
    {
      no: '06',
      name:"Lindsey Mango",
      avater: Image,
      ReportName: 'August 2022',
      department: 'Development',
      assessmentDate: '20/09/2022',
      reportingManager: '+44 2078 628009',
      status: 'Rejected',
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
              <img src={avater} alt="avater" />
            )
          }
        }
      },
      {
        dataIndex: 'name',
        key: 'name',
        title: 'Name'
      },
      {
        dataIndex: 'ReportName',
        key: 'ReportName',
        title: 'Report Name'
      },
      {
        dataIndex: 'department',
        key: 'department',
        title: 'Department'
      },
      {
        dataIndex: 'assessmentDate',
        key: 'assessmentDate',
        title: 'Assessment Date'
      },
      {
        dataIndex: 'reportingManager',
        key: 'reportingManager',
        title: 'Reporting Manager'
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
                className={`rounded-md px-2 py-1 text-white text-xs font-medium ${text === 'Pending'? 'pending':
                 text === 'Approved'? 'approved':text === 'Rejected'?'rejected' : ''} `}
              >
                {text}
              </span>
            </div>
          ),
        };
      }
      },
      {
        title: 'Action',
        dataIndex: '',
        render: (_: any, data: any) => <DropDownNew placement={'bottomRight'}
          items={[
            {
              label: <span onClick={() => navigate(`/case-studies/assessment-form/${data.no}`)}>
                Give Feedback</span>,
              key: 'feedback'
            },
            {
              label: <span onClick={()=> navigate(`/univecase-studies/assessment-form`)}>
                Reject
              </span>,
              key: 'reject'
            },
           
          ]}>
          <ThreeDots className='cursor-pointer' />
        </DropDownNew>
      },
    ]

  return (
    <GlobalTable
      columns={escalatedByMeTableColumns}
      pagination
      tableData={escalatedByMeTableData}
    />
  )
}

export default CaseStudiesTable