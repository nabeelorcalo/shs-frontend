import { GlobalTable } from '../../../components';
import { BoxWrapper } from '../../../components';
import { ThreeDots } from '../../../assets/images';
import { useNavigate } from 'react-router-dom';
import DropDownNew from '../../../components/Dropdown/DropDownNew';
import constants, { ROUTES_CONSTANTS } from '../../../config/constants';
import { Avatar } from 'antd';
import dayjs from 'dayjs';

const CertificateTable = (props: any) => {
  const { tableData } = props;

  const navigate = useNavigate();

  const columns = [
    {
      title: 'No',
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
      title: 'Actions',
      dataIndex: 'action',
    },
  ]

  const internCandidates = tableData?.map((item: any, index: any) => {
    const contractDate = dayjs(item?.joiningDate).format('DD/MM/YYYY')
    const endDate = dayjs(item?.internshipEndDate).format('DD/MM/YYYY')
    return (
      {
        key: index,
        no: index + 1,
        avatar: <Avatar size='small' src={`${constants.MEDIA_URL}/${item?.userDetail?.profileImage?.mediaId}.${item?.userDetail?.profileImage?.metaData?.extension}`}>{`${item?.userDetail.firstName?.charAt(0)}${item?.userDetail.lastName?.charAt(0)}`}</Avatar>,
        name: `${item?.userDetail.firstName} ${item?.userDetail.lastName}`,
        department: item?.internship?.department?.name,
        title: item?.internship?.title,
        contractDate: contractDate,
        completionDate: endDate,
        manager: item?.manager?.companyManager?.firstName ? `${item?.manager?.companyManager?.firstName} ${item?.manager?.companyManager?.lastName}` : 'N/A',
        action: <DropDownNew placement={'bottomRight'}
          items={[
            {
              label: <span onClick={() => navigate(`/${ROUTES_CONSTANTS.CERTIFICATESDETAIL}/${item.userId}`, { state: item })}>
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