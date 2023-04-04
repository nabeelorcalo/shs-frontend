import React, { useState } from 'react'
import { Alert, GlobalTable } from '../../../components'
import CustomDropDownCaseStudies from './customDropDown'
import './style.scss'

const CaseStudiesTable = (props: any) => {
  const [openWarningModal, setOpenWarningModal] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)
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
        tableData={props.caseStudyTableData}
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