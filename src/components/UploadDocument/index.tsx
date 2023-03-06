import React, { useState } from 'react'
import { DocumentUpload } from '../../assets/images'

const UploadDocument = () => {
  const [files, setFiles] = useState([])
  const handleDragOver = (event: any) => {
    event.preventDefault()
    console.log("drag over")
  }

  const handleDropped = (event: any) => {
    event.preventDefault()

    setFiles(Array.from(event.dataTransfer.files))

  }
  console.log(files)
  return (
    <>
      {
        !files ?

          <div
            onDragOver={handleDragOver}
            onDrop={handleDropped}
            className="flex flex-col content-center items-center p-16 rounded border-dashed border-0.5 border-[#D9DBE9] bg-[#fff] hover:border-[#DDE2E5]"
          >
            <DocumentUpload />
            <p>Drag & Drop files or <span className="text-[red]">Browse</span></p>
            <p className="text-sm">Supported jpeg, pdf oc doc files</p>
          </div>
          :
          <>
            <div
              onDragOver={handleDragOver}
              onDrop={handleDropped}
              className="flex flex-col content-center items-center p-16 rounded border-dashed border-0.5 border-[#D9DBE9] bg-[#fff] hover:border-[#DDE2E5]"
            >
              <DocumentUpload />
              <p>Drag & Drop files or <span className="text-[red]">Browse</span></p>
              <p className="text-sm">Supported jpeg, pdf oc doc files</p>
            </div>
            <p>{
              files.map((item: any, idx: any) => {
                return (<p key={idx}>{item.name}</p>)
              })
            }</p>

          </>

      }
    </>
  )
}

export default UploadDocument
