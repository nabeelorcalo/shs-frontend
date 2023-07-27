import { useEffect, useRef, useState } from "react";
import { Input, Modal, Select, Form } from "antd";
import { CloseCircleIcon } from "../../assets/images";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../config/validationMessages";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { textEditorData } from "../Setting/Common/TextEditsdata";
import { Notifications } from "..";
export const RejectModal = (props: any) => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
  const isDescription = useRef(false);
  const isDescriptionTouched = useRef(false);
  const isSubject = useRef(false);
  const isSubjectTouched = useRef(false);
  const { open, setOpen, handleReject, handleRejectCandidate, getTemplates, templateList, selectedCandidate } = props;
  const [value, setValue] = useState();
  const [isIntial, setIsIntial] = useState(false);
  const [formValues, setValueFormValues] = useState({ subject: "", description: "" });

  useEffect(() => {
    if (shouldLoogged.current) {
      shouldLoogged.current = false;
      getTemplates("rejectionLetter");
    }
  }, []);
  // error message check update by selecting template
  formValues.description?.length > 0 && (isDescription.current = true);
  formValues.subject?.length > 0 && (isSubject.current = true);

  const handleSelectTemplate = (value: number | string) => {
    let selectedTemplate = templateList?.find(({ id }: { id: string }) => id === value);
    setValue(selectedTemplate?.name);
    setValueFormValues({ subject: selectedTemplate?.subject, description: selectedTemplate?.description });
  };

  const onChangeHandler = (e: any) => {
    setValueFormValues({ ...formValues, description: e });
    formValues?.description?.length > 0 ? (isDescription.current = true) : (isDescription.current = false);
  };

  const handleSubmit = () => {
    if (formValues?.subject && formValues?.description && selectedCandidate?.id) {
      handleRejectCandidate(selectedCandidate?.id, {
        email: selectedCandidate?.userDetail?.email,
        subject: formValues?.subject,
        reason: formValues?.description,
      });
      setOpen(false);
      handleReject();
    } else Notifications({ title: "Validation Error", description: "Subject & reason required", type: "error" });
  };
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

  const onCancel = () => {
    setValueFormValues({ subject: "", description: "" });
    setOpen(false);
  };

  return (
    <div className="Modal">
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
    </div>
  );
};
