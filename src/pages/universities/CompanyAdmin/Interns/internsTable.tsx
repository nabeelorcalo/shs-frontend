// import DropDownNew from '../../../../components/Dropdown/DropDownNew';
// import { ThreeDots } from '../../../../assets/images';
import { GlobalTable } from '../../../../components';
// import { NavLink } from 'react-router-dom';
// import { ROUTES_CONSTANTS } from '../../../../config/constants';

const InternTable = (props: any) => {
  const { universityIntersData } = props

  const interTableColumn =
    [
      {
        dataIndex: 'no',
        key: 'no',
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
      }, {
        dataIndex: 'dateOfBirth',
        key: 'dateOfBirth',
        title: 'Date Of Birth'
      },
      {
        title: 'Action',
        dataIndex: 'action',
      }
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

