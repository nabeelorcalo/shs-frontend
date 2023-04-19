import React, { useState } from "react";
import { Button, Col, Row, Form, Space, Select } from 'antd';
import { ROUTES_CONSTANTS } from "../../../config/constants";
import { useNavigate } from "react-router-dom";
import { DropDown, FiltersButton, PageHeader, SearchBar } from "../../../components";
import { User} from "../../../assets/images";
import listView from "../../../assets/images/profile/university/listview.svg";
import gridview from "../../../assets/images/profile/university/gridview.svg";
import ManagerInfo from "./managerInfo";
import ManagerInfoTable from "./managerInfoTable";
import Drawer from "../../../components/Drawer";
import '../style.scss';

const ManagerMain = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [showGrid, setShowGrid] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [activeButton, setActiveButton] = useState(0);

  const searchValue = () => { };
  
  const handleClick = (buttonIndex:any) => {
    setActiveButton(buttonIndex);
  }

  const handleChangeSelect = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="manager-main">
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} title='Filters'>
      <Form layout="vertical">
        <div className="mb-6">
          <label>Status</label>
          <div className="mt-2">
            <Select
              className="w-[100%]"
              defaultValue="Select"
              onChange={handleChangeSelect}
              options={[
                { value: "DarrelSteward", label: "DarrelSteward" },
                { value: "Inactive", label: "Inactive" },
               
              ]}
            />
          </div>
        </div>
        <div className="mb-6">
          <label>Department</label>
          <div className="mt-2">
            <Select
              className="w-[100%]"
              defaultValue="Select"
              onChange={handleChangeSelect}
              options={[
                { value: "Active", label: "Active" },
                { value: "Inactive", label: "Inactive" },
                { value: "Publish", label: "Publish" },
               
              ]}
            />
          </div>
        </div>

          <div className="flex justify-center sm:justify-end">
            <Space>
              <Button className="border-1 border-[#4A9D77] teriary-color font-semibold">
                Reset
              </Button>
              <Button
                className="teriary-bg-color white-color border-0 border-[#4a9d77] ml-2 pt-0 pb-0 pl-5 pr-5"
                htmlType="submit"
              >
                Apply
              </Button>
            </Space>
          </div>
        </Form>
      </Drawer>
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <PageHeader title='Managers' bordered={ true} />
        </Col>
      </Row>
      <Row gutter={[10, 20]} className="flex items-center pb-5">
        <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
          <SearchBar placeholder="Search by name" handleChange={searchValue} />
        </Col>
        <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
          <div className="flex items-center justify-center flex-wrap sm:flex-nowrap sm:justify-end gap-2">
            <Button className="teriary-bg-color white-color flex items-center"
              onClick={() => {
              navigate(`/${ROUTES_CONSTANTS.ADD_MANAGER}`);
              }}
            >
               <span className="flex items-center gap-3"><User/> New Manager</span> 
            </Button>
            <FiltersButton label='Filter' onClick={()=>setOpenDrawer(true)}/> 
            <div className="text-input-bg-color rounded-lg p-1 flex gap-2">
              <div
               className={`button ${activeButton === 0 ? 'active' : ''}`}
                onClick={() => {
                  setShowGrid(true);
                  setShowTable(false);
                  handleClick(0);
                }}
              >
                <img src={listView} alt="" className='img-style' />
              </div>
              <div
                  className={`button ${activeButton === 1 ? 'active' : ''}`}
                 
                onClick={() => {
                  setShowTable(true);
                  setShowGrid(false);
                  handleClick(1);
                }}
              >
                <img src={gridview} alt="" className='img-style' />
              </div>
            </div>
            <div className="w-25">
              <DropDown
                requiredDownloadIcon
                options={["pdf", "excel"]}
                value={value}
                setValue={setValue}
              />
            </div>
          </div>
        </Col>
      </Row>
      {showGrid === true && (
        <div>
          <ManagerInfo />
        </div>
      )}
      {showTable === true && (
        <div>
          <ManagerInfoTable />
        </div>
      )}
    </div>
  );
};

export default ManagerMain;
