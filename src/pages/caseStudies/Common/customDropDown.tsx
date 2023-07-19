import { useState } from "react";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "../../../assets/images";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import useCustomHook from "../actionHandler";

const CustomDropDownCaseStudies = (props: any) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { downloadPdfOrCsv } = useCustomHook();
  const tableData =
    props?.data?.assessmentForm?.map((obj: any) => ({
      learningCategories: obj?.learningCategorie || "N/A",
      learningObjectives: obj?.learningObjective || "N/A",
      evidenceOfProgress: obj?.evidenceOfProgress || "N/A",
      managerRemarks: obj?.supervisorRemarks || "N/A",
    })) ?? [];

  const TableColumn = ["Learning Categories", " Learning Objectives", "Evidence of Progress", "Manager's Remarks"];
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <span onClick={() => navigate(`/${ROUTES_CONSTANTS.CASE_STUDIES_ASSESSMENT_FORM}/${props?.data?.id}`)}>
          {["approved", "rejected"].includes(props.status.toLowerCase()) ? " View Details" : "Give Feedback"}
        </span>
      ),
    },
    props.status !== "Rejected"
      ? {
          key: "2",
          label: (
            <>
              {props.status === "Pending" ? (
                <span
                  onClick={() => {
                    props?.handleOpenWarningModal(props?.data?.id), setVisible(false);
                  }}
                >
                  Reject
                </span>
              ) : props.status === "Approved" ? (
                <span
                  onClick={async () => {
                    props.dewnload;
                    setVisible(false);
                    downloadPdfOrCsv(
                      "pdf",
                      TableColumn,
                      tableData,
                      `${props?.data?.name} - ${props?.data?.assessmentDate}`
                    );
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
        }
      : null,
  ];

  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };

  return (
    <Dropdown
      className=""
      menu={{ items }}
      open={visible}
      onOpenChange={handleVisibleChange}
      placement={"bottomRight"}
      trigger={["click"]}
    >
      <div style={{ cursor: "pointer" }}>
        <ThreeDots width="24px" />
      </div>
    </Dropdown>
  );
};

export default CustomDropDownCaseStudies;
