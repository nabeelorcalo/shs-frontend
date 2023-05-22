import React, { useEffect, useState } from "react";
import { DepartmentAddIcon } from "../../../../assets/images";
import { Col, Row, Typography, Button, Form } from "antd";
import { Input } from "antd";
import { Alert, SearchBar } from "../../../../components";
import DropDownForSetting from "../../../../components/Setting/Common/CustomSettingDropdown";
import { PopUpModal } from "../../../../components/Model";
import useCustomHook from "./actionHandler";
import { useRecoilState } from "recoil";
import { settingDepartmentState } from "../../../../store";
import "./style.scss";

const { TextArea } = Input;
const { Text } = Typography;
const demoData = [
  {
    name: "Finance",
    description: "The finance department is responsible for the financial planning and management of the company."
  },
  {
    name: "Human Resources",
    description: "The human resources department is responsible for a company's most important asset: its people."
  },
  {
    name: "Design",
    description: "Designers are responsible for the design and implementation of all the experiences."
  },
]
const SettingDepartment: React.FC = () => {
  const action = useCustomHook();
  const departmentData = useRecoilState<any>(settingDepartmentState)
  const [form] = Form.useForm();
  const [edit, setEdit] = useState<any>()
  const [state, setState] = useState<any>(
    {
      showEditModal: false,
      showDeleteModal: false,
      departmentId: "",
    }
  )

  const handleChange = (event: any) => {
    action.getSettingDepartment(1, event)
  };

  if (edit?.isEdit === "isEdit") {
    const formValues = { departmentName: edit?.name, description: edit?.description }
    form.setFieldsValue(formValues)
  }

  const onFinish = (values: any) => {
    console.log(values);

    if (edit?.isEdit === "isEdit") {

    }
    else {
      const { departmentName, description } = values
      action.postSettingDepartment({
        name: departmentName,
        description: description
      }).then(() => { action.getSettingDepartment(1, "") })
      form.resetFields()
      setState({ ...state, showEditModal: false })
    }
  };
  console.log("Edit", edit)

  const SetId = (id: any) => {
    setState({ ...state, showDeleteModal: !state.showDeleteModal, departmentId: id })
  }

  const SetEditData = (editdata: any) => {
    setEdit(editdata)
  }
  const DeleleHandler = () => {
    action.deleteSettingDepartment(state.departmentId)
  }

  const resetFormHandler = () => {
    setState({ ...state, showEditModal: false })
    form.resetFields()
    setEdit("")
  }

  useEffect(() => {
    action.getSettingDepartment(1, "")
  }, [])

  return (
    <div className="setting-department">
      <div className="flex justify-between location-header">
        <SearchBar size="middle" handleChange={handleChange} />
        <Button
          size="middle"
          onClick={() => { setState({ ...state, showEditModal: !state.showEditModal }); }}
          className="flex gap-2 setting-add-button white-color teriary-bg-color"
        >
          <DepartmentAddIcon /> Add Department
        </Button>
      </div>
      <Row gutter={[20, 20]} className="mt-5">
        {Array.isArray(departmentData[0]) && departmentData[0]?.map((data: any, index) => {
          return (
            <Col key={index} className="gutter-row" xs={24} xl={12} xxl={8}>
              <div className="department-box-wrapper">
                <div className="flex justify-between">
                  <div>
                    <Text className="text-lg font-semibold text-primary-color">
                      {data?.name}
                    </Text>
                  </div>
                  <div className="float-right cursor-pointer">
                    <DropDownForSetting
                      showEditModal={state.showEditModal}
                      showDeleteModal={state.showDeleteModal}
                      setShowDeleteModal={setState}
                      setShowEditModal={setState}
                      id={data?.id}
                      SetId={SetId}
                      editData={data}
                      SetEditData={SetEditData}
                    />
                  </div>
                </div>
                <Text className="text-sm font-normal text-secondary-color ">
                  {data?.description}
                </Text>
              </div>
            </Col>
          );
        })
        }
        {
          departmentData[0] && !Array.isArray(departmentData[0]) && <Col className="gutter-row" xs={24} xl={12} xxl={8}>
            <div className="department-box-wrapper">
              <div className="flex justify-between">
                <div>
                  <Text className="text-lg font-semibold text-primary-color">
                    {departmentData[0].name}
                  </Text>
                </div>
                <div className="float-right cursor-pointer w-[40px]">
                  <DropDownForSetting
                    showEditModal={state.showEditModal}
                    showDeleteModal={state.showDeleteModal}
                    setShowDeleteModal={setState}
                    setShowEditModal={setState}
                    id={departmentData[0]?.id}
                    SetId={SetId}
                    SetEditData={SetEditData}
                    state={state}
                  />
                </div>
              </div>
              <Text className="text-sm font-normal">
                {departmentData[0]?.description}
              </Text>
            </div>
          </Col>
        }
      </Row>
      <PopUpModal
        open={state.showEditModal}
        title="Department"
        width={600}
        close={() => setState({ ...state, showEditModal: false })}
        footer=""
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="Department Name"
            name="departmentName"
          >
            <Input
              className="input"
              id="departmentName"
              placeholder="Enter department name "
              size="middle"
              type="text"
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
          >
            <TextArea rows={6} placeholder="Write Something..."
              id="description"
              name="description"
              size="middle"
            />
          </Form.Item>
          <div className="setting-department-footer flex justify-end mt-4 gap-2">
            <Button key="Cancel" className="footer-cancel-btn "
              onClick={resetFormHandler}>
              Cancel
            </Button>
            <Button key="submit" className="footer-submit-btn" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </PopUpModal>
      <Alert
        cancelBtntxt="Cancel"
        okBtntxt="Delete"
        okBtnFunc={DeleleHandler}
        state={state.showDeleteModal}
        setState={setState}
        type="error"
        width={500}
        title=""
        children={<p>Are you sure you want to delete this?</p>}
      />
    </div>
  );
};

export default SettingDepartment;
