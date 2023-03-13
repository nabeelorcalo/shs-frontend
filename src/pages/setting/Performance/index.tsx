import React from "react";
import { Collapse, Space, Row, Col } from "antd";
import { SettingOutlined } from "@ant-design/icons/lib/icons";
import {
  Performanceinput,
  PerformanceMinus,
  PerformancePlus,
} from "../../../assets/images";
import { Input } from "antd";
import DropDownForPerformance from "./PerformanceDropdown";
import inputIcon from "../../../assets/images/setting/performanceInput.svg";
const { Panel } = Collapse;

const inputData = [
  {
    title: "Work with full potential",
  },
  {
    title: "Quality of work",
  },
  {
    title: "  Work consistency",
  },
  {
    title: "  Independency in work",
  },
  {
    title: "   Business Skills",
  },
  {
    title: "   Technical skills",
  },
];

const SettingPerformance: React.FC = () => {
  return (
    <div>
      <Space direction="vertical" className="w-full">
        <Collapse
          expandIcon={({ isActive }) =>
            isActive ? <PerformanceMinus /> : <PerformancePlus />
          }
          expandIconPosition="right"
          defaultActiveKey={["1"]}
          className="bg-white"
        >
          <Panel header="Learning Objective" key="1">
            <Row gutter={[20, 20]}>
              {inputData.map((item)=>{
              return(<Col className="gutter-row" xs={24} md={12} xxl={12}>
                <Input.Group compact className="w-full">
                  <span className="h-[42px]">
                    <Performanceinput  style={{height:"42px"}} />
                  </span>

                  <Input
                    className="w-full"
                    suffix={<DropDownForPerformance />}
                    style={{ width: "90%" }}
                    value={item.title}
                    placeholder="Select Address"
                    size="small"
                  />
                </Input.Group>
              </Col>)})}
            
            </Row>
          </Panel>
        </Collapse>
        <Collapse
          expandIcon={({ isActive }) =>
            isActive ? <PerformanceMinus /> : <PerformancePlus />
          }
          expandIconPosition="right"
          key={2}
          className="bg-white"
        >
          <Panel header="Discipline" key="1">
            <p></p>
          </Panel>
        </Collapse>
        <Collapse
          expandIcon={({ isActive }) =>
            isActive ? <PerformanceMinus /> : <PerformancePlus />
          }
          expandIconPosition="right"
          key={3}
          className="bg-white"
        >
          <Panel header="Personal" key="1">
            <p></p>
          </Panel>
        </Collapse>
      </Space>
    </div>
  );
};

export default SettingPerformance;
