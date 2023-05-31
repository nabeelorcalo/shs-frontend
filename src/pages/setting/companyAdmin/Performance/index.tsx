import React, { useEffect, useState } from "react";
import { Collapse, Space, Row, Col, Button, Input, Form } from "antd";
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
import usePerformanceCustomHook from "./actionHandler";
import { Alert, DropDownForSetting } from "../../../../components";
const { Panel } = Collapse;

const SettingPerformance: React.FC = () => {
  const [hideButton, sethideButton] = useState<any>({
    learning: false,
    discipline: false,
    personal: false,
    objectName: null
  });
  const [state, setState] = useState({
    id: null,
    isDeleteModal: false
  })
  const [id, setId] = useState<any>();
  const { getSettingPerformance, settingPerformancedata, deleteSettingPerformance, postSettingPerformance }: any = usePerformanceCustomHook()

  useEffect(() => {
    getSettingPerformance()
  }, [])

  const finishHandler = (values: any) => {
    console.log(values);

    values.pType = hideButton.objectName
    postSettingPerformance(values)
    sethideButton({ ...hideButton, learning: false, discipline: false, personal: false })
  }
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
          <Panel className="text-base font-semibold text-primary-color" header="Learning Objective" key="1">
            <Row gutter={[0, 15]}>
              {settingPerformancedata?.learningObjective?.map((item: any, index: number) => {
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
                            <DropDownForSetting
                              state={state}
                              setState={setState}
                              editData={item}
                            />
                          </span>
                        </div>
                      </div>
                    }
                  </Col>
                );
              })}
            </Row>
            <Row>
              <Col xs={24} md={12} xxl={11} className="my-3">
                {!hideButton.learning && (
                  <Button
                    size="small"
                    onClick={() => {
                      sethideButton({ ...hideButton, learning: true, objectName: 'LEARNING_OBJECTIVE' });
                    }}
                    className="flex mx-3  gap-2 performance-add-button text-teriary-color  text-input-bg-color"
                  >
                    <AddNewQuestion /> Add New Question
                  </Button>
                )}
                {hideButton.learning && (
                  <Form onFinish={finishHandler} className="w-full flex items-start">
                    <Form.Item name='questionTitle' className="ml-4">
                      <Input
                        placeholder="Enter text"
                        className="sm:w-full md:w-[200px] lg:w-[425px]"
                        size="small"
                      />
                    </Form.Item>
                    <Space className="ml-2 mt-2.5">
                      <button type="submit" className="w-[30px] border-0 bg-white">
                        <PerformanceTick className="cursor-pointer" />
                      </button>
                      <button className="w-[30px] border-0 bg-white" onClick={() => {
                        sethideButton({ ...hideButton, learning: false });
                      }}>
                        <PerformanceClose className="cursor-pointer" />
                      </button>
                    </Space>
                  </Form>
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
            <Row gutter={[0, 15]}>
              {settingPerformancedata?.discipline?.map((item: any, index: number) => {
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
                            <DropDownForSetting
                              state={state}
                              setState={setState}
                              editData={item}
                            />
                          </span>
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
                {!hideButton.discipline && (
                  <Button
                    size="small"
                    onClick={() => {
                      sethideButton({ ...hideButton, discipline: true, objectName: 'DISCIPLINE' });
                    }}
                    className="flex mx-3  gap-2 performance-add-button text-teriary-color  text-input-bg-color"
                  >
                    <AddNewQuestion /> Add New Question
                  </Button>
                )}

                {hideButton.discipline && (
                  <Form onFinish={finishHandler} className="w-full flex items-start">
                    <Form.Item name='questionTitle' className="ml-4">
                      <Input
                        placeholder="Enter text"
                        className="w-[425px]"
                        size="small"
                      />
                    </Form.Item>
                    <Space className="ml-2 mt-2.5">
                      <button type="submit" className="w-[30px] border-0 bg-white">
                        <PerformanceTick className="cursor-pointer" />
                      </button>
                      <button className="w-[30px] border-0 bg-white" onClick={() => {
                        sethideButton({ ...hideButton, discipline: false });
                      }}>
                        <PerformanceClose className="cursor-pointer" />
                      </button>
                    </Space>
                  </Form>
                )}
              </Col>
            </Row>
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
            <Row gutter={[0, 15]}>
              {settingPerformancedata?.personal?.map((item: any, index: number) => {
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
                            <DropDownForSetting
                              state={state}
                              setState={setState}
                              editData={item}
                            />
                          </span>
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
                {!hideButton.personal && (
                  <Button
                    size="small"
                    onClick={() => {
                      sethideButton({ ...hideButton, personal: true, objectName: 'PERSONAL' });
                    }}
                    className="flex mx-3  gap-2 performance-add-button text-teriary-color  text-input-bg-color"
                  >
                    <AddNewQuestion /> Add New Question
                  </Button>
                )}

                {hideButton.personal && (
                  <Form onFinish={finishHandler} className="w-full flex items-start">
                    <Form.Item name='questionTitle' className="ml-4">
                      <Input
                        placeholder="Enter text"
                        className="w-[425px]"
                        size="small"
                      />
                    </Form.Item>
                    <Space className="ml-2 mt-2.5">
                      <button type="submit" className="w-[30px] border-0 bg-white">
                        <PerformanceTick className="cursor-pointer" />
                      </button>
                      <button className="w-[30px] border-0 bg-white" onClick={() => {
                        sethideButton({ ...hideButton, personal: false });
                      }}>
                        <PerformanceClose className="cursor-pointer" />
                      </button>
                    </Space>
                  </Form>
                )}
              </Col>
            </Row>
          </Panel>
        </Collapse>
      </Space>
      <Alert
        cancelBtntxt="Cancel"
        okBtntxt="Delete"
        state={state.isDeleteModal}
        setState={setState}
        type="error"
        width={500}
        title=""
        children={<p>Are you sure you want to delete this?</p>}
        okBtnFunc={() => deleteSettingPerformance(state.id)}
      />
    </div >
  );
};

export default SettingPerformance;
