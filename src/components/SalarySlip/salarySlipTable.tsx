import React from "react";
import { GlobalTable } from "../../components";

const SalarySlipTable = (props: any) => {
  const { tableData } = props;

  const newTableData = tableData
  const columns = [
    {
      dataIndex: "month",
      key: "month",
      title: "Month",
    },
    {
      dataIndex: "payrollCycle",
      key: "payrollCycle",
      title: "Payroll Cycle",
    },
    {
      dataIndex: "hoursWorked",
      key: "hoursWorked",
      title: "Hours Worked",
    },
    {
      dataIndex: "basePay",
      key: "basePay",
      title: "Base Pay",
    },
    {
      dataIndex: "totalPayment",
      key: "totalPayment",
      title: "Total Payment",
      align: 'center'
    },
  ]

  const newstate = [{
    month: newTableData?.month,
    payrollCycle: newTableData?.payrollCycle,
    hoursWorked: `${newTableData?.totalHours}.00`,
    basePay: newTableData?.baseSalary ? `£${newTableData?.baseSalary}` : 'N/A',
    totalPayment: newTableData.totalPayments ?? 'N/A',
  }]

  return (
    <GlobalTable
      pagination={false}
      columns={columns}
      tableData={newstate}
    />
  );
};

export default SalarySlipTable;
