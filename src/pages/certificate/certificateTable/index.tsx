import { GlobalTable } from '../../../components';
import { BoxWrapper } from '../../../components';
import { ThreeDots } from '../../../assets/images';
// import { tableMockData } from './tableMock';
import { useNavigate } from 'react-router-dom';
import DropDownNew from '../../../components/Dropdown/DropDownNew';
import { ROUTES_CONSTANTS } from '../../../config/constants';
import { Avatar } from 'antd';

const CertificateTable = (props: any) => {
  const { tableData } = props;

  const navigate = useNavigate();

  const columns = [
    {
      title: 'No.',
      dataIndex: 'no',
      render: (no: string | number | any) => <span>{no > 9 ? no : `0${no}`}</span>
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Department',
      dataIndex: 'department',
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Contract Date',
      dataIndex: 'contractDate',
    },
    {
      title: 'Completion Date',
      dataIndex: 'completionDate',
    },
    {
      title: 'Manager',
      dataIndex: 'manager',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ]

  const internCandidates = tableData?.map((item: any, index: any) => {
    return (
      {
        key: index,
        no: index + 1,
        avatar: <Avatar></Avatar>,
        name: `${item?.userDetail.firstName} ${item?.userDetail.lastName}`,
        department: item?.internship?.department?.name,
        title: item?.internship?.title,
        contractDate: item?.joiningDate,
        completionDate: item?.internshipEndDate,
        manager: item?.manager?.title,
        action: <DropDownNew placement={'bottomRight'}
          items={[
            {
              label: <span onClick={() => navigate(`/${ROUTES_CONSTANTS.CERTIFICATESDETAIL}/${item.id}`)}>
                View Details</span>,
              key: 'detail'
            }
          ]}>
          <ThreeDots className='cursor-pointer' />
        </DropDownNew>
      }
    )
  })

  return (
    <BoxWrapper boxShadow='0px 0px 8px 1px rgba(9, 161, 218, 0.1)' className='mt-[30px]'>
      <GlobalTable columns={columns} tableData={internCandidates} />
    </BoxWrapper>
  )
}

export default CertificateTable