import { Space, Table, Tag } from 'antd';
import "./TablStyle.scss"
interface DataType {
    no: string,
    dateApplied: string,
    company: string,
    typeOfWork: string,
    internshipType: string,
    natureOfWork: string,
    Position: string,
    Status: string,
    Actions: string,
}
const columns = [
    {
        title: 'No',
        dataIndex: 'no',
        key: 'no',
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
        render: () => (
            <Space size="middle">
                <a>Invite</a>
                <a>Delete</a>
            </Space>
        ),
    },
];
const data: DataType[] = [
    {
        no: '01',
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
        no: '01',
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
        no: '01',
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
        no: '01',
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
        no: '01',
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
        no: '01',
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
        no: '01',
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
        no: '01',
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
        no: '01',
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
        no: '01',
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
        no: '01',
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
        no: '01',
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


const GlobalTable = () => {
    return (
        <div className='table_main_wrapper'>
            <Table columns={columns} dataSource={data} />
        </div>

    )
}

export default GlobalTable