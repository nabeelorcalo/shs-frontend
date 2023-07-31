import { Form, Input, Modal, Select } from "antd";
import ReactQuill from "react-quill";
import { CloseCircleIcon } from "../../assets/images";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../config/validationMessages";
import { useRef, useState } from "react";
import { textEditorData } from "../Setting/Common/TextEditsdata";

export const RejectModalComp = (props: any) => {
  const {
    open,
    setOpen,
    onCancel,
    handleSubmit,
    value,
    handleSelectTemplate,
    templateList,
    formValues,
    setValueFormValues,
    // isSubject,
  } = props;

  const isDescription = useRef(false);
  const isDescriptionTouched = useRef(false);
  const isSubject = useRef(false);
  const isSubjectTouched = useRef(false);
  const [isIntial, setIsIntial] = useState(false);

  const onChangeHandler = (e: any) => {
    setValueFormValues({ ...formValues, description: e });
    formValues?.description?.length > 0 ? (isDescription.current = true) : (isDescription.current = false);
  };

  // error message check update by selecting template
  formValues.description?.length > 0 && (isDescription.current = true);
  formValues.subject?.length > 0 && (isSubject.current = true);

  const handleOpen = () => {
    setIsIntial(!isIntial);
    isDescriptionTouched.current = true;
    isSubjectTouched.current = true;
    if (formValues?.description?.length > 0) {
      isDescription.current = true;
    } else {
      isDescription.current = false;
    }
    if (formValues?.subject?.length > 0) {
      isSubject.current = true;
    } else {
      isSubject.current = false;
    }
  };

  return (
    <Modal closeIcon={<img src={CloseCircleIcon} />} title="Reject" open={open} onCancel={onCancel} footer={""}>
      <Form validateMessages={DEFAULT_VALIDATIONS_MESSAGES} onFinish={handleSubmit}>
        <div className="title">
          <p>Template (optional)</p>
        </div>
        <Select
          value={value}
          placeholder="Select"
          className="internship-filter w-full "
          onChange={handleSelectTemplate}
          options={templateList?.map((item: any) => ({ value: item?.id, label: item?.name }))}
        />
        <div className="title">
          <p className="required">Subject</p>
        </div>
        <Form.Item name={"subject"}>
          <Input
            name="subject"
            placeholder="Enter subject"
            value={formValues?.subject}
            onChange={(e) => setValueFormValues({ ...formValues, subject: e?.target?.value })}
          />
          {!isSubject.current && isSubjectTouched.current && (
            <p className="text-sm text-error-color absolute">Required Field</p>
          )}
        </Form.Item>
        <div className="title">
          <p className="required">Reason</p>
        </div>
        <Form.Item className="reject-modal-description" name={"description"}>
          <div className="text-input-bg-color rounded-lg text-editor">
            <ReactQuill
              theme="snow"
              value={formValues?.description}
              onChange={onChangeHandler}
              modules={textEditorData}
            />
          </div>
          {!isDescription.current && isDescriptionTouched.current && (
            <p className="text-sm text-error-color absolute">Required Field</p>
          )}
        </Form.Item>
        <div className="flex mt-3 justify-end gap-4">
          <button onClick={onCancel} className="cancel cursor-pointer">
            Cancel
          </button>
          <button onClick={handleOpen} className="reject cursor-pointer">
            Reject
          </button>
        </div>
      </Form>
    </Modal>
  );
};
