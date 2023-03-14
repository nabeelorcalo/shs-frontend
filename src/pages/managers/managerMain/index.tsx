import React, { useState } from "react";
import { Button, Col, Divider, Row, Typography, Form, Space } from 'antd';
import { DropDown, SearchBar } from "../../../components";
import { User} from "../../../assets/images";
import listView from "../../../assets/images/profile/university/listview.svg";
import gridview from "../../../assets/images/profile/university/gridview.svg";
import { NodeExpandOutlined, RightOutlined } from "@ant-design/icons";
import ManagerInfo from "./managerInfo";
import ManagerInfoTable from "./managerInfoTable";
import Drawer from "../../../components/Drawer";
import '../style.scss';

const ManagerMain = () => {
  const [value, setValue] = useState("");
  const [showGrid, setShowGrid] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [activeButton, setActiveButton] = useState(0);

  const searchValue = () => {};
  const handleClick = (buttonIndex:any) => {
    setActiveButton(buttonIndex);
  }
  return (
    <div className="manager-main">
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} title='Filters'>
      <Form layout="vertical">
         
          <Form.Item label="Status" name="status">
            <DropDown
              name="Select"
              value={value}
              options={["item 1", "item 2", "item 3"]}
              setValue={setValue}
            />
          </Form.Item>
          <Form.Item label="Department" name="department">
            <DropDown
              name="Select"
              value={value}
              options={["item 1", "item 2", "item 3"]}
              setValue={setValue}
            />
          </Form.Item>
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
          <div>
            <Typography className="primary-color text-2xl font-semibold font-[outfit]">
              Managers
            </Typography>
          </div>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[5, 10]} className="flex items-center ">
        <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
          <SearchBar handleChange={searchValue} />
        </Col>
        <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
          <div className="flex items-center justify-center flex-wrap sm:flex-nowrap sm:justify-end gap-2">
            <Button className="teriary-bg-color white-color flex items-center ">
              <a href="addManager" className="flex items-center gap-3">
                <User/> New Manager
              </a>
            </Button>
            <Button onClick={()=>setOpenDrawer(true)} className="font-semibold text-base text-[#A0A3BD] rounded-[8px] m-[12px] bg-[#E6F4F9]">
              <NodeExpandOutlined className="text-base" />
              Filter
              <RightOutlined className="text-xs" />
            </Button>
            <div className="text-input-bg-color p-2 flex gap-2">
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
