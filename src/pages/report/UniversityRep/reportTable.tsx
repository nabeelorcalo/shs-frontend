import React, { useState } from 'react'
import { Alert, GlobalTable } from '../../../components'
import DropDownNew from '../../../components/Dropdown/DropDownNew'
import { ThreeDots } from '../../../assets/images'
import { useNavigate } from 'react-router-dom'
import './style.scss'

const UniversityRepReportTable = (props:any) => {
  const navigate = useNavigate();
  const [openWarningModal, setOpenWarningModal] = useState(false)
  const reportColumnData =
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
        dataIndex: 'department',
        key: 'department',
        title: 'Department'
      },
      {
        dataIndex: 'company',
        key: 'company',
        title: 'Comapny'
      },
      {
        dataIndex: 'reviewer',
        key: 'reviewer',
        title: 'Reviewer'
      },
     
      {
        title: 'Action',
        dataIndex: '',
        render: (_: any, data: any) => <DropDownNew placement={'bottomRight'}
          items={[
            {
              label: <span onClick={() => navigate(`/report/view-details/${data.no}`)}>
                View Details</span>,
              key: 'feedback'
            },            
          ]}>
          <ThreeDots className='cursor-pointer' />
        </DropDownNew>
      },
    ]

  return (
    <>
      <GlobalTable
        columns={reportColumnData}
        pagination
        tableData={props.reportTableData}
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

export default UniversityRepReportTable