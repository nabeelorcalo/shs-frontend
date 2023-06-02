import { useState } from "react";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { Emoji1st, Emoji3rd, Emoji4th, ThreeDots } from "../../../assets/images";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import useCustomHook from "../actionHandler";
import ManagerRemarks from "./managerRemarks";

const CustomDropDownCaseStudies = (props: any) => {
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const { selectedCasStudyData, downloadPdfOrCsv } = useCustomHook();
  const tableData =
    selectedCasStudyData?.assessmentForm?.map((obj: any) => ({
      learningCategories: obj?.learningCategorie,
      learningObjectives: obj?.learningObjective,
      evidenceOfProgress: obj?.evidenceOfProgress,
      managerRemarks: (
        <ManagerRemarks
          image={
            obj?.managerRemarks === "Does not meet expectations" ? (
              <Emoji1st />
            ) : obj?.managerRemarks === "Meets expectations" ? (
              <Emoji3rd />
            ) : (
              <Emoji4th />
            )
          }
          managerRemarks={obj?.managerRemarks}
        />
      ),
      id: obj?.id,
    })) ?? [];
  const TableColumn = ["Learning Categories", " Learning Objectives", "Evidence of Progress", "Manager's Remarks"];
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <span onClick={() => navigate(`/${ROUTES_CONSTANTS.CASE_STUDIES_ASSESSMENT_FORM}/${props.data}`)}>
          {props.status === "Approved" ? " View Details" : "Give Feedback"}
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <>
          {props.status === "Pending" ? (
            <span
              onClick={() => {
                props.setOpenWarningModal(true), setVisible(false);
              }}
            >
              Reject
            </span>
          ) : props.status === "Approved" ? (
            <span
              onClick={() => {
                props.dewnload,
                  setVisible(false),
                  downloadPdfOrCsv(event, TableColumn, tableData, "Mino Marina - September 2022 ");
              }}
            >
              Download
            </span>
          ) : props.status === "Rejected" ? (
            <span className="hidden"></span>
          ) : (
            ""
          )}
        </>
      ),
    },
  ];

  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };

  return (
    <Dropdown className="" menu={{ items }} open={visible} onOpenChange={handleVisibleChange} trigger={["click"]}>
      <div style={{ cursor: "pointer" }}>
        <ThreeDots width="24px" />
      </div>
    </Dropdown>
  );
};

export default CustomDropDownCaseStudies;
