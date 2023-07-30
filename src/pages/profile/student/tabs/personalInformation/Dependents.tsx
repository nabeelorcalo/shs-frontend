import { DeleteFilled, DownloadOutlined, MinusCircleOutlined, PlusCircleFilled, PlusOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Col, DatePicker, Form, Input, Radio, Row, Select, Space, Tooltip } from "antd"
import { CommonDatePicker } from "../../../../../components";
import { disabledDate } from "../../../../../helpers";
import { useState } from "react";
import { CalendarIcon } from "../../../../../assets/images";


const Dependents = ({ radioVal = false, initialList = [] }: any) => {

  const [haveDependents, setHaveDependents] = useState(radioVal)

  return (
    <>
      <Form.List name="dependents">
        {(fields, { add, remove }) => {
          return (
            <>
              <Form.Item
                label="Do you have Dependents"
              >
                <Radio.Group
                  value={haveDependents}
                  onChange={(e: any) => {
                    setHaveDependents(e.target.value)
                    if (e.target.value === true) {
                      add()
                    } else {
                      for (let item of fields) {
                        remove(0)
                      }
                    }
                  }}
                >
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
                {/* 
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button> */}
              </Form.Item>
              {fields.map(({ key, name, ...restField }) => {
                return (
                  <Row gutter={15} key={key}>
                    <Col xxl={7} xl={7} lg={7} md={12} xs={24}>
                      <Form.Item
                        {...restField}
                        name={[name, 'name']}
                        label="Name"
                        initialValue={''}
                        rules={[{ required: false, message: 'Missing name' }]}
                      >
                        <Input
                          placeholder="Enter Name"
                          className="input-style mt-3"
                        />
                      </Form.Item>
                    </Col>
                    <Col xxl={7} xl={7} lg={7} md={12} xs={24}>
                      <Form.Item
                        {...restField}
                        name={[name, 'relationship']}
                        label="Relationship"
                        rules={[{ required: false, message: 'Missing relationship' }]}
                      >
                        <Select
                          placeholder='Select'
                          className="w-full mt-3 input-style"
                          options={[
                            { label: 'Spouse', value: 'Spouse' },
                            { label: 'Child', value: 'Child' }
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col xxl={7} xl={7} lg={7} md={12} xs={24}>
                      <Form.Item
                        {...restField}
                        name={[name, 'DOB']}
                        label="Date of Birth"
                        className=""
                        rules={[{ required: false, message: 'Missing Date of birth' }]}
                      >
                        <DatePicker
                          disabledDate={disabledDate}
                          className="mt-3"
                          popupClassName={`common-datepicker-popup-wrapper`}
                          suffixIcon={<img src={CalendarIcon} alt="icon" />}
                        />
                      </Form.Item>
                    </Col>
                    <Col xxl={7} xl={3} lg={7} md={12} xs={24} className="flex items-center">
                      {fields.length - 1 == name ? (
                        <Button
                          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 'unset' }}
                          onClick={() => add()}
                          className="teriary-bg-color mt-3"
                          icon={<PlusCircleFilled className="text-white" />}
                        />
                      ) : (
                        <Button
                          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 'unset' }}
                          onClick={() => remove(name)}
                          className="red-graph-tooltip-bg mt-3"
                          icon={<DeleteFilled className="text-white" />}
                        />
                      )}
                    </Col>
                  </Row>
                )
              })}
            </>
          )
        }}
      </Form.List>
    </>

  )
}


export default Dependents