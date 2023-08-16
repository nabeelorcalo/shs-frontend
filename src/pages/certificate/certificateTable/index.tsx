import { GlobalTable } from '../../../components';
import { BoxWrapper } from '../../../components';
import { ThreeDots } from '../../../assets/images';
import { useNavigate } from 'react-router-dom';
import DropDownNew from '../../../components/Dropdown/DropDownNew';
import constants, { ROUTES_CONSTANTS } from '../../../config/constants';
import { Avatar, TablePaginationConfig } from 'antd';
import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';
import { certificatesPaginationState } from '../../../store';

const CertificateTable = (props?: any) => {
  const { tableData, loading, setFilter } = props;
  const navigate = useNavigate();
  const [tableParams, setTableParams]: any = useRecoilState(certificatesPaginationState);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current }: any = pagination;
    setTableParams({ pagination });
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      page: current,
    }));
  };

  const params: any = {
    page: tableParams?.pagination?.current,
    limit: tableParams?.pagination?.pageSize,
  };

  const formatRowNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
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

  const internCandidates = tableData?.data?.map((item: any, index: any) => {
    const contractDate = dayjs(item?.joiningDate).format('DD/MM/YYYY')
    const endDate = dayjs(item?.internshipEndDate).format('DD/MM/YYYY')
    return (
      {
        key: index,
        no: <div>{formatRowNumber((params?.page - 1) * params?.limit + index + 1)}</div>,
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
      <GlobalTable
        id="certificateData"
        columns={columns}
        tableData={internCandidates}
        loading={loading}
        pagination={tableParams?.pagination}
        pagesObj={tableData?.pagination}
        handleTableChange={handleTableChange}

      />
    </BoxWrapper>
  )
}

export default CertificateTable;