import React, { useState } from 'react'
import { Alert, GlobalTable } from '../../../components'
import Image from '../../../assets/images/Grievances/avater-1.svg'
import './style.scss'
import CustomDropDown from './customDropDown'
import CustomDropDownCaseStudies from './customDropDown'

const CaseStudiesTable = () => {
  const [openWarningModal, setOpenWarningModal] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)


  const caseStudyTableData = [
    {
      no: '01',
      avater: Image,
      name: "Mino Marina",
      ReportName: 'September 2022',
      department: 'Design',
      assessmentDate: '20/09/2022',
      reportingManager: '+44 7700 900077',
      status: 'Pending',
    },
    {
      no: '02',
      name: "Craig Donin",
      avater: Image,
      ReportName: 'September 2022',
      department: 'Research',
      assessmentDate: '20/09/2022',
      reportingManager: '+44 2078 628009',
      status: 'Pending',
    },
    {
      no: '03',
      name: "Gustavo Korsgaard",
      avater: Image,
      ReportName: 'August 2022',
      department: 'Business',
      assessmentDate: '20/09/2022',
      reportingManager: '+44 2078 628009',
      status: 'Pending',
    },
    {
      no: '04',
      name: "Omar Schleifer",
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
      name: "Adison Donin",
      ReportName: 'University of London',
      department: 'Development',
      assessmentDate: '20/09/2022',
      reportingManager: '+44 2078 628009',
      status: 'Approved',
    },
    {
      no: '06',
      name: "Lindsey Mango",
      avater: Image,
      ReportName: 'August 2022',
      department: 'Development',
      assessmentDate: '20/09/2022',
      reportingManager: '+44 2078 628009',
      status: 'Rejected',
    },
  ]
  const caseStudyColumnData =
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
              <div className='case-studies-table'>
                <span
                  className={`rounded-md px-2 py-1 text-white text-xs font-medium ${text === 'Pending' ? 'pending' :
                    text === 'Approved' ? 'approved' : text === 'Rejected' ? 'rejected' : ''} `}
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
        render: (_: any, data: any) => <CustomDropDownCaseStudies setState={setOpenDropdown}
          state={openDropdown} data={data.no} openWarningModal={openWarningModal} setOpenWarningModal={setOpenWarningModal} />
      },
    ]

  return (
    <>
      <GlobalTable
        columns={caseStudyColumnData}
        pagination
        tableData={caseStudyTableData}
      />
      <Alert
        state={openWarningModal}
        setState={setOpenWarningModal}
        type="warning"
        okBtntxt="Delete"
        cancelBtntxt="Cancel"
        children={<p>Are you sure you want to reject this case study?</p>}

      />
   
      

    </>
  )
}

export default CaseStudiesTable