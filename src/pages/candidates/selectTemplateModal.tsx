import { useEffect, useRef, useState } from "react";
import { Modal, Select } from "antd";
import "./style.scss";
import { CloseCircleIcon } from "../../assets/images";
import actionHandler from "./actionHandler";

const SelectTemplateModal = (props: any) => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
  const { open, setOpen, handleTemplate, title, selecteTemplate, setSelecteTemplate, setTemplateValues } = props;
  const { getTemplates, templateList } = actionHandler();

  useEffect(() => {
    if (shouldLoogged.current) {
      shouldLoogged.current = false;
      getTemplates(title.toLowerCase() === "contract" ? "contract" : "offerLetter");
    }
  }, [title]);

  const handleSelectTemplate = (value: number | string) => {
    let selectedTemplate = templateList?.find(({ id }: { id: string }) => id === value);
    setSelecteTemplate(selectedTemplate?.name);
    console.log("selectedTemplate", selectedTemplate);

    setTemplateValues({
      subject: selectedTemplate?.subject,
      content: selectedTemplate?.description,
      templateId: selectedTemplate?.id,
      type: ((selectedTemplate?.type === "contract") ? "CONTRACT" : "OFFER_LETTER"),
    });
  };
  const onCancel = () => {
    setOpen(false);
    setSelecteTemplate(undefined);
  };
  console.log("selecteTemplate", selecteTemplate);

  return (
    <div className="Modal">
      <Modal closeIcon={<img src={CloseCircleIcon} />} title={title.toLowerCase() === `contract` ? `Contract` : "Offer Letter"} open={open} onCancel={onCancel} footer={""}>
        <div className="title">
          <p>Template </p>
        </div>
        <Select
          value={selecteTemplate}
          placeholder="Select"
          className="internship-filter w-full "
          onChange={handleSelectTemplate}
          options={templateList?.map((item: any) => ({ value: item?.id, label: item?.name }))}
        />
        <div className="flex mt-7 justify-end gap-4">
          <button onClick={onCancel} className="reqCancelBtn">
            Cancel
          </button>
          <button onClick={handleTemplate} className="reqSubmitBtn">
            Continue
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SelectTemplateModal;
