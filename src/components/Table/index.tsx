import { Table } from "antd";
import { Loader } from "../../components";
import "./style.scss";
interface TableProps {
  columns?: any[];
  tableData?: any;
  pagination?: boolean | any;
  bgWhiteTable?: boolean;
  expandable?: any;
  rowExpandable?: any;
  expandedRowRender?: any;
  expandIcon?: any;
  height?: number;
  id?: any;
  hideTotal?: any;
  className?: any;
  loading?: any;
  pagesObj?: any;
  onRow?: any;
  handleTableChange?: any;
}

export const GlobalTable = (props: TableProps) => {
  let { 
    columns, tableData, pagination = true, hideTotal = false, bgWhiteTable, 
    height, id, className, loading = false, pagesObj, handleTableChange,
    ...rest 
  } = props;


  return (
    <div className={`shs-table ${bgWhiteTable ? "whiteHeadTable" : "primary_table_wrapper"}`}>
      <Table
        id={id}
        columns={columns}
        dataSource={tableData}
        pagination={pagination}
        className={className ?? ""}
        rowKey={(record) => record.id}
        scroll={{ x: "max-content", y: height }}
        loading={{ spinning: loading, indicator: <Loader /> }}
        onChange={handleTableChange}
        {...rest}
      />
      {
        pagination && !hideTotal ?
          <span className="Counter">
            Total: {pagesObj?.totalResult < 10 ? `0${pagesObj?.totalResult}` : pagesObj?.totalResult }
          </span>
          :
          <></>
      }
    </div>
  );
};
