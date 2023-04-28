import react from "react";
import { Col, Row } from "antd";
import { FiltersButton, SearchBar } from "../../../../components";
import GlobalButton from "../../Button/button";
import DrawerBar from "../Tabs/drawerSideBar/Drawer";
import {
  LocationIconJob
} from "../../../../assets/images";
const SearchBarCards = (props: any) => {
  const { drawer, setDrawer } = props;

  return (
    <>
      <Row gutter={[20, 20]} justify="space-between">
        <Col lg={12} md={24} sm={24} xs={24}>
          <Row gutter={[20, 20]}>
            <Col lg={12} md={12} sm={24} xs={24}>
              <SearchBar
                handleChange={() => { }}
                placeholder={"Job category or keyword"}
                className=" bg-none text-input-bg-color"
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <SearchBar
                icon={<LocationIconJob />}
                handleChange={() => { }}
                placeholder={"Enter location"}
                className="bg-none text-input-bg-color"
              />
            </Col>
          </Row>
        </Col>

        <Col xl={4} lg={6} md={24} sm={24} xs={24} className="flex max-md:flex-col  lg:justify-end gap-4">
          <GlobalButton name={"Search"} className={"py-[22px] global-btn"} />
          <FiltersButton label="Filters" onClick={() => setDrawer(!drawer)} />
        </Col>
      </Row>
      <DrawerBar drawer={drawer} setDrawer={setDrawer} />
    </>
  );
};

export default SearchBarCards;
