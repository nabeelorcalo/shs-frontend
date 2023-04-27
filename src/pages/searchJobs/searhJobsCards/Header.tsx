import react from "react";
import { Col, Row } from "antd";
import { FiltersButton, SearchBar } from "../../../components";
import GlobalButton from "../Button/button";
import DrawerBar from "./Tabs/drawerSideBar/Drawer";

const SearchBarCards = (props: any) => {
  const { drawer, setDrawer } = props;

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col lg={6} md={12} sm={24} xs={24}>
          <SearchBar
            handleChange={() => {}}
            placeholder={"Job category or keyword"}
            className=" bg-none text-input-bg-color"
          />
        </Col>
        <Col lg={6} md={12} sm={24} xs={24}>
          <SearchBar
            handleChange={() => {}}
            placeholder={"Enter location"}
            className="bg-none text-input-bg-color"
          />
        </Col>
        <Col lg={2} md={6} sm={12} xs={24}>
          <GlobalButton name={"Search"} className={"py-6"} />
        </Col>

        <Col
          lg={10}
          md={6}
          sm={24}
          xs={24}
          className="flex md:justify-end justify-start"
        >
          <FiltersButton label="Filters" onClick={() => setDrawer(!drawer)} />
        </Col>
      </Row>
      <DrawerBar drawer={drawer} setDrawer={setDrawer} />
    </>
  );
};

export default SearchBarCards;
