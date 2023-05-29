import { useEffect, useState } from "react";
import { Typography, Row, Col, Form, Input, Button } from "antd";
import { GlassMagnifier, SettingTimesheetIcon, } from "../../../../assets/images";
import { Alert } from "../../../../components";
import DropDownForSetting from "../../../../components/Setting/Common/CustomSettingDropdown";
import { PopUpModal } from "../../../../components/Model";
import useTimesheetCustomHook from "./actionHandler";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../config/validationMessages";
import "./style.scss";

const { TextArea } = Input;
const { Text } = Typography;

const SettingTimesheet = () => {
  const [form] = Form.useForm();
  const [searchValue, setSearchValue] = useState();
  const [editData, setEditData] = useState<any>({});
  const [state, setState] = useState<any>(
    {
      isDeleteModal: false,
      isEditModal: false,
      id: null,
    }
  )

  const { getTimeSheetsData, timeSheetData,
    debouncedSearch, postTimeSheetData,
    deleteTimeSheet, editTimeSheets } = useTimesheetCustomHook();

  useEffect(() => {
    getTimeSheetsData(searchValue)
  }, [searchValue])

  const close = () => {
    setState({ ...state, isEditModal: false });
  };

  // handle search timesheets 
  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };

  //  handle timeSheet form data 
  const handleFinish = (values: any) => {
    postTimeSheetData(values);
    setState({ ...state, isEditModal: false });
    form.resetFields();
    // if (editData.id !== null) {
    //   editTimeSheets(editData.id, values);
    //   setState({ ...state, isEditModal: false });
    // }
    // else {
    //   postTimeSheetData(values);
    //   setState({ ...state, isEditModal: false });
    //   form.resetFields();
    // }
  }

  // get form initial vlaues 
  const initialValues = {
    categoryName: editData?.name,
    description: editData?.description,
  }

  return (
    <div className="setting-time-sheet">
      <div className="flex justify-between location-header">
        <div className="input-wrapper">
          <Input className='search-bar' placeholder="Search"
            onChange={debouncedResults} prefix={<GlassMagnifier />} />
        </div>
        <Button
          size="middle"
          onClick={() => { setState({ ...state, isEditModal: !state.isEditModal }) }}
          className="flex gap-2 setting-add-button white-color teriary-bg-color"
        >
          <SettingTimesheetIcon /> Add Category
        </Button>
      </div>
      <Row gutter={[20, 20]} className="mt-5">
        {timeSheetData?.map((data: any, index: any) => {
          return (
            <Col key={index} className="gutter-row flex" xs={24} lg={12} xl={8}>
              <div className="w-full setting-time-sheet-box-wrapper">
                <div className="flex">
                  <div className="flex px-3 justify-between mt-2 w-full">
                    <div className="flex flex-col">
                      <Text className="text-sm font-normal md:text-lg md:font-semibold text-primary-color ">
                        {data?.name}
                      </Text>
                      <Text className="text-sm py-2 text-secondary-color ">
                        {data?.description}
                      </Text>
                    </div>
                    <span className="float-right cursor-pointer w-[40px]">
                      <DropDownForSetting
                        SetEditData={setEditData}
                        state={state}
                        setState={setState}
                        editData={data}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>

      <PopUpModal
        open={state.isEditModal}
        title="Add Category"
        width={600}
        close={close}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleFinish}
          validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
          form={form}
          initialValues={initialValues}
        >
          <Form.Item
            name="categoryName"
            rules={[{ required: true }, { type: "string" }]}
            label="Category Name"
          >
            <Input placeholder="Add category" className="input-style" />
          </Form.Item>
          <div className="mt-3 flex flex-col">
            <Form.Item
              name='description'
              label=" Description"
              rules={[{ required: true }, { type: "string" }]}
            >
              <TextArea rows={6} placeholder="Describe Category" />
            </Form.Item>
          </div>
          <div className="timesheet-department-footer flex max-sm:flex-col gap-4 justify-end">
            <Button key="Cancel" className="footer-cancel-btn">
              Cancel
            </Button>
            <Button htmlType="submit" className="footer-submit-btn">
              Submit
            </Button>
          </div>
        </Form>
      </PopUpModal>

      <Alert
        cancelBtntxt="Cancel"
        okBtntxt="Delete"
        state={state.isDeleteModal}
        setState={setState}
        type="error"
        width={500}
        okBtnFunc={() => deleteTimeSheet(state.id)}
        children={<p>Are you sure you want to delete this?</p>}
      />
    </div>
  );
};

export default SettingTimesheet;
