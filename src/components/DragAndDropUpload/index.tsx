import { useRef, useState } from "react";
import { DocumentUpload } from "../../assets/images";
import customHook from "../../pages/caseStudies/actionHandler";
import "./style.scss";
import SelectedUploadCard from "../SelectedUploadCard";

export const DragAndDropUpload = () => {
  const { handleUploadFile, HandleCleare } = customHook();
  const [files, setFiles] = useState<any>();
  const inputRef: any = useRef();

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  console.log(files, "files");
  console.log(inputRef, "inputRef");

  const handleDropped = (event: any) => {
    event.preventDefault();
    // console.log(event);
    // console.log(event.dataTransfer.files["0"]);
    // console.log(event);
    setFiles(event.dataTransfer.files["0"]);
    // setFiles(event.target.files["0"]);
    handleUploadFile(event.target.files["0"]);
  };

  const handleRemoveSelectedFile = () => {
    // console.log("dfs");
    // inputRef.current = undefined;
    setFiles(undefined);
  };

  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDropped}
        className="flex flex-col  justify-center gap-4 content-center items-center  drag-drop-upload-style text-input-bg-color py-16"
      >
        <div className="self-center ">
          <DocumentUpload />
        </div>
        <div className="self-center">
          <p className="text-center text-lg font-medium dashboard-primary-color">
            Drag & Drop files or{" "}
            <span
              className="red-graph-tooltip-color cursor-pointer"
              onClick={(e) => {
                inputRef.current.click();
                // handleDropped(e)
                // console.log(e);
              }}
            >
              Browse
            </span>
          </p>
          <p className="text-sm text-center font-normal text-success-placeholder-color">
            Support jpeg,pdf and doc files
          </p>
          <input
            id="inputRef"
            type="file"
            accept="image/*"
            ref={inputRef}
            // onInput={(e) => {
            //   console.log(e, "sf");
            // }}
            // onClick={(e) => console.log(e, "eeeeeeeee")}
            multiple
            hidden
            onChange={(event: any) => {
              // console.log(event);
              setFiles(event.target.files["0"]);
              handleUploadFile(event.target.files["0"]);
            }}
          />
        </div>
      </div>
      {files ? (
        <div className="flex flex-row flex-wrap">
          {
            <SelectedUploadCard
              filename={files?.name}
              filesize={Math.round(files?.size / 1024)}
              handleRemoveSelectedFile={handleRemoveSelectedFile}
            />
          }
        </div>
      ) : null}
    </>
  );
};

export default DragAndDropUpload;
