import React from "react";
import { GlobalTable } from "../../components";

const SalarySlipTable = () => {
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
      tableData={[
        {
          payrollCycle: "Jan-June",
          hoursWorked: "22",
          basePay: "£1,083",
          month: "June 2022",
          totalPayment: "£5,100",
        },
      ]}
    />
  );
};

export default SalarySlipTable;
