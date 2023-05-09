import { useState } from "react";
import { Modal } from "antd";
import { DropDown } from "../../components";
import "./style.scss";
import { CloseCircleIcon } from "../../assets/images";

const SelectTemplateModal = (props: any) => {
  const { open, setOpen, handleTemplate,title,options } = props;
  const [value, setValue] = useState("");

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
        <DropDown
          value={value}
          setValue={setValue}
          options={options}
          name="Select"
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
