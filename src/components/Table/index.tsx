import { Table } from "antd";
import { Loader, NoDataFound } from "../../components";
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
  const tableLocale = {
    emptyText: loading && tableData?.length === undefined ? <Loader /> : <NoDataFound isNoBorder />,
  };

  return (
    <div className={`shs-table ${bgWhiteTable ? "whiteHeadTable" : "primary_table_wrapper"}`}>
      <Table
        id={id}
        columns={columns}
        locale={tableLocale}
        dataSource={tableData}
        pagination={pagination}
        className={className ?? ""}
        rowKey={(record) => record.id}
        scroll={{ x: "max-content", y: height }}
        onChange={handleTableChange}
        {...rest}
      />
      {
        pagination && !hideTotal && pagesObj?.totalResult > 0 ?
          <span className="Counter">
            Total: {pagesObj?.totalResult < 10 ? `0${pagesObj?.totalResult}` : pagesObj?.totalResult}
          </span>
          :
          <></>
      }
    </div>
  );
};
