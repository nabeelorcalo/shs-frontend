import { Button, Col, Divider, Row, Typography } from "antd";
import React, { useState } from "react";
import { DropDown, SearchBar } from "../../../components";
import user from "../../../assets/images/profile/university/Managers.svg";
import listView from '../../../assets/images/profile/university/listview.svg';
import gridview from '../../../assets/images/profile/university/gridview.svg'
import { NodeExpandOutlined, RightOutlined } from "@ant-design/icons";
import ManagerInfo from "./managerInfo";
import ManagerInfoTable from "./managerInfoTable";



const ManagerMain = () => {
  const [value, setValue] = useState("");
  const [showGrid, setShowGrid] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [bgColor, setBgColor] = useState('#E6F4F9')
  const searchValue = () => {};

  return (
    <div className="manager-main">
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div>
            <Typography className="text-[#363565] text-2xl font-semibold font-[outfit]">
              Managers
            </Typography>
          </div>
        </Col>
      </Row>
      <Divider />
      <Row className="flex items-center ">
        <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
          <SearchBar handleChange={searchValue} />
        </Col>
        <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
          <div className="flex items-center justify-center sm:justify-end gap-2">
                      <Button className="bg-[#4A9D77] text-white flex items-center ">
                          <a href="addManager" className="flex items-center gap-3"> <img src={user} alt="" /> New Manager</a>
             
            </Button>
            <Button className="font-semibold text-base text-[#A0A3BD] rounded-[8px] m-[12px] bg-[#E6F4F9]">
              <NodeExpandOutlined style={{ fontSize: "16px" }} />
              Filter
              <RightOutlined style={{ fontSize: "12px" }} />
                      </Button>
                      <div className="bg-[#E6F4F9] p-2 flex gap-2">
              <div style={{background:bgColor}} className=" p-1" onClick={() => {
                setShowGrid(true);
                setShowTable(false)
                setBgColor("white")
                          }}>
                          <img src={listView} alt=""   />  
                          </div>
                          <div style={{background:bgColor}}  className=" p-1" onClick={() => {
                setShowTable(true);
                setShowGrid(false);
                setBgColor("white")
               
                          }}>
                              
                          <img src={gridview} alt=""  />
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
      {showGrid === true && (<div>
        <ManagerInfo />
      </div>)}
      {showTable === true &&   (<div>
        <ManagerInfoTable/>
      </div>)}
        
      
     
    </div>
  );
};

export default ManagerMain;
