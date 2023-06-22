import { useEffect, useState } from "react";
import {
  DropDown,
  SearchBar,
  GlobalTable,
  PageHeader,
  BoxWrapper,
  CommonDatePicker,
  Notifications,
  Breadcrumb
} from "../../components";
import "./style.scss";
import "../../scss/global-color/Global-colors.scss"
import { Dropdown } from "antd";
import { More } from "../../assets/images";
import type { MenuProps } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";
import useCustomHook from "./viewPayrollActionHandler";
import useSimpleCustomHook from './actionHandler';
import { ROUTES_CONSTANTS } from "../../config/constants";

const ViewPayrollDetails = () => {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const { getPayrollDetails, payrollDetails } = useSimpleCustomHook();
  const { state }: any = useLocation()
  const { payrollId, internData } = state;
  const action = useCustomHook()

  useEffect(() => {
    getPayrollDetails(payrollId, internData?.userId)
  }, [])

  const ViewPerformanceBreadCrumb = [
    { name: `${internData?.userDetail?.firstName} ${internData?.userDetail?.lastName}` },
    { name: "Payroll", onClickNavigateTo: `/${ROUTES_CONSTANTS.PAYROLL}` },
  ];

  const csvAllColum = ["No", "Month", "Payroll Cycle", "Hours Worked", "Base Pay", "Total Payment"]

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
      >
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

  const newTableData = payrollDetails?.map((item: any, index: any) => {
    return (
      {
        key: index,
        no: `${payrollDetails?.length < 10 ? `0${index + 1}` : index + 1}`,
        month: item.month,
        payroll_cycle: item.payrollCycle,
        hours_worked: `${item.totalHours}.00`,
        base_pay: item.baseSalary ?? 'N/A',
        total_payment: item.totalPayment ?? 'N/A',
        actions: <ActionPopOver data={item} />
      }
    )
  })
  return (
    <>
      <PageHeader
        bordered
        title={
          <Breadcrumb breadCrumbData={ViewPerformanceBreadCrumb} />
        }
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
              onBtnClick={() => { setShowDatePicker(!showDatePicker) }}
              picker="month"
              setOpen={function noRefCheck() { }}
              setValue={function noRefCheck() { }}
            />
            <DropDown
              options={[
                'pdf',
                'excel'
              ]}
              requiredDownloadIcon
              setValue={() => {
                action.downloadPdfOrCsv(event, csvAllColum, newTableData, "Company Admin Payroll")
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
