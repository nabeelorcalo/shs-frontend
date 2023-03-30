import React from 'react'
import DropDownNew from '../../../../components/Dropdown/DropDownNew'
import { ThreeDots } from '../../../../assets/images'
import { GlobalTable } from '../../../../components'

interface IDUMMYDATA {
 dummyData?:any
 menu?:any
 index?: any
}

const InternTable = (props:IDUMMYDATA) => {
  const {dummyData ,menu } = props

const escalatedByMeTableColumns =
  [
    {
      dataIndex: 'id',
      key: 'id',
      title: 'No.'
    },
    {
      dataIndex: 'avatar',
      key: 'avatar',
      title: 'Avatar',
      render: (avatar: any) => {
        return {
          children: (
           <img src={avatar} alt="avatar"/>
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
      dataIndex: 'joiningDate',
      key: 'joiningDate',
      title: 'Joining Date'
    },
    {
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      title: 'Date Of Birth'
    },
    {
      title: 'Action',
      dataIndex: '',
      render: (_: any, data: any) => <DropDownNew placement={'bottomRight'}
        items={[
          {
            label:<span>
              Profile
            </span>,
            key:'profile'
          },
          {
            label:<span>
              Chat
            </span>,
            key:'chat'
          }
        ]}>
        <ThreeDots className='cursor-pointer' />
      </DropDownNew>
    },
  ]

  return (
    <GlobalTable
      columns={escalatedByMeTableColumns}
      pagination
      tableData={dummyData}
    />
  )
}

export default InternTable