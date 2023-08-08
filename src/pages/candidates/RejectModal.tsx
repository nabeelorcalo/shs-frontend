import { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import { Notifications, RejectModalComp } from "../../components";

export const RejectModal = (props: any) => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
  const { open, setOpen, handleReject, handleRejectCandidate, getTemplates, templateList, selectedCandidate } = props;
  const [value, setValue] = useState();
  const [formValues, setValueFormValues] = useState({ subject: "", description: "" });

  useEffect(() => {
    if (shouldLoogged.current) {
      shouldLoogged.current = false;
      getTemplates("rejectionLetter");
    }
  }, []);

  const handleSelectTemplate = (value: number | string) => {
    let selectedTemplate = templateList?.find(({ id }: { id: string }) => id === value);
    setValue(selectedTemplate?.name);
    setValueFormValues({ subject: selectedTemplate?.subject, description: selectedTemplate?.description });
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

  const onCancel = () => {
    setValueFormValues({ subject: "", description: "" });
    setOpen(false);
  };

  return (
    <div className="Modal">
      <RejectModalComp
        open={open}
        setOpen={setOpen}
        onCancel={onCancel}
        handleSubmit={handleSubmit}
        value={value}
        handleSelectTemplate={handleSelectTemplate}
        templateList={templateList}
        formValues={formValues}
        setValueFormValues={setValueFormValues}
        // isSubject={isSubject}
        // isSubjectTouched={isSubjectTouched}
      />
    </div>
  );
};
