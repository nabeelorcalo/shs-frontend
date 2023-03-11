import { Button, Col, Divider, Menu, Row, Space, TabsProps } from "antd";
import React, { useState } from "react";
import { SearchBar } from "../../../components";
import "./helpDesk.scss";
import FiltersButton from "../../../components/FiltersButton";
import DownloadIcon from "../../../assets/images/ColorfullIconsProgressbar/Downlaod.png";
import GlobalTable from "../../../components/Table/Table";
import CustomDroupDown from "../../digiVault/digiVaultStudent/droupDownCustom/CustomDroupDown";
import AppTabs from "../../../components/Tabs";
import { BoxWrapper } from "../../../components/BoxWrapper/boxWrapper";
import ResolvedData from "./Resolved/resolvedData";
import AllData from "./allData/allData";
import AssignedData from "./AssignedData/assignedData";
import UnassignedData from "./UnassignedData/unassignedData";
import Drawer from "../../../components/Drawer";


  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `All`,
      children: <AllData/>,
    },
    {
      key: "2",
      label: `Unassigned`,
      children: <UnassignedData/>,
    },
    {
      key: "3",
      label: `Assigned`,
      children: <AssignedData/>,
    },
    {
      key: "4",
      label: `Resolved`,
      children: <ResolvedData/>,
    },
  ];

const HelpDesk = () => {
 const [openDrawer, setOpenDrawer] = useState(false)


  const handleChange = () => {
    console.log("change");
  };

  const handleClick = () => {
    setOpenDrawer(true)
  };

  return (
    <div className="help-desk">
      <Drawer onClose={() => setOpenDrawer(false)} open={openDrawer} title="Filters">
      <SearchBar size="middle" handleChange={handleChange} />
      </Drawer>
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="text-2xl font-semibold text-[#363565]">Help Desk</div>
        </Col>

        <Divider />

        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Row gutter={[10,10]}>
            <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={24}>
              <SearchBar size="middle" handleChange={handleChange} />
            </Col>
            <Col xxl={14} xl={12} lg={8} md={8} sm={1} xs={1}></Col>

            <Col xxl={2} xl={4} lg={8} md={8} sm={11} xs={24}>
              <div className="flex">
                <div className="mr-4">
                  <FiltersButton  label="Filter" onClick={handleClick} />
                </div>

                <div>
                  <Button className="flex justify-center items-center download-btn bg-[#E6F4F9] border-none hover:bg-[#ffff] hover:border-solid">
                    <img src={DownloadIcon} alt="icon" />
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="mt-8">
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <BoxWrapper>
            <AppTabs items={items}/>
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  );
};

export default HelpDesk;
