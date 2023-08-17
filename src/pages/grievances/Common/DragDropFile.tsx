import React, { useRef, useState } from "react";
import "./style.scss";
import { DocumentUpload } from "../../../assets/images";
import SelectedUploadCard from "../../../components/SelectedUploadCard";

export const DragAndDropUpload = (props: any) => {
  const { files, setFiles, form } = props;
  const inputRef: any = useRef();
  const handleDragOver = (event: any) => {
    event.preventDefault();
  };
  const handleDropped = (event: any) => {
    event.preventDefault();
    if (form) {
      form.setFieldValue("mySelect", Array.from(event.dataTransfer.files));
      form.validateFields(["mySelect"]);
    }
    setFiles(Array.from(event.dataTransfer.files));
  };
  const handleChange = (event: any) => {
    if (form) {
      form.setFieldValue("mySelect", Array.from(event.target.files));
      form.validateFields(["mySelect"]);
    }
    setFiles(Array.from(event.target.files));
  };
  const handleFileRemove = () => {
    setFiles({ ...files, files: [] });
    if (form) {
      form.setFieldValue("mySelect", []);
      form.validateFields(["mySelect"]);
    }
  };
  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDropped}
        className="flex justify-between items-center px-4 py-4 rounded border-dashed border-2 border-file-color background-file-color "
      >
        <div>
          <p>
            Drag & Drop files or{" "}
            <span
              className="text-red-color cursor-pointer"
              onClick={() => {
                inputRef.current.click();
              }}
            >
              Browse
            </span>
          </p>
          <p className="text-sm">Supported jpeg, pdf oc doc files</p>
          <input className="hiddenInput" hidden multiple type="file" ref={inputRef} onChange={handleChange} />
        </div>
        <div>
          <DocumentUpload />
        </div>
      </div>
      {files ? (
        <div className="flex flex-row flex-wrap">
          {files.length > 0 &&
            files?.map((item: any, idx: any) => {
              return (
                <SelectedUploadCard
                  key={idx}
                  filename={item.name}
                  filesize={Math.ceil(item.size)}
                  idx={idx}
                  handleRemoveSelectedFile={handleFileRemove}
                />
              );
            })}
        </div>
      ) : null}
    </>
  );
};

export default DragAndDropUpload;
