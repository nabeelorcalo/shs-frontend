import { useState } from "react";
import { Alert, GlobalTable } from "../../../components";
import { Avatar } from "antd";
import CustomDropDownCaseStudies from "./customDropDown";
import "./style.scss";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../../store";
import constants, { STATUS_CONSTANTS } from "../../../config/constants";
import actionHandler from "../actionHandler";
import { handleIndexCount } from "../../../helpers/tableIIndexing";

const CaseStudiesTable = (props: any) => {
  const {
    caseStudyTableData: { data: caseStudyTableData, pagination },
  } = props;

  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { role } = useRecoilValue<any>(currentUserState);
  const { handleManagerSignature, selectedCasStudyData, getSelectedCasStudyData, handleTableChange } = actionHandler();

  const handleOpenWarningModal = (id: string) => {
    getSelectedCasStudyData(id);
    setOpenWarningModal(true);
  };
  const rejectHandler = () => {
    selectedCasStudyData?.id && handleManagerSignature(selectedCasStudyData?.id, "Rejected");
  };
  const caseStudyColumnData = [
    {
      dataIndex: "no",
      key: "no",
      title: "No.",
      render: (_: any, data: any) => <span>{handleIndexCount(data?.no, pagination?.current)} </span>,
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
              {data?.name && data?.name?.split(" ")[1][0]}
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
    role === constants?.COMPANY_ADMIN
      ? {
          dataIndex: "reportingManager",
          key: "reportingManager",
          title: "Reporting Manager",
        }
      : {},
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
          <>
            <CustomDropDownCaseStudies
              setState={setOpenDropdown}
              state={openDropdown}
              status={data.status}
              data={data}
              openWarningModal={openWarningModal}
              handleOpenWarningModal={handleOpenWarningModal}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <GlobalTable
        columns={caseStudyColumnData}
        tableData={caseStudyTableData}
        loading={props?.loading}
        pagination={pagination}
        pagesObj={pagination}
        handleTableChange={handleTableChange}
      />
      <Alert
        state={openWarningModal}
        setState={setOpenWarningModal}
        type={STATUS_CONSTANTS?.WARNING}
        okBtntxt="Continue"
        cancelBtntxt="Cancel"
        okBtnFunc={rejectHandler}
        children={<p>Are you sure you want to reject this case study?</p>}
      />
    </>
  );
};

export default CaseStudiesTable;
