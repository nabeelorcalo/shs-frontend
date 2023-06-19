import React from "react";
import { GlobalTable } from "../../components";

const SalarySlipTable = (props: any) => {
  const { state } = props

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

  const newstate = {
    month: state?.month,
    payrollCycle: state?.payrollCycle,
    hoursWorked: `${state?.totalHours}.00`,
    basePay: state?.baseSalary ? `£${state?.baseSalary}` : 'N/A',
    totalPayment: state?.totalPayment ? `£${state?.totalPayment}` : 'N/A',
  }

  return (
    <GlobalTable
      pagination={false}
      columns={columns}
      tableData={newstate}
    />
  );
};

export default SalarySlipTable;
