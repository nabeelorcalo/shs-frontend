import { useEffect, useRef, useState } from "react";
import { Alert, GlobalTable } from "../../../components";
import { Avatar } from "antd";
import CustomDropDownCaseStudies from "./customDropDown";
import "./style.scss";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../../store";
import constants from "../../../config/constants";
import actionHandler from "../actionHandler";

const CaseStudiesTable = (props: any) => {
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { role } = useRecoilValue<any>(currentUserState);
  const {
    handleManagerSignature,
    selectedCasStudyData,
    getSelectedCasStudyData,
  } = actionHandler();

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
              data={data.id}
              openWarningModal={openWarningModal}
              handleOpenWarningModal={handleOpenWarningModal}
            />
            {/* {openWarningModal && (
              <Alert
                state={openWarningModal}
                setState={setOpenWarningModal}
                type="warning"
                okBtntxt="Continue"
                cancelBtntxt="Cancel"
                okBtnFunc={() => {
                  rejectHandler(data);
                }}
                children={<p>Are you sure you want to reject this case study?</p>}
              />
            )} */}
          </>
        );
      },
    },
  ];

  return (
    <>
      <GlobalTable
        columns={caseStudyColumnData}
        pagination
        tableData={props.caseStudyTableData}
        loading={props?.loading}
      />
      <Alert
        state={openWarningModal}
        setState={setOpenWarningModal}
        type="warning"
        okBtntxt="Continue"
        cancelBtntxt="Cancel"
        okBtnFunc={rejectHandler}
        children={<p>Are you sure you want to reject this case study?</p>}
      />
    </>
  );
};

export default CaseStudiesTable;
