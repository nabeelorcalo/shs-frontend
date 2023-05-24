import { useState } from "react";
import { Alert, GlobalTable } from "../../../components";
import { Avatar } from "antd";
import CustomDropDownCaseStudies from "./customDropDown";
import "./style.scss";

const CaseStudiesTable = (props: any) => {
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  
  const caseStudyColumnData = [
    {
      dataIndex: "no",
      key: "no",
      title: "No",
    },
    {
      dataIndex: "avater",
      key: "avater",
      title: "Avatar",
      render: (_: any, data: any) => (
        <Avatar
          className="h-[32px] w-[32px] rounded-full object-cover relative"
          src={data?.avatar}
          alt={data?.name}
          icon={
            <span className="uppercase text-sm leading-[16px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
              {data?.name[0]}
              {data?.name?.split("  ")[1][0]}
            </span>
          }
        />
      ),
    },
    {
      dataIndex: "name",
      key: "name",
      title: "Name",
    },
    {
      dataIndex: "ReportName",
      key: "ReportName",
      title: "Report Name",
    },
    {
      dataIndex: "department",
      key: "department",
      title: "Department",
    },
    {
      dataIndex: "assessmentDate",
      key: "assessmentDate",
      title: "Assessment Date",
    },
    // {
    //   dataIndex: "reportingManager",
    //   key: "reportingManager",
    //   title: "Reporting Manager",
    // },
    {
      dataIndex: "status",
      key: "status",
      title: "Status",
      render: (text: string) => {
        return {
          children: (
            <div className="case-studies-table">
              <span
                className={`rounded-md px-2 py-1 text-white text-sm font-normal font-[outfit] ${
                  text === "Pending"
                    ? "pending"
                    : text === "Approved"
                    ? "approved"
                    : text === "Rejected"
                    ? "rejected"
                    : ""
                } `}
              >
                {text}
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: "Actions",
      dataIndex: "",
      render: (_: any, data: any) => {
        return (
        <CustomDropDownCaseStudies
          setState={setOpenDropdown}
          state={openDropdown}
          status={data.status}
          data={data.id}
          openWarningModal={openWarningModal}
          setOpenWarningModal={setOpenWarningModal}
        />
      )},
    },
  ];

  return (
    <>
      <GlobalTable columns={caseStudyColumnData} pagination tableData={props.caseStudyTableData} />
      <Alert
        state={openWarningModal}
        setState={setOpenWarningModal}
        type="warning"
        okBtntxt="Continue"
        cancelBtntxt="Cancel"
        children={<p>Are you sure you want to reject this case study?</p>}
      />
    </>
  );
};

export default CaseStudiesTable;
