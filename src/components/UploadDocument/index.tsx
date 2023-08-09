import { useState, useRef } from "react";
import { DocumentUpload } from "../../assets/images";
import SelectedUploadCard from "../SelectedUploadCard";
import './style.scss'

const UploadDocument = (props: any) => {
  const { height = 80, handleDropped, setFiles, files } = props
  // const [files, setFiles] = useState([])
  const inputRef: any = useRef();
  const [file, setFile] = useState(null);

  const handleDragOver = (event: any) => {
    event.preventDefault()
    setFiles(files)
  }
  
  return (
    <>
      <div
        onDragOver={handleDragOver}
        className={`flex flex-col justify-center gap-4 content-center items-center drag-drop-upload-style h-${height}`}
      >
        <div className='self-center '>
          <DocumentUpload width={69} height={75} />
        </div>
        <div className='self-center'>
          <p
            className='text-center primary-color  text-xl font-medium'
          >
            Drag & drop files or
            <span
              className="text-xl font-medium secondary-color cursor-pointer pl-1"
              onClick={() => { inputRef.current.click() }}
            >
              Browse
            </span>
          </p>
          <p
            className="text-sm light-grey-color text-center"
          >
            Support jpeg, pdf and doc files
          </p>
          <input
            type="file"
            ref={inputRef}
            multiple
            hidden
            onChange={(event: any) => { setFiles({ ...files, files: Array.from(event.target.files) }) }}
          />
        </div>
      </div>
      {
        files?.files ?
          <div className='flex flex-row max-w-[520px] min-w-[300px] flex-wrap'>
            {
              files?.files?.map((item: any, idx: any) => {
                return (
                  <SelectedUploadCard
                    files={files}
                    setFiles={setFiles}
                    key={idx}
                    filename={item.name}
                    filesize={Math.round(item.size / 1024)}
                    idx={idx}
                    handleRemoveSelectedFile={() => setFiles({ ...files, files: [] })}
                  />
                )
              })
            }
          </div>
          : null
      }
    </>
  );
};

export default UploadDocument;
