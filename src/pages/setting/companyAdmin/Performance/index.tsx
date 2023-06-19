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
import "../../style.scss";
import usePerformanceCustomHook from "./actionHandler";
import { Alert, DropDownForSetting, Loader } from "../../../../components";
const { Panel } = Collapse;
import "./style.scss";

const SettingPerformance: React.FC = () => {
  const [hideButton, sethideButton] = useState<any>({
    learning: false,
    discipline: false,
    personal: false,
    objectName: null
  });
  const [state, setState] = useState<any>({
    id: null,
    isDeleteModal: false,
    editField: null
  })

  const {
    loading,
    getSettingPerformance,
    settingPerformancedata,
    deleteSettingPerformance,
    postSettingPerformance,
    editSettingPerformance }: any = usePerformanceCustomHook()

  useEffect(() => {
    getSettingPerformance()
  }, [])

  const finishHandler = (values: any) => {
    values.pType = hideButton.objectName
    if (state?.editField?.id) {
      editSettingPerformance(state?.editField, values)
      setState({ ...state, editField: null })
    }
    else (
      postSettingPerformance(values)
    )
    sethideButton({ ...hideButton, learning: false, discipline: false, personal: false })
  }

  const initialValues = {
    questionTitle: state?.editField?.title
  }

  return (
    <div className="setting-performance">
      {loading ? <Loader /> : <Space direction="vertical" className="w-full">
        <Collapse
          expandIcon={({ isActive }) =>
            isActive ? <PerformanceMinus /> : <PerformancePlus />
          }
          expandIconPosition="right"
          defaultActiveKey={["1"]}
          className="bg-white"
        >
          <Panel className="text-base font-semibold" header={<span className="text-primary-title-color">Learning Objective</span>} key="1">
            <Row gutter={[0, 15]}>
              {settingPerformancedata?.learningObjective?.map((item: any, index: number) => {
                return (
                  <Col
                    key={index}
                    className="gutter-row"
                    xs={24}
                    xxl={12}
                  >
                    {item.id !== state.editField?.id &&
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
                      item.id === state.editField?.id && (
                        <Form onFinish={finishHandler} className="w-full flex items-start m-0" initialValues={initialValues}>
                          <Form.Item name='questionTitle' className="ml-4 mb-[0px]">
                            <Input
                              placeholder="Enter text"
                              className="sm:w-full md:w-[150px] lg:w-[440px] rounded-lg"
                              size="small"
                            />
                          </Form.Item>
                          <Space className="ml-2 mt-2.5">
                            <button type="submit" className="w-[30px] border-0 bg-white">
                              <PerformanceTick className="cursor-pointer" />
                            </button>
                            <button className="w-[30px] border-0 bg-white"
                              onClick={() => {
                                setState({ ...state, editField: null })
                              }}>
                              <PerformanceClose className="cursor-pointer" />
                            </button>
                          </Space>
                        </Form>
                      )
                    }
                  </Col>
                );
              })}
            </Row>
            <Row>
              <Col xs={24} md={12} xl={14} className="my-5">
                {!hideButton.learning && (
                  <Button
                    onClick={() => {
                      sethideButton({ ...hideButton, learning: true, objectName: 'LEARNING_OBJECTIVE' });
                    }}
                    className="text-teriary-color  text-input-bg-color rounded-lg border-none">
                    <AddNewQuestion /> <span className="text-sm ml-2">Add New Question</span>
                  </Button>
                )}
                {hideButton.learning && (
                  <Form onFinish={finishHandler} className="flex items-start w-full">
                    <Form.Item name='questionTitle' className="ml-4">
                      <Input
                        placeholder="Enter text"
                        className="sm:w-full md:w-[150px] lg:w-[440px] rounded-lg"
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
            isActive ? <PerformanceMinus /> : <PerformancePlus />
          }
          expandIconPosition="right"
          className="bg-white"
        >
          <Panel className="text-base font-semibold"
            header={<span className="text-primary-title-color">Discipline</span>} key="2">
            <Row gutter={[0, 15]}>
              {settingPerformancedata?.discipline?.map((item: any, index: number) => {
                return (
                  <Col
                    key={index}
                    className="gutter-row"
                    xs={24}
                    xxl={12}
                  >
                    {item.id !== state.editField?.id &&
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
                      item.id === state.editField?.id && (
                        <Form onFinish={finishHandler} className="w-full flex items-start" initialValues={initialValues}>
                          <Form.Item name='questionTitle' className="ml-4 mb-0">
                            <Input
                              placeholder="Enter text"
                              className="sm:w-full md:w-[150px] lg:w-[440px] rounded-lg"
                              size="small"
                            />
                          </Form.Item>
                          <Space className="ml-2 mt-2.5">
                            <button type="submit" className="w-[30px] border-0 bg-white">
                              <PerformanceTick className="cursor-pointer" />
                            </button>
                            <button type="button" className="w-[30px] border-0 bg-white"
                              onClick={() => {
                                setState({ ...state, editField: null })
                              }}>
                              <PerformanceClose className="cursor-pointer" />
                            </button>
                          </Space>
                        </Form>
                      )
                    }
                  </Col>
                );
              })}
            </Row>
            <Row>
              <Col xs={24} md={12} xxl={11} className="my-5">
                {!hideButton.discipline && (
                  <Button
                    onClick={() => {
                      sethideButton({ ...hideButton, discipline: true, objectName: 'DISCIPLINE' });
                    }}
                    className="text-teriary-color  text-input-bg-color rounded-lg border-none">
                    <AddNewQuestion /> <span className="text-sm ml-2">Add New Question</span>
                  </Button>
                )}
                {hideButton.discipline && (
                  <Form onFinish={finishHandler} className="w-full flex items-start">
                    <Form.Item name='questionTitle' className="ml-4 mb-0">
                      <Input
                        placeholder="Enter text"
                        className=" sm:w-full md:w-[150px] lg:w-[440px] rounded-lg"
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
            isActive ? <PerformanceMinus /> : <PerformancePlus />
          }
          expandIconPosition="right"
          className="bg-white"
        >
          <Panel className="text-base font-semibold"
            header={<span className="text-primary-title-color">Personal</span>} key="3">
            <Row gutter={[0, 15]}>
              {settingPerformancedata?.personal?.map((item: any, index: number) => {
                return (
                  <Col
                    key={index}
                    className="gutter-row"
                    xs={24}
                    xxl={12}
                  >
                    {item.id !== state.editField?.id &&
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
                      item.id === state.editField?.id && (
                        <Form onFinish={finishHandler} className="w-full flex items-start" initialValues={initialValues}>
                          <Form.Item name='questionTitle' className="ml-4">
                            <Input
                              placeholder="Enter text"
                              className="sm:w-full md:w-[150px] lg:w-[440px] rounded-lg"
                              size="small"
                            />
                          </Form.Item>
                          <Space className="ml-2 mt-2.5">
                            <button type="submit" className="w-[30px] border-0 bg-white">
                              <PerformanceTick className="cursor-pointer" />
                            </button>
                            <button className="w-[30px] border-0 bg-white"
                              onClick={() => {
                                setState({ ...state, editField: null })
                              }}>
                              <PerformanceClose className="cursor-pointer" />
                            </button>
                          </Space>
                        </Form>
                      )
                    }
                  </Col>
                );
              })}
            </Row>
            <Row>
              <Col xs={24} md={12} xxl={11} className="my-5">
                {!hideButton.personal && (
                  <Button
                    onClick={() => {
                      sethideButton({ ...hideButton, personal: true, objectName: 'PERSONAL' });
                    }}
                    className="text-teriary-color  text-input-bg-color rounded-lg border-none">
                    <AddNewQuestion /> <span className="text-sm ml-2">Add New Question</span>
                  </Button>
                )}
                {hideButton.personal && (
                  <Form onFinish={finishHandler} className="w-full flex items-start">
                    <Form.Item name='questionTitle' className="ml-4">
                      <Input
                        placeholder="Enter text"
                        className="sm:w-full md:w-[150px] lg:w-[440px] rounded-lg"
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
      </Space>}

      <Alert
        cancelBtntxt="Cancel"
        okBtntxt="Delete"
        state={state.isDeleteModal}
        setState={setState}
        type="error"
        width={570}
        children={<p>Are you sure you want to delete this?</p>}
        okBtnFunc={() => deleteSettingPerformance(state.id)}
      />
    </div >
  );
};

export default SettingPerformance;
