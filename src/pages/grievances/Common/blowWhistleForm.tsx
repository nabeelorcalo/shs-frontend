import React, { useState } from "react";
import { Select, Button, Form } from "antd";
import { Input } from "antd";
import { ArrowDownDark, UserAvatar } from "../../../assets/images";
import DragAndDropWide from "../../../components/DragAndDrop";
import { DropDown } from "../../../components";
import DropDownNew from "../../../components/Dropdown/DropDownNew";
import "./style.scss";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../config/validationMessages";
import DragAndDropUpload from "./DragDropFile";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const BlowWhistleForm = (props: any) => {
  const navigateFrom = useNavigate();
  const grievanceType = ["Work", "Personal", "Discipline", "Other"];
  // const detailsData = [
  //   {
  //     id: 1,
  //     userImg: UserAvatar,
  //     userName: "john doe",
  //   },
  //   { id: 2, userImg: UserAvatar, userName: "mina marino" },
  //   { id: 3, userImg: UserAvatar, userName: "clark" },
  //   { id: 4, userImg: UserAvatar, userName: "sarah joe" },
  // ];

  const [selectValue, setSelectValue] = useState({
    userImg: "",
    userName: "Select",
    grievanceType: "Select",
  });
  const [uploadFile, setUploadFile] = useState([]);
  const { setState, managers, createGrievance, navigate } = props;
  const [form] = Form.useForm();
  const handleSubmit = (values: any) => {
    const payload: any = {
      type: values?.grievanceType?.toUpperCase(),
      subject: values?.subject,
      description: values?.description,
      escalatedTo: values?.escalatedTo,
    };
    const formData = new FormData();
    formData.append("type", values?.grievanceType?.toUpperCase());
    formData.append("subject", values?.subject);
    formData.append("description", values?.description);
    formData.append("escalatedTo", values?.escalatedTo);
    if (uploadFile?.length) formData.append("media", uploadFile[0]);
    createGrievance(formData, () => {
      setState(false);
      if (navigate) {
        navigateFrom(`${ROUTES_CONSTANTS.ALL_GRIEVANCES}`);
      }
    });
  };

  return (
    <div className="blow-Whistle-Form">
      <Form layout="vertical" form={form} onFinish={handleSubmit} validateMessages={DEFAULT_VALIDATIONS_MESSAGES}>
        <Form.Item name="grievanceType" label="Grievance Type" rules={[{ required: true }]}>
          <DropDown
            name={selectValue.grievanceType}
            value={selectValue.grievanceType}
            options={grievanceType.map((item: any) => {
              return item;
            })}
            setValue={(e: string) => {
              setSelectValue({ ...selectValue, grievanceType: e });
              form.setFieldValue("grievanceType", e);
            }}
          />
        </Form.Item>
        <Form.Item name="subject" label="Subject" rules={[{ required: true }]}>
          <Input placeholder="Enter subject" />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[{ required: true }]}>
          <TextArea
            rows={6}
            placeholder="Describe your problem"
            // maxLength={6}
            id="description"
            name="description"
            size="small"
            defaultValue=""
          />
        </Form.Item>
        <Form.Item name="escalatedTo" label="Escalate To" rules={[{ required: true }]}>
          <div className="asignee-wrap w-[100%]">
            <DropDownNew
              placement={"bottomRight"}
              items={[
                {
                  label: (
                    <div>
                      {managers &&
                        managers.map((item: any) => (
                          <div
                            className="flex items-center gap-3 mb-[20px]"
                            onClick={() => {
                              setSelectValue({
                                ...selectValue,
                                userName: item?.companyManager?.firstName + " " + item?.companyManager?.lastName,
                                userImg: UserAvatar,
                              });
                              form.setFieldValue("escalatedTo", item?.managerId);
                            }}
                          >
                            <img src={UserAvatar} className="h-[24px] w-[24px] rounded-full object-cover" />
                            <p>{item?.companyManager?.firstName + " " + item?.companyManager?.lastName}</p>
                          </div>
                        ))}
                    </div>
                  ),
                  key: "users",
                },
              ]}
            >
              <div className="drop-down-with-imgs flex items-center gap-3">
                <div className="flex items-center gap-3 mr-[40px]">
                  {selectValue.userImg != "" && <img src={selectValue.userImg} />}
                  <p>{selectValue.userName}</p>
                </div>
                <ArrowDownDark />
              </div>
            </DropDownNew>
          </div>
        </Form.Item>
        <Form.Item name="mySelect" label="Attachment (Option)" rules={[{ required: false }]}>
          <DragAndDropUpload files={uploadFile} setFiles={setUploadFile} />
        </Form.Item>
        <div className="blow-whistle-footer flex justify-end mt-4 gap-2">
          <Button
            key="Cancel"
            className="footer-cancel-btn "
            onClick={() => {
              setState(false);
            }}
          >
            Cancel
          </Button>
          <Button htmlType="submit" className="footer-submit-btn">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BlowWhistleForm;
