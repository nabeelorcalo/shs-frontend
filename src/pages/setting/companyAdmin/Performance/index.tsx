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
import "../../style.scss";

const { Panel } = Collapse;
const inputData = [
  { 
    id: 1,
    title: "Work with full potential",
    pType:"Learning Objective"
  },
  {
    id: 2,
    title: "Quality of work",
    pType:"Learning Objective"
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
          {}
          <Panel className="text-base font-semibold text-primary-color" header="Learning Objective" key="1">
            <Row gutter={[0, 15]}>
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
                      <div className="flex mx-3">
                        <Performanceinput style={{ height: "38px" }} />
                        <div className="flex pt-1 justify-between performance-box w-full">
                          <span className="mx-2 font-normal text-sm md:text-base text-primary-color">{item.title}</span>

                          <span className="mr-3">
                            <DropDownForPerformance
                              item={item}
                              IdHandler={IdHandler}
                            /></span>
                        </div>
                      </div>
                    }
                    {
                      item.id === id && (
                        <div className="w-full flex px-3">
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
                      )
                    }
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
                    className="flex mx-3  gap-2 performance-add-button text-teriary-color  text-input-bg-color"
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
            isActive ? <PerformanceMinus /> :
              <PerformancePlus />
          }
          expandIconPosition="right"
          key={2}
          className="bg-white"
        >
          <Panel className="text-base font-semibold text-primary-color" header="Discipline" key="2">
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
          <Panel className="text-base font-semibold text-primary-color" header="Personal" key="1">
            <p></p>
          </Panel>
        </Collapse>
      </Space>
    </div >
  );
};

export default SettingPerformance;
