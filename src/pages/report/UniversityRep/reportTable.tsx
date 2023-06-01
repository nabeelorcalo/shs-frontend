import { useState } from "react";
import { Alert, GlobalTable } from "../../../components";
import DropDownNew from "../../../components/Dropdown/DropDownNew";
import { ThreeDots } from "../../../assets/images";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import { Avatar } from "antd";

const UniversityRepReportTable = (props: any) => {
  const navigate = useNavigate();
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const reportColumnData = [
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
      dataIndex: "department",
      key: "department",
      title: "Department",
    },
    {
      dataIndex: "company",
      key: "company",
      title: "Comapny",
    },
    {
      dataIndex: "reviewer",
      key: "reviewer",
      title: "Reviewer",
    },

    {
      title: "Action",
      dataIndex: "",
      render: (_: any, data: any) => (
        <DropDownNew
          placement={"bottomRight"}
          items={[
            {
              label: (
                <span onClick={() => navigate(`/${ROUTES_CONSTANTS.REPORT_VIEW_DETAILS}/${data?.id}`)}>View Details</span>
              ),

              key: "feedback",
            },
          ]}
        >
          <ThreeDots className="cursor-pointer" />
        </DropDownNew>
      ),
    },
  ];

  return (
    <>
      <GlobalTable columns={reportColumnData} pagination tableData={props.reportTableData} />
      <Alert
        state={openWarningModal}
        setState={setOpenWarningModal}
        type="warning"
        okBtntxt="Delete"
        cancelBtntxt="Cancel"
        children={<p>Are you sure you want to reject this case study?</p>}
      />
    </>
  );
};

export default UniversityRepReportTable;
