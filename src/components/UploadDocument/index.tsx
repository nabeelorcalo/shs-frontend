import React, { useState, useRef } from 'react'
import { DocumentUpload } from '../../assets/images'
import SelectedUploadCard from '../SelectedUploadCard'
const UploadDocument = () => {
  const [files, setFiles] = useState([])
  const BrowseRef = useRef();

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
      <div
        onDragOver={handleDragOver}
        onDrop={handleDropped}
        className="flex flex-col content-center items-center p-16 rounded border-dashed border-0.5 border-[#D9DBE9] bg-[#fff] hover:border-[#DDE2E5]"
      >
        <DocumentUpload width="32px" />
        <input
          type='file'
          multiple
          onChange={(event) => { setFiles(Array.from(event.target.files)) }}
          hidden
          ref={BrowseRef}
        />
        <p>Drag & Drop files or <a className="text-[red]" onClick={() => { BrowseRef.current.click(); console.log("clicked") }}>Browse</a></p>
        <p className="text-sm">Supported jpeg, pdf oc doc files</p>
      </div>
      <div className='flex py-1 flex-wrap '>{
        files?
        files.map((item: any, idx: any) => {
          return (

            <SelectedUploadCard filename={item.name} filesize={Math.round(item.size / 1024) + " MB"} />
          )
        }) : null
      }</div>
    </>
  )
}

export default UploadDocument
