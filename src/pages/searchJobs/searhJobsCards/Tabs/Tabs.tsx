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
import { useEffect } from "react";

const SearchJobTabs = () => {
  const { getSearchJobsDepartment, serachJobsDepData } = useCustomHook();
  useEffect(() => {
    getSearchJobsDepartment()
  }, [])
  console.log(serachJobsDepData, "serachJobsDepData");

  const items: TabsProps["items"] = [
    {
      key: "1",
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
      key: "2",
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
      key: "3",
      label: (
        <center className="tab-style">
          <TabIcon3 />
          <p className="text-sm font-medium pt-[10px]">Marketing & Communication</p>
        </center >
      ),
      children: <SerarchTabs />,
    },
    {
      key: "4",
      label: (
        <center className="tab-style">
          <TabIcon4 />
          <p className="text-sm font-medium pt-[10px]">Project Management</p>
        </center>
      ),
      children: <SerarchTabs />,
    },
    {
      key: "5",
      label: (
        <center>
          <TabIcon5 />
          <p className="text-sm font-medium pt-[10px]">Finance Management</p>
        </center>
      ),
      children: <SerarchTabs />,
    },
    {
      key: "6",
      label: (
        <center>
          <TabIcon6 />
          <p className="text-sm font-medium pt-[10px]">Human Resource Management</p>
        </center>
      ),
      children: <SerarchTabs />,
    },
    {
      key: "7",
      label: (
        <center>
          <TabIcon7 />
          <p className="text-sm font-medium pt-[10px]">Business & Consultancy</p>
        </center>
      ),
      children: <SerarchTabs />,
    },
    {
      key: "8",
      label: (
        <center>
          <TabIcon8 />
          <p className="text-sm font-medium pt-[10px]">Administration</p>
        </center>
      ),
      children: <SerarchTabs />,
    },
    {
      key: "9",
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
          <Tabs size="small" items={items} onChange={() => { }} />
        </Col>
      </Row>
    </div>
  );
};

export default SearchJobTabs;
