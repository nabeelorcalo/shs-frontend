import React, { SyntheticEvent, useRef, useState } from "react";
import { Col, Row } from "antd";
import AppTabs from "../../../components/Tabs";
import ListingRequest from "../listingRequest";
import PropertyAgentTable from "../propertAgentTable";
import MainDashboard from "./Dashboard";
import { PageHeader } from "../../../components";
import "../style.scss";

const PropertyDashboard = () => {
  const [activeTab, setActiveTab] = useState('1');
  const propertyAgentRef = useRef<any>(null)
  const listingRequestRef = useRef<any>(null)

  const handleNextTab = (key: any) => {
    setActiveTab(key);
  };

  const handleTabChange = (event: SyntheticEvent, newValue: any) => {
    if (propertyAgentRef.current) propertyAgentRef.current.resetForm()
    if (listingRequestRef.current) listingRequestRef.current.resetForm()
    setActiveTab(newValue);
  };

  const items = [
    {
      key: '1',
      label: "Dashboard",
      children: <MainDashboard handleNextTab={handleNextTab} setActiveTab={setActiveTab} />,
    },
    {
      key: '2',
      label: "Listings Request",
      children: <ListingRequest ref={listingRequestRef} />,
    },
    {
      key: 3,
      label: "Property Agents",
      children: <PropertyAgentTable ref={propertyAgentRef} />,
    },
  ];

  return (
    <>
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <PageHeader title="Property Agent" bordered={true} />
        </Col>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <AppTabs
            items={items}
            activeTab={activeTab}
            onChange={handleTabChange}
            setActiveTab={setActiveTab}
          />
        </Col>
      </Row>
    </>
  );
};

export default PropertyDashboard;
