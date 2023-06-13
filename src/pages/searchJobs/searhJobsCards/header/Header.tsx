
import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { FiltersButton, SearchBar } from "../../../../components";
import GlobalButton from "../../Button/button";
import DrawerBar from "../Tabs/drawerSideBar/Drawer";
import {
  LocationIconJob
} from "../../../../assets/images";
import useCustomHook from "../../actionHandler";
const SearchBarCards = (props: any) => {
  const { drawer, setDrawer } = props;
  const [searchValue, setSearchValue] = useState("");
  const { getSearchJob, searchJobsData } = useCustomHook();
  useEffect(() => {
    getSearchJob(searchValue)
  }, [searchValue])

  const handleChangeSearch = (e: any) => {
    setSearchValue(e)
  };
  return (
    <>
      <Row gutter={[20, 20]} justify="space-between">
        <Col lg={12} md={24} sm={24} xs={24}>
          <Row gutter={[20, 20]}>
            <Col lg={10} md={12} sm={24} xs={24}>
              <SearchBar
                handleChange={handleChangeSearch}
                placeholder={"Job category or keyword"}
                className=" bg-none text-input-bg-color"
              />
            </Col>
            <Col lg={10} md={12} sm={24} xs={24} className="">
              <SearchBar
                icon={<LocationIconJob />}
                handleChange={() => { }}
                placeholder={"Enter location"}
                className="bg-none text-input-bg-color"
              />
            </Col>
            <Col lg={4} md={24} xs={24} className="flex max-md:flex-col">
              <GlobalButton name={"Search"} className="global-btn" />
            </Col>
          </Row>
        </Col>
        <Col lg={6} md={24} sm={24} xs={24} className="flex max-sm:flex-col justify-end gap-4">
          <FiltersButton label="Filters" onClick={() => setDrawer(!drawer)} />
        </Col>
      </Row>
      <DrawerBar drawer={drawer} setDrawer={setDrawer} />
    </>
  );
};

export default SearchBarCards;
