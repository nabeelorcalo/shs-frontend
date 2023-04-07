import { GlobalTable } from '../../../components'
import DropDownNew from '../../../components/Dropdown/DropDownNew'
import { useNavigate } from 'react-router'
import { ThreeDots } from '../../../assets/images'
import { NavLink } from 'react-router-dom'
import { ROUTES_CONSTANTS } from '../../../config/constants'
const UniversityTable = (props:any) => {
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
              label:
              <NavLink to={`/${ROUTES_CONSTANTS.UNIVERSITIES_INTERNS}`}> 
              View Details
              </NavLink>,
              key: 'interns'
            },
            {
              label:  
               <NavLink to={`/${ROUTES_CONSTANTS.UNIVERSITIES_PROFILE}`}> 
              Profile
              </NavLink>,
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