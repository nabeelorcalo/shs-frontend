import React, { useState } from 'react'
import { Alert, GlobalTable } from '../../../components'
import Image from '../../../assets/images/Grievances/avater-1.svg'
import DropDownNew from '../../../components/Dropdown/DropDownNew'
import { ThreeDots } from '../../../assets/images'
import { useNavigate } from 'react-router-dom'
import './style.scss'

const UniversityRepReportTable = () => {
  const navigate = useNavigate();
  const [openWarningModal, setOpenWarningModal] = useState(false)

  const reportTableData = [
    {
      no: '01',
      avater: Image,
      name: "Mino Marina",
      department: 'Design',
      company: 'Power Source',
      reviewer: 'Amilia Clark',
    },
    {
      no: '02',
      name: "Craig Donin",
      avater: Image,
      department: 'Research',
      company: 'DevSpot',
      reviewer: 'Jacob Jones',
    },
    {
      no: '03',
      name: "Gustavo Korsgaard",
      avater: Image,
      department: 'Business',
      company: 'Abacus',
      reviewer: 'Savannah',
    },
    {
      no: '04',
      name: "Omar Schleifer",
      avater: Image,
      department: 'Management',
      company: 'Orcalo Holdings',
      reviewer: 'Albert Flores',
    },
    {
      no: '05',
      avater: Image,
      name: "Adison Donin",
      department: 'Development',
      company: 'Poer Source',
      reviewer: 'Leslie Alexander',
  
    },
    {
      no: '06',
      name: "Lindsey Mango",
      avater: Image,
      department: 'Development',
      company: 'Poer Source',
      reviewer: 'Wade Warren',
     
    },
  ]
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
        tableData={reportTableData}
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