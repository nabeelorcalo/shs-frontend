import { useState } from "react";
import {
  DropDown,
  SearchBar,
  GlobalTable,
  PageHeader,
  BoxWrapper,
  CommonDatePicker,
  Notifications
} from "../../components";
import "./style.scss";
import "../../scss/global-color/Global-colors.scss"
import {Dropdown} from "antd";
import { More } from "../../assets/images";
import type { MenuProps } from 'antd';
import { useNavigate } from "react-router-dom";
import useCustomHook from "./viewPayrollActionHandler";


const tableData = [
  {
    no: "01",
    month: "June 2022",
    payroll_cycle: "Jan-June",
    hours_worked: "07:00",
    base_pay: "$5100",
    total_payment: "$5100",
  },
  {
    no: "02",
    month: "May 2022",
    payroll_cycle: "Jan-May",
    hours_worked: "08:00",
    base_pay: "$3100",
    total_payment: "$6100",
  },
  {
    no: "03",
    month: "April 2022",
    payroll_cycle: "Jan-April",
    hours_worked: "07:00",
    base_pay: "$8100",
    total_payment: "$1100",
  },
  {
    no: "02",
    month: "May 2022",
    payroll_cycle: "Jan-May",
    hours_worked: "08:00",
    base_pay: "$3100",
    total_payment: "$6100",
  },
  {
    no: "03",
    month: "April 2022",
    payroll_cycle: "Jan-April",
    hours_worked: "07:00",
    base_pay: "$8100",
    total_payment: "$1100",
  },
  {
    no: "02",
    month: "May 2022",
    payroll_cycle: "Jan-May",
    hours_worked: "08:00",
    base_pay: "$3100",
    total_payment: "$6100",
  },
  {
    no: "03",
    month: "April 2022",
    payroll_cycle: "Jan-April",
    hours_worked: "07:00",
    base_pay: "$8100",
    total_payment: "$1100",
  },
]
const ViewPayrollDetails = () => {
  const [showDatePicker, setShowDatePicker] = useState(false)

  const action = useCustomHook()
  const csvAllColum = ["No", "Month", "Payroll Cycle", "Hours Worked", "Base Pay", "Total Payment"]

  const ActionPopOver = () => {
    const navigate = useNavigate()
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <a rel="noopener noreferrer" onClick={() => { navigate("view-payroll-details") }}>
            Salary Slip
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a rel="noopener noreferrer" onClick={() => { Notifications({ title: "Success", description: "File downloaded", type:'success' }) }}>
            Download
          </a>
        ),
      },
    ];
    return (
      <Dropdown menu={{ items }} placement="bottomRight">
        <More />
      </Dropdown>
    )
  }

  const columns = [
    {
      dataIndex: "no",
      key: "no",
      title: "No.",
    },
    {
      dataIndex: "month",
      key: "month",
      title: "Month",
    },
    {
      dataIndex: "payroll_cycle",
      key: "payroll_cycle",
      title: "Payroll Cycle",
    },
    {
      dataIndex: "hours_worked",
      key: "hours_worked",
      title: "Hours Worked",
    },
    {
      dataIndex: "base_pay",
      key: "base_pay",
      title: "Base Pay",
    },
    {
      dataIndex: "total_payment",
      key: "total_payment",
      title: "Total Payment",
    },
    {
      dataIndex: 'actions',
      key: 'actions',
      title: 'Actions'
    }
  ]
  const newTableData = tableData.map((item) => {
    return (
      {
        no: item.no,
        month: item.month,
        payroll_cycle: item.payroll_cycle,
        hours_worked: item.hours_worked,
        base_pay: item.base_pay,
        total_payment: item.total_payment,
        actions: <ActionPopOver />
      }
    )
  })
  return (
    <>
      <PageHeader
        title="Mino Marina Payments"
        bordered
      />
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between gap-3 max-sm:flex-col md:flex-row">
          <div className="max-sm:w-full md:w-[25%]">
          <SearchBar
            handleChange={() => { }}
            name="search bar"
            placeholder="Search"
            size="middle"
          />
          </div>
          <div className="flex flex-row gap-4">
            <CommonDatePicker
               name="name"
               open={false}
               onBtnClick={() => {setShowDatePicker(!showDatePicker)}}
               picker="month"
               setOpen={function noRefCheck() {}}
               setValue={function noRefCheck() {}}
            />
            <DropDown
              options={[
                'pdf',
                'excel'
              ]}
              requiredDownloadIcon
              setValue={() => {
                action.downloadPdfOrCsv(event, csvAllColum, tableData, "Company Admin Payroll")
              }}
              value=""
            />
          </div>
        </div>
        <BoxWrapper>
          <div className="pt-3">
            <GlobalTable
              columns={columns}
              tableData={newTableData}
            />
          </div>
        </BoxWrapper>
      </div>
    </>
  );
};

export default ViewPayrollDetails;
