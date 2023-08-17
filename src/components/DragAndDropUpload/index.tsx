import { useRef, useState } from "react";
import { DocumentUpload } from "../../assets/images";
import SelectedUploadCard from "../SelectedUploadCard";
import "./style.scss";

interface DraggerProps {
  setFiles: any;
  files: any;
  handleUploadFile: any;
  placeholder?: string;
  isMultiple?: boolean;
  acceptExt?: string[];
  maxFileSize?: number;
}

export const DragAndDropUpload = (props: DraggerProps) => {
  const inputRef: any = useRef();
  let [fileSizeExceeded, setFileSizeExceeded] = useState(false);
  const { 
    files,
    setFiles,
    isMultiple,
    handleUploadFile,
    maxFileSize = 12,
    acceptExt=['PDF', 'JPEG', 'doc'], 
    placeholder="Support jpeg, pdf, and doc files",
  } = props;
  const FileFormat: any = {
    'pdf': "application/pdf", 
    'PDF': "application/pdf",
    'doc': "application/msword",
    'DOC': "application/msword",
    'jpg': "image/jpg",
    'JPG': "image/jpg",
    'jpeg': "image/jpeg",
    'JPEG': "image/jpeg",
    'png': "image/png",
    'PNG': "image/png",
  };

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

  const getFileFormats = () => {
    const allowedExtensions: any = [];

    acceptExt.forEach((ext: string) => {
      if (FileFormat.hasOwnProperty(ext)) {
        allowedExtensions.push(FileFormat[ext]);
      }
    });

    return allowedExtensions.join(',');
  }

  const handleChange = (event: any) => {
    const { files } = event.target;

    if (files && files.length > 0) {
      const requiredSize = maxFileSize * 1024 * 1024;
      const fileSize = files[0].size;

      if (fileSize > requiredSize) {
        setFileSizeExceeded(true);
        setFiles(null);
      } else {
        setFileSizeExceeded(false);
        setFiles(event.target.files["0"]);
        handleUploadFile(event.target.files["0"]);
      }
    }
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
              className="red-graph-tooltip-color cursor-pointer mx-1"
              onClick={() => {
                inputRef.current.click();
              }}
            >
              Browse
            </span>
          </p>
          <p className="text-sm text-center font-normal text-success-placeholder-color">{placeholder}</p>
          <input
            value={""}
            type="file"
            ref={inputRef}
            accept={getFileFormats()}
            className="hidden-input"
            multiple={isMultiple}
            onChange={handleChange}
          />
        </div>
      </div>

      {
        fileSizeExceeded && <p className="secondary-color ">File size must be less than 12 MB</p>
      }

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
