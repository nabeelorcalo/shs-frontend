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
import type { MenuProps, TablePaginationConfig } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";
import useCustomHook from "./viewPayrollActionHandler";
import useSimpleCustomHook from './actionHandler';
import { ROUTES_CONSTANTS } from "../../config/constants";
import "./style.scss";
import { payrollDetailFilterState, payrollDetailPaginationState } from "../../store";
import { useRecoilState, useResetRecoilState } from "recoil";

const ViewPayrollDetails = () => {
  // const [showDatePicker, setShowDatePicker] = useState(false)
  const [month, setMonth] = useState(null)
  const [search, setSearch] = useState(null)
  const [tableDetailParams, setTableDetailParams]: any = useRecoilState(payrollDetailPaginationState);
  const [filter, setFilter] = useRecoilState(payrollDetailFilterState);
  const resetList = useResetRecoilState(payrollDetailFilterState);
  const resetTableParams = useResetRecoilState(payrollDetailPaginationState);
  const [loading, setLoading] = useState(true);
  const { getPayrollDetails, allPayrollDetails, downloadPdfOrCsv }: any = useSimpleCustomHook();
  const { state }: any = useLocation()
  const { payrollId, internData } = state;
  const payrollDetails = allPayrollDetails?.data;
  const params: any = {
    page: tableDetailParams?.pagination?.current,
    limit: tableDetailParams?.pagination?.pageSize,
  };

  const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value !== ""));
  };

  useEffect(() => {
    let args = removeEmptyValues(filter)
    args.payrollId = payrollId;
    args.userId = internData.userId
    getPayrollDetails(args, setLoading)
  }, [filter.page, filter.month, filter.search])

  const ViewPerformanceBreadCrumb = [
    { name: internData?.internName },
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

  const formatRowNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
  };

  const newTableData = payrollDetails?.map((item: any, index: any) => {
    return (
      {
        key: item.id,
        no: <div>{formatRowNumber((params?.page - 1) * params?.limit + index + 1)}</div>,
        month: item.month,
        payroll_cycle: item.payrollCycle,
        hours_worked: `${item.totalHours}.00`,
        base_pay: item.baseSalary ?? 'N/A',
        total_payment: item.totalPayments ?? 'N/A',
        actions: <ActionPopOver data={item} />
      }
    )
  })

  //pagination function
  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current }: any = pagination;
    setTableDetailParams({ pagination });
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: current,
    }));
  };
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
              handleChange={(val: any) => setFilter({ ...filter, search: val })}
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
              onChange={(date: any) => { setFilter({ ...filter, month: date }) }}
              value={filter.month}
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
              loading={loading}
              pagination={tableDetailParams?.pagination}
              pagesObj={allPayrollDetails?.pagination}
              handleTableChange={handleTableChange}
            />
          </div>
        </BoxWrapper>
      </div>
    </>
  );
};

export default ViewPayrollDetails;
