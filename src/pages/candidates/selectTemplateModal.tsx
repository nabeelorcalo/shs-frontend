import { useEffect, useState } from "react";
import { Modal, Select } from "antd";
import "./style.scss";
import { CloseCircleIcon } from "../../assets/images";
import actionHandler from "./actionHandler";

const SelectTemplateModal = (props: any) => {
  const { open, setOpen, handleTemplate, title, selecteTemplate, handleSelectTemplate } = props;
  const { getTemplates, templateList } = actionHandler();
  useEffect(() => {
    getTemplates(title.toLowerCase() === "contract" ? "contract" : "offerLetter");
  }, [title]);
  return (
    <div className="Modal">
      <Modal
        closeIcon={<img src={CloseCircleIcon} />}
        title={title}
        open={open}
        onCancel={() => setOpen(false)}
        footer={""}
      >
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
          <button onClick={() => setOpen(false)} className="reqCancelBtn">
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
