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

const SearchJobTabs = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <div className="first-tabs  px-6">
          <center className="tab-style ">
            <TabIcon />
            <p>All</p>
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
            <p>Design & Development</p>
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
          <p>Marketing & Communication</p>
        </center>
      ),
      children: <SerarchTabs />,
    },
    {
      key: "4",
      label: (
        <center className="tab-style">
          <TabIcon4 />

          <p>Project Management</p>
        </center>
      ),
      children: <SerarchTabs />,
    },
    {
      key: "5",
      label: (
        <center>
          <TabIcon5 />

          <p>Finance Management</p>
        </center>
      ),
      children: <SerarchTabs />,
    },
    {
      key: "6",
      label: (
        <center>
          <TabIcon6 />

          <p>Human Resource Management</p>
        </center>
      ),
      children: <SerarchTabs />,
    },
    {
      key: "7",
      label: (
        <center>
          <TabIcon7 />

          <p>Business & Consultancy</p>
        </center>
      ),
      children: <SerarchTabs />,
    },
    {
      key: "8",
      label: (
        <center>
          <TabIcon8 />

          <p>Administration</p>
        </center>
      ),
      children: <SerarchTabs />,
    },
    {
      key: "9",
      label: (
        <center>
          <TabIcon9 />

          <p>Customer Success Management</p>
        </center>
      ),
      children: <SerarchTabs />,
    },
  ];
  return (
    <div className="my-7  inetrn-document-tabs">
      <Row>
        <Col xs={24}>
          <Tabs size="small" items={items} onChange={() => { }}  />
        </Col>
      </Row>
    </div>
  );
};

export default SearchJobTabs;
