import { useEffect, useState } from "react";
import { Input, Modal, Select, Form } from "antd";
import "./style.scss";
import { CloseCircleIcon } from "../../assets/images";
import actionHandler from "./actionHandler";
const RejectModal = (props: any) => {
  const { open, setOpen, handleReject } = props;
  const [value, setValue] = useState();
  const [formValues, setValueFormValues] = useState({ subject: "", description: "" });
  const { getTemplates, templateList } = actionHandler();

  useEffect(() => {
    getTemplates("rejectionLetter");
  }, []);
  const handleSelectTemplate = (value: number | string) => {
    let selectedTemplate = templateList?.find(({ id }: { id: string }) => id === value);
    setValue(selectedTemplate?.name);
    setValueFormValues({ subject: selectedTemplate?.subject, description: selectedTemplate?.description });
  };
  const handleSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <div className="Modal">
      <Modal
        closeIcon={<img src={CloseCircleIcon} />}
        title="Reject"
        open={open}
        onCancel={() => setOpen(false)}
        footer={""}
      >
        <Form onFinish={handleSubmit}>
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
            <p>Subject</p>
          </div>
          <Input
            placeholder="Enter subject"
            value={formValues?.subject}
            onChange={(e) => setValueFormValues({ ...formValues, subject: e?.target?.value })}
          />
          <div className="title">
            <p>Reason</p>
          </div>
          <Input.TextArea
            placeholder="Write your reason"
            rows={5}
            value={formValues?.description}
            onChange={(e) => setValueFormValues({ ...formValues, description: e?.target?.value })}
          />
          <div className="flex mt-3 justify-end gap-4">
            <button onClick={() => setOpen(false)} className="cancel">
              Cancel
            </button>
            <button onClick={handleReject} className="reject">
              Reject
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
export default RejectModal;
