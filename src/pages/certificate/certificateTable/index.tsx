import { useState } from 'react';
import GlobalTable from '../../../components/Table/Table';
import { BoxWrapper } from '../../../components/BoxWrapper/boxWrapper';
import { ThreeDots } from '../../../assets/images';
import { tableMockData } from './tableMock';
import { Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';

const CertificateTable = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState('');
    const items = [
        {
            label: <p onClick={() => navigate(`/certificates/detail/${selected}`)}>View Details</p>,
            key: ''
        }
    ]
    const columns = [
        {
            title: 'No.',
            dataIndex: 'no',
            render: (no: string | number) => <span>{no > 9 ? no : `0${no}`}</span>
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
            render: (_: any, data: any) => <Dropdown placement='bottomRight' menu={{ items }} trigger={['click']} overlayClassName='certicate-action'>
                <ThreeDots className='cursor-pointer' onClick={() => setSelected(data.no)} />
            </Dropdown>
        },
    ]

    return (
        <BoxWrapper boxShadow='0px 0px 8px 1px rgba(9, 161, 218, 0.1)' className='mt-[30px]'>
            <GlobalTable columns={columns} tableData={tableMockData} />
        </BoxWrapper>
    )
}

export default CertificateTable