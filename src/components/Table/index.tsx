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
}

export const GlobalTable = (props: TableProps) => {
  let { columns, tableData, pagination = true, hideTotal = false, bgWhiteTable, height, id, className, loading = false, pagesObj, ...rest } = props;

  return (
    <div className={`${bgWhiteTable ? "whiteHeadTable" : "primary_table_wrapper"}`}>
      <Table
        className={className ?? ""}
        columns={columns}
        dataSource={tableData}
        pagination={pagination}
        scroll={{ x: "max-content", y: height }}
        id={id}
        loading={{ spinning: loading, indicator: <Loader /> }}
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
