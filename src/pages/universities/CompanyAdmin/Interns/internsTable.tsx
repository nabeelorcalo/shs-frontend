import DropDownNew from '../../../../components/Dropdown/DropDownNew';
import { ThreeDots } from '../../../../assets/images';
import { GlobalTable } from '../../../../components';
import { NavLink } from 'react-router-dom';
import { ROUTES_CONSTANTS } from '../../../../config/constants';

const InternTable = (props: any) => {
  const { universityIntersData } = props

  const interTableColumn =
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
        dataIndex: 'action',
        // render: (_: any, data: any) => <DropDownNew placement={'bottomRight'}
        //   items={[{ label: <NavLink to={`/${ROUTES_CONSTANTS.STUDENTPROFILE}/${data?.userDetail?.id}`}>Profile</NavLink>, key: 'profile' },
        //   {
        //     label: <NavLink to={`/${ROUTES_CONSTANTS.CHAT}`}>
        //       Chat
        //     </NavLink>,
        //     key: 'chat'
        //   }
        //   ]}>
        //   <ThreeDots className='cursor-pointer' />
        // </DropDownNew>
      },
    ]

  return (
    <GlobalTable
      columns={interTableColumn}
      pagination
      tableData={universityIntersData}
    />
  )
}

export default InternTable

