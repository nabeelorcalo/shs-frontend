import React from 'react'
import { GlobalTable } from '../../../components'
import DropDownNew from '../../../components/Dropdown/DropDownNew'
import { useNavigate } from 'react-router'
import { ThreeDots } from '../../../assets/images'
const UniversityTable = (props:any) => {

  const navigate = useNavigate();
  // const escalatedByMeTableData = [
  //   {
  //     no: '01',
  //     logo: flag,
  //     universityName: 'University of Lincoln',
  //     universityRep: 'Mino Marina',
  //     email: 'enquiries@linclon.ac.uk',
  //     contact: '+44 7700 900077',
  //     city: 'Linclon',
  //   },
  //   {
  //     no: '02',
  //     logo: flag2,
  //     universityName: 'University of London',
  //     universityRep: 'Craig Donin',
  //     email: 'enquiries@london.ac.uk',
  //     contact: '+44 2078 628009',
  //     city: 'London',
  //   },
  //   {
  //     no: '03',
  //     logo: flag3,
  //     universityName: 'University of Birmingham',
  //     universityRep: 'Omar Schleifer',
  //     email: 'enquiries@birmingham.ac.uk',
  //     contact: '+44 2078 628009',
  //     city: 'Birmingham',
  //   },
  //   {
  //     no: '04',
  //     logo: flag4,
  //     universityName: 'University of Lincoln',
  //     universityRep: 'Mino Marina',
  //     email: 'enquiries@linclon.ac.uk',
  //     contact: '+44 7700 900077',
  //     city: 'Linclon',
  //   },
  //   {
  //     no: '05',
  //     logo: flag5,
  //     universityName: 'University of London',
  //     universityRep: 'Craig Donin',
  //     email: 'enquiries@london.ac.uk',
  //     contact: '+44 2078 628009',
  //     city: 'London',
  //   },
  //   {
  //     no: '06',
  //     logo: flag6,
  //     universityName: 'University of Birmingham',
  //     universityRep: 'Omar Schleifer',
  //     email: 'enquiries@birmingham.ac.uk',
  //     contact: '+44 2078 628009',
  //     city: 'Birmingham',
  //   },

  // ]
  const escalatedByMeTableColumns =
    [
      {
        dataIndex: 'no',
        key: 'no',
        title: 'No'
      },
      {
        dataIndex: 'logo',
        key: 'logo',
        title: 'Logo',
        render: (logo: any) => {
          return {
            children: (
              <img src={logo} alt="logo" />
            )
          }
        }
      },
      {
        dataIndex: 'universityName',
        key: 'universityName',
        title: 'University Name'
      },
      {
        dataIndex: 'universityRep',
        key: 'universityRep',
        title: 'University Rep'
      },
      {
        dataIndex: 'email',
        key: 'email',
        title: 'Email'
      },
      {
        dataIndex: 'contact',
        key: 'contact',
        title: 'Contact'
      },
      {
        dataIndex: 'city',
        key: 'city',
        title: 'City',
      },
      {
        title: 'Action',
        dataIndex: '',
        render: (_: any, data: any) => <DropDownNew placement={'bottomRight'}
          items={[
            {
              label: <span onClick={() => navigate(`/universities/interns`)}>
                View Details</span>,
              key: 'interns'
            },
            {
              label: <span onClick={()=> navigate(`/universities/Profile`)}>
                Profile
              </span>,
              key: 'profile'
            },
            {
              label: <span>
                Chat
              </span>,
              key: 'chat'
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
      tableData={props.escalatedByMeTableData}
    />
  )
}

export default UniversityTable