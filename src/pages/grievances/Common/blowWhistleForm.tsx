import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Select, Button, Form, Avatar } from "antd";
import { Input } from "antd";
import { ArrowDownDark, UserAvatar } from "../../../assets/images";
import DragAndDropWide from "../../../components/DragAndDrop";
import { DropDown } from "../../../components";
import DropDownNew from "../../../components/Dropdown/DropDownNew";
import "./style.scss";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../config/validationMessages";
import DragAndDropUpload from "./DragDropFile";
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const BlowWhistleForm = forwardRef((props: any, ref: any) => {
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
  const [uploadFile, setUploadFile] = useState<any>([]);
  const { setState, managers, createGrievance, navigate, fetchGrievanceList } = props;

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
      if (fetchGrievanceList) fetchGrievanceList();
    });
    form.resetFields();
    setSelectValue({ userImg: "", userName: "Select", grievanceType: "Select" });
    setUploadFile([]);
  };
  const handleCancel = () => {
    setState(false);
    form.resetFields();
    setSelectValue({ userImg: "", userName: "Select", grievanceType: "Select" });
    setUploadFile([]);
  };

  useImperativeHandle(ref, () => ({
    handleCancel: handleCancel,
  }));

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
                    <div className="max-h-96 overflow-y-auto">
                      {managers &&
                        managers.map((item: any) => (
                          <div
                            className="flex items-center gap-3 mb-[20px]"
                            onClick={() => {
                              setSelectValue({
                                ...selectValue,
                                userName: item?.companyManager?.firstName + " " + item?.companyManager?.lastName,
                                userImg: item?.companyManager?.profileImage
                                  ? `${constants.MEDIA_URL}/${item?.companyManager?.profileImage?.mediaId}.${item?.companyManager?.profileImage?.metaData?.extension}`
                                  : UserAvatar,
                              });
                              form.setFieldValue("escalatedTo", item?.managerId);
                            }}
                          >
                            {/* <img
                              src={
                                item?.companyManager?.profileImage
                                  ? `${constants.MEDIA_URL}/${item?.companyManager?.profileImage?.mediaId}.${item?.companyManager?.profileImage?.metaData?.extension}`
                                  : UserAvatar
                              }
                              className="h-[24px] w-[24px] rounded-full object-cover"
                            /> */}
                            <Avatar
                              size={30}
                              src={`${constants.MEDIA_URL}/${item?.companyManager?.profileImage?.mediaId}.${item?.companyManager?.profileImage?.metaData?.extension}`}
                            >
                              {item?.companyManager?.firstName?.charAt(0)}
                              {item?.companyManager?.lastName?.charAt(0)}
                            </Avatar>
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
                  {selectValue.userImg != "" && <img src={selectValue.userImg} className="h-[24px] w-[24px] rounded-full object-cover" />}
                  <p>{selectValue.userName}</p>
                </div>
                <ArrowDownDark />
              </div>
            </DropDownNew>
          </div>
        </Form.Item>
        <Form.Item
          name="mySelect"
          label="Attachment (Option)"
          rules={[
            {
              required: false,
            },
            () => ({
              validator: (_, value) => {
                if (value && value.length > 0 && value[0]?.size > 12 * 1024 * 1024) {
                  return Promise.reject("File size must be less than 12 MB");
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <DragAndDropUpload files={uploadFile} setFiles={setUploadFile} form={form} />
        </Form.Item>
        <div className="blow-whistle-footer flex justify-end mt-4 gap-2">
          <Button key="Cancel" className="footer-cancel-btn " onClick={handleCancel}>
            Cancel
          </Button>
          <Button htmlType="submit" className="footer-submit-btn">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
});

export default BlowWhistleForm;
