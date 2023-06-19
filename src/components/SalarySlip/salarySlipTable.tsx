import React from "react";
import { GlobalTable } from "../../components";

const SalarySlipTable = (props: any) => {
  const { tableData } = props

  const newTableData = {
    // no: tableData.length < 10 ? `0${idx + 1}` : idx + 1,
    month: tableData?.month,
    payroll_cycle: tableData?.payrollCycle,
    hours_worked: `${tableData?.totalHours}.00`,
    base_pay: tableData?.baseSalary ? `£${tableData?.baseSalary}` : 'N/A',
    total_payment: tableData?.totalPayment ? `£${tableData?.totalPayment}` : 'N/A',
  }

  return (
    <GlobalTable
      pagination={false}
      columns={[
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
      ]}
      tableData={newTableData}
    />
  );
};

export default SalarySlipTable;
