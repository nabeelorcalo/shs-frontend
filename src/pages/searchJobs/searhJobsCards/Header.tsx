import { useState } from "react";
import { Col, Row } from "antd";
import {
  SearchIconJob,
  LocationIconJob,
  SeachJobArrow,
  SearchFilter,
} from "../../../assets/images";
import { FiltersButton } from "../../../components";
import GlobalButton from "../Button/button";
import Input from "../Input/input";
import DrawerBar from "./Tabs/drawerSideBar/Drawer";

const SearchBarCards = (props: any) => {
  const { drawer, setDrawer } = props;

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col lg={6} md={12} sm={24} xs={24}>
          <Input
            prefix={<SearchIconJob className="mr-1" />}
            placeholder={"Job category or keyword"}
            className=" bg-none text-input-bg-color"
          />
        </Col>
        <Col lg={6} md={12} sm={24} xs={24}>
          <Input
            prefix={<LocationIconJob className="mr-1" />}
            placeholder={"Enter location"}
            className="bg-none text-input-bg-color "
          />
        </Col>
        <Col lg={2} md={6} sm={12} xs={24}>
          <GlobalButton name={"Search"} className={"py-6"} />
        </Col>

        <Col lg={10} md={6} sm={12} xs={24} className="flex lg:justify-end ">
          <FiltersButton label="Filters" onClick={() => setDrawer(!drawer)} />
        </Col>
      </Row>
      <DrawerBar drawer={drawer} setDrawer={setDrawer} />
    </>
  );
};

export default SearchBarCards;
