import { GlobalTable } from '../../../components';
import { BoxWrapper } from '../../../components/BoxWrapper/BoxWrapper';
import { ThreeDots } from '../../../assets/images';
import { tableMockData } from './tableMock';
import { useNavigate } from 'react-router-dom';
import DropDownNew from '../../../components/Dropdown/DropDownNew';
import {ROUTES_CONSTANTS} from '../../../config/constants';

const CertificateTable = () => {
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
      render: (avatar: string) => <img src={avatar} className='rounded-full w-[32px] h-[32px] object-cover ' alt='avatar' />
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
      dataIndex: '',
      render: (_: any, data: any) => <DropDownNew placement={'bottomRight'}
        items={[
          {
            label: <span onClick={() => navigate(`/${ROUTES_CONSTANTS.CERTIFICATESDETAIL}/${data.no}`)}>
              View Details</span>,
            key: 'detail'
          }
        ]}>
        <ThreeDots className='cursor-pointer' />
      </DropDownNew>
    },
  ]

  return (
    <BoxWrapper boxShadow='0px 0px 8px 1px rgba(9, 161, 218, 0.1)' className='mt-[30px]'>
      <GlobalTable columns={columns} tableData={tableMockData} />
    </BoxWrapper>
  )
}

export default CertificateTable