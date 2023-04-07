import React, { useState } from "react";
import { Collapse, Space, Row, Col, Button, Input } from "antd";
import {
  AddNewQuestion,
  PerformanceClose,
  Performanceinput,
  PerformanceMinus,
  PerformancePlus,
  PerformanceTick,
} from "../../../../assets/images";
import DropDownForPerformance from "./PerformanceDropdown";
import "./style.scss";

const { Panel } = Collapse;
const inputData = [
  {
    id: 1,
    title: "Work with full potential",
  },
  {
    id: 2,
    title: "Quality of work",
  },
  {
    id: 3,
    title: "  Work consistency",
  },
  {
    id: 4,
    title: " Independency in work",
  },
  {
    id: 5,
    title: " Business Skills",
  },
  {
    id: 6,
    title: "  Technical skills",
  },
];

const SettingPerformance: React.FC = () => {
  const [hideButton, sethideButton] = useState<Boolean>(false);
  const [id, setId] = useState<any>();

  const IdHandler = (id: any) => {
    setId(id);
  };
  return (
    <div className="setting-performance">
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
              {inputData.map((item, index) => {
                return (
                  <Col
                    key={index}
                    className="gutter-row"
                    xs={24}
                    lg={12}
                    xxl={12}
                  >
                    {item.id !== id &&
                      <Input.Group compact className="w-full">
                        <span className="h-[40px]">
                          <Performanceinput style={{ height: "38px" }} />
                        </span>

                        <Input
                          className="w-full"
                          suffix={
                            <DropDownForPerformance
                              item={item}
                              IdHandler={IdHandler}
                            />
                          }
                          style={{ width: "90%" }}
                          value={item.title}
                          placeholder="Select Address"
                          size="small"
                        />
                      </Input.Group>
                    }

                    {item.id === id && (
                      <div className="w-full flex">
                        <Input
                          placeholder="Enter text"
                          className="w-full"
                          size="small"
                        />
                        <Space className="ml-2">
                          <PerformanceTick
                            className="cursor-pointer"
                            onClick={() => {
                              setId('')
                            }}

                          />
                          <PerformanceClose
                            onClick={() => {
                              setId('')
                            }}
                            className="cursor-pointer"
                          />
                        </Space>
                      </div>
                    )}
                  </Col>
                );
              })}
            </Row>
            <Row>
              <Col xs={24} md={12} xxl={11} className="my-3">
                {!hideButton && (
                  <Button
                    size="small"
                    onClick={() => {
                      sethideButton(!hideButton);
                    }}
                    className="flex  gap-2 performance-add-button text-teriary-color  text-input-bg-color"
                  >
                    <AddNewQuestion /> Add New Question
                  </Button>
                )}

                {hideButton && (
                  <div className="w-full flex">
                    <Input
                      placeholder="Enter text"
                      className="w-full"
                      size="small"
                    />
                    <Space className="ml-2">
                      <PerformanceTick
                        className="cursor-pointer"
                        onClick={() => {
                          sethideButton(!hideButton);
                        }}
                      />
                      <PerformanceClose
                        onClick={() => {
                          sethideButton(!hideButton);
                        }}
                        className="cursor-pointer"
                      />
                    </Space>
                  </div>
                )}
              </Col>
            </Row>
          </Panel>
        </Collapse>
        <Collapse
          expandIcon={({ isActive }) =>
            isActive ? <PerformanceMinus />  : 
            <PerformancePlus />
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
            isActive ?
              <PerformanceMinus /> :
              <PerformancePlus />
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
