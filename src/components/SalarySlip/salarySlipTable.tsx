import React from "react";
import { GlobalTable } from "../../components";

const SalarySlipTable = (props: any) => {
  const { tableData } = props
  console.log("table are", tableData);

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
    },
  ]

  const newstate = [{
    month: tableData?.month,
    payrollCycle: tableData?.payrollCycle,
    hoursWorked: `${tableData?.totalHours}.00`,
    basePay: tableData?.baseSalary ? `£${tableData?.baseSalary}` : 'N/A',
    totalPayment: tableData?.totalPayment ? `£${tableData?.totalPayment}` : 'N/A',
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
