import React, { useRef, useState } from "react";
import "./style.scss";
import { DocumentUpload } from "../../../assets/images";
import SelectedUploadCard from "../../../components/SelectedUploadCard";

export const DragAndDropUpload = (props: any) => {
  const { files, setFiles } = props;
  const inputRef: any = useRef();
  const handleDragOver = (event: any) => {
    event.preventDefault();
  };
  const handleDropped = (event: any) => {
    event.preventDefault();
    setFiles(Array.from(event.dataTransfer.files));
  };
  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDropped}
        className="flex justify-between items-center px-4 py-4 rounded border-dashed border-2 border-[#dfe7f1] bg-[#E6F4F9] hover:border-[#d8e0eb]"
      >
        <div>
          <p>
            Drag & Drop files or{" "}
            <span
              className="text-[red] cursor-pointer"
              onClick={() => {
                inputRef.current.click();
              }}
            >
              Browse
            </span>
          </p>
          <p className="text-sm">Supported jpeg, pdf oc doc files</p>
          <input
            className="hiddenInput"
            hidden
            multiple
            type="file"
            ref={inputRef}
            onChange={(event: any) => {
              setFiles(Array.from(event.target.files));
            }}
          />
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
                  filesize={Math.ceil(item.size / (1024 * 1024))}
                  idx={idx}
                  handleRemoveSelectedFile={() => setFiles({ ...files, files: [] })}
                />
              );
            })}
        </div>
      ) : null}
    </>
  );
};

export default DragAndDropUpload;
