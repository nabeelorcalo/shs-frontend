import { Badge, Dropdown, Pagination, Space, Table } from 'antd';
import "./TablStyle.scss"
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
    let { columns, tableData, pagination = true, } = props
    return (
        <div className='table_main_wrapper'>
            <Table columns={columns} dataSource={tableData} pagination={pagination} scroll={{ x: 'scroll' }}/>
            {pagination && <span className='Counter'> Total:{tableData.length}</span>}
        </div>

    )
}

export default GlobalTable