import { Badge, Dropdown, Pagination, Space, Table } from 'antd';
import "./TablStyle.scss"

// const items = [
//     { key: '1', label: 'Action 1' },
//     { key: '2', label: 'Action 2' },
// ];
// const expandedRowRender = () => {
//     const columns: any = [
//         { title: '', dataIndex: 'date', key: 'date' },
//         { title: '', dataIndex: 'name', key: 'name' },
//         { title: '', key: 'state', render: () => <Badge status="success" text="Finished" />, },
//         { title: '', dataIndex: 'upgradeNum', key: 'upgradeNum' },
//         {
//             title: '', dataIndex: 'operation', key: 'operation',
//             render: () => (
//                 <Space size="middle">
//                     <a>Pause</a>
//                     <a>Stop</a>
//                     <Dropdown menu={{ items }}>
//                         <a>
//                             More
//                         </a>
//                     </Dropdown>
//                 </Space>
//             ),
//         },
//     ];
//     const data = [];
//     for (let i = 0; i < 3; ++i) {
//         data.push({
//             key: i.toString(),
//             date: '2014-12-24 23:12:00',
//             name: 'This is production name',
//             upgradeNum: 'Upgraded: 56',
//         });
//     }
//     return <Table columns={columns} dataSource={data} pagination={false} />;
// };


interface TableProps {
    columns: any[]
    tableData: any[],
    pagination?: boolean | any,
    expandable?: any;
    rowExpandable?: any;
    expandedRowRender?: any;
    expandIcon?: any;
}
const GlobalTable = (props: TableProps) => {
    let { columns, tableData, pagination = true, ...rest } = props
    return (
        <div className='table_main_wrapper'>
            <Table columns={columns} dataSource={tableData} pagination={pagination} scroll={{ x: 'scroll' }}
                {...rest}
            />
            {pagination &&
                <span className='Counter'> Total:{tableData.length}</span>

            }
        </div>

    )
}

export default GlobalTable