import { useState } from "react";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { LocationMore } from "../../../../assets/images";
import { Emoji1st, Emoji3rd, Emoji4th } from "../../../../assets/images";
import ManagerRemarks from "../assessmentForm/manageRemarksforUni";
import useCustomHookforAssment from "../../actionHandler";
import { ROUTES_CONSTANTS } from "../../../../config/constants";

const { REPORT_VIEW_DETAILS, REPORT_ASSESSMENT_FORM } = ROUTES_CONSTANTS;
const TableColumn = ["Learning Categories", " Learning Objectives", "Evidence of Progress", "Manager's Remarks"];
const CustomDropDownReport = (props: any) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { downloadPdfOrCsv, selectedAsseessmentReport } = useCustomHookforAssment();

  const tableData =
    selectedAsseessmentReport?.assessmentForm?.map((obj: any) => ({
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
      content: obj?.supervisorRemarks,
    })) ?? [];

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <span
          onClick={() =>
            navigate(
              `/${REPORT_VIEW_DETAILS}/${props?.viewDetailsId}/${REPORT_ASSESSMENT_FORM}/${props.assessmentFormID}`
            )
          }
        >
          View
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <span
          onClick={() => {
            props.dewnload,
              setVisible(false),
              downloadPdfOrCsv(event, TableColumn, tableData, "Mino Marina - September 2022 ");
          }}
        >
          Download
        </span>
      ),
    },
  ];

  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };
  return (
    <Dropdown className="" menu={{ items }} open={visible} onOpenChange={handleVisibleChange} trigger={["click"]}>
      <div style={{ cursor: "pointer" }}>
        <LocationMore width="24px" />
      </div>
    </Dropdown>
  );
};

export default CustomDropDownReport;
