import { useEffect, useState } from "react";
import {
  DropDown,
  SearchBar,
  GlobalTable,
  PageHeader,
  BoxWrapper,
  Notifications,
  Breadcrumb
} from "../../components";
import "../../scss/global-color/Global-colors.scss"
import { DatePicker, Dropdown } from "antd";
import { ArrowDownDark, More } from "../../assets/images";
import type { MenuProps } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";
import useCustomHook from "./viewPayrollActionHandler";
import useSimpleCustomHook from './actionHandler';
import { ROUTES_CONSTANTS } from "../../config/constants";
import "./style.scss";

const ViewPayrollDetails = () => {
  // const [showDatePicker, setShowDatePicker] = useState(false)
  const [month, setMonth] = useState(null)
  const [search, setSearch] = useState(null)
  const { getPayrollDetails, payrollDetails,downloadPdfOrCsv } = useSimpleCustomHook();
  const { state }: any = useLocation()
  const { payrollId, internData } = state;

  useEffect(() => {
    getPayrollDetails(payrollId, internData?.userId, month, search)
  }, [month, search])

  const ViewPerformanceBreadCrumb = [
    { name: internData?.internName},
    { name: "Payroll", onClickNavigateTo: `/${ROUTES_CONSTANTS.PAYROLL}` },
  ];

  const csvAllColum = ["No", "Month", "Payroll Cycle", "Hours Worked", "Base Pay", "Total Payment"]
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
      title: 'Actions',
      align: 'center'
    }
  ]
  const ActionPopOver = (props: any) => {
    const navigate = useNavigate()
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <a rel="noopener noreferrer"
            onClick={() => {
              navigate(`${ROUTES_CONSTANTS.VIEW_PAYMENT_SALARY_SLIP}`,
                {
                  state: {
                    slipData: props.data,
                    internData: internData,
                    payrollId: payrollId
                  }
                })
            }}>
            Salary Slip
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => {
              downloadPdfOrCsv(null, csvAllColum, newTableData, "Company Admin Payroll");
              Notifications({
                title: "Success",
                description: "File downloaded",
                type: 'success'
              })
            }}>
            Download
          </a>
        ),
      },
    ];
    return (
      <Dropdown
        menu={{ items }}
        placement="bottomRight"
        trigger={['click']}
        className="cursor-pointer"
      >
        <More />
      </Dropdown>
    )
  }

  const newTableData = payrollDetails?.map((item: any, index: any) => {
    return (
      {
        key: index,
        no: `${payrollDetails?.length < 10 ? `0${index + 1}` : index + 1}`,
        month: item.month,
        payroll_cycle: item.payrollCycle,
        hours_worked: `${item.totalHours}.00`,
        base_pay: item.baseSalary ?? 'N/A',
        total_payment: item.totalPayments ?? 'N/A',
        actions: <ActionPopOver data={item} />
      }
    )
  })

  return (
    <>
      <PageHeader
        bordered
        title={<Breadcrumb breadCrumbData={ViewPerformanceBreadCrumb} />}
      />
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between gap-3 max-sm:flex-col md:flex-row">
          <div className="max-sm:w-full md:w-[25%]">
            <SearchBar
              handleChange={(val: any) => setSearch(val)}
              name="search bar"
              placeholder="Search"
              size="middle"
            />
          </div>
          <div className="flex flex-row gap-4 input-wrapper">
            <DatePicker
              className="search-bar"
              suffixIcon={<ArrowDownDark />}
              placeholder="Month"
              onChange={(date: any) => { setMonth(date) }}
              value={month}
              picker="month"
              format={'MMMM,YYYY'}
            />
            <DropDown
              options={[
                'PDF',
                'Excel'
              ]}
              requiredDownloadIcon
              setValue={() => {
                downloadPdfOrCsv(event, csvAllColum, newTableData, "Company Admin Payroll")
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
