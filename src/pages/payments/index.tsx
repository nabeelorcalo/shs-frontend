import { useEffect, useState } from "react";
import {
  DropDown,
  SearchBar,
  GlobalTable,
  PageHeader,
  BoxWrapper,
  Notifications,
} from "../../components";
import "../../scss/global-color/Global-colors.scss"
import { Dropdown, Row, Col, DatePicker } from "antd";
import { ArrowDownDark, More } from "../../assets/images";
import type { MenuProps } from 'antd';
import { useNavigate } from "react-router-dom";
import useCustomHook from "./actionHandler";
import { ROUTES_CONSTANTS } from "../../config/constants";
import "./style.scss";

const Payments = () => {
  const [month, setMonth] = useState(null)
  const { downloadPdfOrCsv, getInternPayments, paymentData } = useCustomHook();

  const csvAllColum = ["No.", "Month", "Payroll Cycle", "Hours Worked", "Base Pay", "Total Payment"]

  useEffect(() => {
    getInternPayments(month)
  }, [month])

  const ActionPopOver = (data: any) => {
    const navigate = useNavigate()
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => { navigate(`${ROUTES_CONSTANTS.VIEW_PAYMENT_SALARY_SLIP}`, { state: data?.data }) }}
          >
            View details
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => {
              downloadPdfOrCsv(event, csvAllColum, newTableData, "Interns Payments");
              Notifications({
                title: "Success",
                description: "File downloaded",
                type: 'success'
              })
            }}
          >
            Download
          </a>
        ),
      },
    ];
    return (
      <Dropdown
        menu={{ items }}
        trigger={['click']}
        placement="bottomRight"
        overlayStyle={{ width: 180 }}
      >
        <More className="cursor-pointer" />
      </Dropdown>
    )
  }

  // const DownloadPopOver = () => {
  //   const navigate = useNavigate()
  //   const items: MenuProps['items'] = [
  //     {
  //       key: '1',
  //       label: (
  //         <a
  //           rel="noopener noreferrer"
  //           onClick={() => { }}
  //         >
  //           PDF
  //         </a>
  //       ),
  //     },
  //     {
  //       key: '2',
  //       label: (
  //         <a
  //           rel="noopener noreferrer"
  //           onClick={() => { }}
  //         >
  //           Excel
  //         </a>
  //       ),
  //     },
  //   ];
  //   return (
  //     <Dropdown
  //       menu={{ items }}
  //       trigger={['click']}
  //       placement="bottomRight"
  //       overlayStyle={{ width: 180 }}
  //     >
  //       <DownloadDocumentIcon />
  //     </Dropdown>
  //   )
  // }

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
  const newTableData = paymentData?.map((item: any, idx) => {
    return (
      {
        key: idx,
        no: paymentData.length < 10 ? `0${idx + 1}` : idx + 1,
        month: item.month,
        payroll_cycle: item.payrollCycle,
        hours_worked: `${item.totalHours}.00`,
        base_pay: item.baseSalary ? `£${item.baseSalary}` : 'N/A',
        total_payment: item.totalPayment ? `£${item.totalPayment}` : 'N/A',
        actions: <ActionPopOver data={item} />
      }
    )
  })

  return (
    <>
      <PageHeader title="Payments" bordered />
      <Row gutter={[20, 30]}>
        <Col xl={6} md={24} sm={24} xs={24}>
          <SearchBar
            handleChange={() => { }}
            name="search bar"
            placeholder="Search"
            size="middle"
          />
        </Col>
        <Col xl={18} md={24} sm={24} xs={24} className="flex max-sm:flex-col justify-end gap-4">
          <div className="input-wrapper">
            <DatePicker
              className="search-bar"
              suffixIcon={<ArrowDownDark />}
              placeholder="Month"
              onChange={(date: any) => { setMonth(date) }}
              value={month}
              format={'MMMM,YYYY'}
              picker="month"
            />
          </div>
          <DropDown
            options={[
              'PDF',
              'Excel'
            ]}
            requiredDownloadIcon
            setValue={() => {
              downloadPdfOrCsv(event, csvAllColum, newTableData, "Interns Payments")
            }}
            value=""
          />
        </Col>
        <Col xs={24}>
          <BoxWrapper>
            <GlobalTable
              columns={columns}
              tableData={newTableData}
            />
          </BoxWrapper>
        </Col>
      </Row>

    </>
  );
};

export default Payments;
