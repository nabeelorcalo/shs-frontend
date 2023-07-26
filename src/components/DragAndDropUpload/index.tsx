import { useRef } from "react";
import { DocumentUpload } from "../../assets/images";
import SelectedUploadCard from "../SelectedUploadCard";
import "./style.scss";

export const DragAndDropUpload = (props: any) => {
  const { setFiles, files, handleUploadFile } = props;
  const inputRef: any = useRef();

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const handleDropped = (event: any) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files["0"]);
    handleUploadFile(event.target.files["0"]);
  };

  const handleRemoveSelectedFile = () => {
    setFiles(null);
  };

  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDropped}
        className="flex flex-col  justify-center gap-4 content-center items-center  
        drag-drop-upload-style text-input-bg-color py-16"
      >
        <div className="self-center ">
          <DocumentUpload height={90} width={90} />
        </div>
        <div className="self-center">
          <p className="text-center text-lg font-medium dashboard-primary-color">
            Drag & Drop files or
            <span
              className="red-graph-tooltip-color cursor-pointer"
              onClick={() => {
                inputRef.current.click();
              }}
            >
              Browse
            </span>
          </p>
          <p className="text-sm text-center font-normal text-success-placeholder-color">Support JPEG and PNG images</p>
          <input
            type="file"
            ref={inputRef}
            accept="image/jpeg,image/png"
            multiple
            hidden
            onChange={(event: any) => {
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
              filesize={Math.round(files?.size)}
              handleRemoveSelectedFile={handleRemoveSelectedFile}
            />
          }
        </div>
      ) : null}
    </>
  );
};

export default DragAndDropUpload;
