import { Col, Row, Tabs, TabsProps } from "antd";
import {
  TabIcon,
  TabIcon2,
  TabIcon3,
  TabIcon4,
  TabIcon5,
  TabIcon6,
  TabIcon7,
  TabIcon8,
  TabIcon9,
} from "../../../../assets/images";
import SerarchTabs from "../All/All";
import "./Styles.scss";
import useCustomHook from "../../actionHandler";

const SearchJobTabs = (props: any) => {
  const { getSearchJob, serachJobsDepData } = useCustomHook();
  const { handleTabChange } = props;

  const departmentNameEnum = {
    DESIGN_AND_DEVELOPMENT: "Design & Development",
    MARKETING_AND_COMMUNICATION: "Marketing & Communication",
    PROJECT_MANAGEMENT: "Project Management",
    FINANCE_MANAGEMENT: "Finance Management",
    HUMAN_RESOURCE_MANAGEMENT: "Human Resource Management",
    BUSINESS_AND_CONSULTANCY: "Business & Consultancy",
    ADMINISTRATION: "Administration",
    CUSTOMER_SUCCESS_MANAGEMENT: "Customer Success Management",
  };

  const items: TabsProps["items"] = [
    {
      key: "all",
      label: (
        <div className="first-tabs px-6">
          <center className="tab-style ">
            <TabIcon />
            <p className="text-sm font-semibold pt-[10px]">All</p>
          </center>
        </div>
      ),
      children: <SerarchTabs />,
    },
    {
      key: departmentNameEnum["DESIGN_AND_DEVELOPMENT"],
      label: (
        <div className="">
          <center className="tab-style">
            <TabIcon2 />
            <p className="text-sm font-medium pt-[10px]">Design & Development</p>
          </center>
        </div>
      ),
      children: <SerarchTabs />,
    },
    {
      key: departmentNameEnum["MARKETING_AND_COMMUNICATION"],
      label: (
        <center className="tab-style">
          <TabIcon3 />
          <p className="text-sm font-medium pt-[10px]">Marketing & Communication</p>
        </center>
      ),
      children: <SerarchTabs />,
    },
    {
      key: departmentNameEnum["PROJECT_MANAGEMENT"],
      label: (
        <center className="tab-style">
          <TabIcon4 />
          <p className="text-sm font-medium pt-[10px]">Project Management</p>
        </center>
      ),
      children: <SerarchTabs />,
    },
    {
      key: departmentNameEnum["FINANCE_MANAGEMENT"],
      label: (
        <center>
          <TabIcon5 />
          <p className="text-sm font-medium pt-[10px]">Finance Management</p>
        </center>
      ),
      children: <SerarchTabs />,
    },
    {
      key: departmentNameEnum["HUMAN_RESOURCE_MANAGEMENT"],
      label: (
        <center>
          <TabIcon6 />
          <p className="text-sm font-medium pt-[10px]">Human Resource Management</p>
        </center>
      ),
      children: <SerarchTabs />,
    },
    {
      key: departmentNameEnum["BUSINESS_AND_CONSULTANCY"],
      label: (
        <center>
          <TabIcon7 />
          <p className="text-sm font-medium pt-[10px]">Business & Consultancy</p>
        </center>
      ),
      children: <SerarchTabs />,
    },
    {
      key: departmentNameEnum["ADMINISTRATION"],
      label: (
        <center>
          <TabIcon8 />
          <p className="text-sm font-medium pt-[10px]">Administration</p>
        </center>
      ),
      children: <SerarchTabs />,
    },
    {
      key: departmentNameEnum["CUSTOMER_SUCCESS_MANAGEMENT"],
      label: (
        <center>
          <TabIcon9 />
          <p className="text-sm font-medium pt-[10px]">Customer Success Management</p>
        </center>
      ),
      children: <SerarchTabs />,
    },
  ];
  return (
    <div className="my-7 inetrn-document-tabs">
      <Row>
        <Col xs={24}>
          <Tabs
            size="small"
            items={items}
            onChange={(e) => {
              handleTabChange(e);
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SearchJobTabs;
