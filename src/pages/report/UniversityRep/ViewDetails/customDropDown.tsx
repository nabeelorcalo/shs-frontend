import { useState } from "react";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { LocationMore } from "../../../../assets/images";
import useCustomHookforAssment from "../../actionHandler";
import { ROUTES_CONSTANTS } from "../../../../config/constants";

const { REPORT_VIEW_DETAILS, REPORT_ASSESSMENT_FORM } = ROUTES_CONSTANTS;
const CustomDropDownReport = (props: any) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { getSelectedAsseessmentReport } = useCustomHookforAssment();

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
            setVisible(false)
            getSelectedAsseessmentReport(props?.assessmentFormID, true)
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
