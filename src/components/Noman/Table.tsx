import { Space } from 'antd';
import {BoxWrapper} from '../../components';
import GlobalTable from '../../components';
interface DataType {
    key: string,
    dateApplied: string,
    company: string,
    typeOfWork: string,
    internshipType: string,
    natureOfWork: string,
    Position: string,
    Status: string,
    Actions: string,
    anyArray?: any,
}
const columns = [
    {
        title: 'No',
        dataIndex: 'key',
        key: 'key',
        minWidth: 300
    },
    {
        title: 'Date Applied',
        dataIndex: 'dateApplied',
        key: 'dateApplied',
    },
    {
        title: 'Company',
        dataIndex: 'company',
        key: 'company',

    },
    {
        title: 'Type of work',
        dataIndex: 'typeOfWork',
        key: 'typeOfWork',
        width: 200,

    },
    {
        title: 'Internship Type',
        dataIndex: 'internshipType',
        key: 'internshipType',
    },
    {
        title: 'Nature of work',
        dataIndex: 'natureOfWork',
        key: 'natureOfWork',
    },
    {
        title: 'position',
        dataIndex: 'Position',
        key: 'Position',
    },
    {
        title: 'Status',
        dataIndex: 'Status',
        key: 'Status',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_: any, data: any) => (
            <Space size="middle">
                <a onClick={()=>alert(`Id For The Editabel record is  ${data.key} `)}>Edit</a>
                <a onClick={()=>alert(`deleted record id  ${data.key} `)}>Delete</a>
            </Space>
        ),
    },
];
const data: DataType[] = [
    {
        key: '01',
        dateApplied: '01/07 /2022',
        company: 'kljdasfhuasd',
        typeOfWork: 'New York No. 1 Lake Park',
        internshipType: 'nice',
        natureOfWork: "asduhfuiyasdg",
        Position: "gjdifsdu",
        Status: "fjgvifd",
        Actions: "fduhguisd",
        anyArray: [1, 2, 3, 4, 5, 6],
    },
    {
        key: '02',
        dateApplied: '01/07 /2022',
        company: 'kljdasfhuasd',
        typeOfWork: 'New York No. 1 Lake Park',
        internshipType: 'nice',
        natureOfWork: "asduhfuiyasdg",
        Position: "gjdifsdu",
        Status: "fjgvifd",
        Actions: "fduhguisd",
    },
    {
        key: '03',
        dateApplied: '01/07 /2023',
        company: 'kljdasfhuasd',
        typeOfWork: 'New York No. 1 Lake Park',
        internshipType: 'nice',
        natureOfWork: "asduhfuiyasdg",
        Position: "gjdifsdu",
        Status: "fjgvifd",
        Actions: "fduhguisd",
    },
    {
        key: '04',
        dateApplied: '01/07 /2022',
        company: 'kljdasfhuasd',
        typeOfWork: 'New York No. 1 Lake Park',
        internshipType: 'nice',
        natureOfWork: "asduhfuiyasdg",
        Position: "gjdifsdu",
        Status: "fjgvifd",
        Actions: "fduhguisd",
    },
    {
        key: '05',
        dateApplied: '01/07 /2022',
        company: 'kljdasfhuasd',
        typeOfWork: 'New York No. 1 Lake Park',
        internshipType: 'nice',
        natureOfWork: "asduhfuiyasdg",
        Position: "gjdifsdu",
        Status: "fjgvifd",
        Actions: "fduhguisd",
    },
];

const expandedRowRender = (data: any) => {
    return (
        <div>{data.dateApplied}</div>
    )
}
const Table = () => {
    return (
        <div className='main_table'>
            <BoxWrapper>
                <GlobalTable columns={columns} tableData={data} pagination={true}
                    expandable={{
                        expandedRowRender: expandedRowRender,
                        // rowExpandable: (data: any) => data?.anyArray?.length > 0,
                        // expandIcon: expandIcon
                    }}
                />
            </BoxWrapper>
        </div>
    )
}

export default Table