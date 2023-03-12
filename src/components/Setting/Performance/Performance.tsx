import React from "react";
import { Collapse, Space, Row , Col } from "antd";
import { SettingOutlined } from "@ant-design/icons/lib/icons";
import {
  Performanceinput,
  PerformanceMinus,
  PerformancePlus,
} from "../../../assets/images";
import { Input } from "antd";
import DropDownForPerformance from "./PerformanceDropdown";
import inputIcon from '../../../assets/images/setting/performanceInput.svg'
const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const genExtra = () => (
  <SettingOutlined
    onClick={(event) => {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation();
    }}
  />
);



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
           <Row >
            <Col className="gutter-row" xs={24} md={12} xxl={12}>
            <Input.Group compact className="w-full">
          <span className="h-[42px]"><img src={inputIcon} height="42px"/></span>

          <Input className="w-full"
            suffix={<DropDownForPerformance />}
            style={{ width: "70%" }}
            value="ddd"
            placeholder="Select Address"
            size="small"
          />
        </Input.Group>
            
            </Col>
            <Col className="gutter-row flex" xs={24} md={12} xxl={12}>
            <Input.Group compact>
          <span className="h-[42px]"><img src={inputIcon} height="42px"/></span>

          <Input
            suffix={<DropDownForPerformance />}
            style={{ width: "70%" }}
            value="ddd"
            placeholder="Select Address"
            size="small"
          />
        </Input.Group>
            
            </Col>
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
            <p>{text}</p>
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
            <p>{text}</p>
          </Panel>
        </Collapse>

       
      </Space>
    </div>
  );
};

export default SettingPerformance;
