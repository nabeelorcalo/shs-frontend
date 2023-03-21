import { Badge, Dropdown, Pagination, Space, Table } from 'antd';
import "./style.scss"
interface TableProps {
  columns?: any[]
  tableData?: any[],
  pagination?: boolean | any,
  bgWhiteTable?: boolean,
  expandable?: any;
  rowExpandable?: any;
  expandedRowRender?: any;
  expandIcon?: any;
}
export const GlobalTable = (props: TableProps) => {
  let { columns, tableData, pagination = true, bgWhiteTable, ...rest } = props
  return (
    <div className={`${bgWhiteTable ? "whiteHeadTable" : "primary_table_wrapper"}`}>
      <Table columns={columns} dataSource={tableData} pagination={pagination} scroll={{ x: 'max-content' }} {...rest} />
      {pagination && <span className='Counter'> Total:{tableData?.length}</span>}
    </div>
  )
}

