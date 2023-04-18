import React, { useState, useRef, useEffect } from 'react'
import { DocumentUpload } from '../../assets/images'
import SelectedUploadCard from '../SelectedUploadCard'
import './style.scss'

export const DragAndDropUpload = () => {
  const [files, setFiles] = useState([])
  const inputRef: any = useRef();
  const handleDragOver = (event: any) => {
    event.preventDefault()
    console.log("drag over")
  }
  const handleDropped = (event: any) => {
    event.preventDefault()
    setFiles(Array.from(event.dataTransfer.files))
    console.log("Dropped")
  }
  return (
    <>
      <div onDragOver={handleDragOver} onDrop={handleDropped}
        className="flex flex-col  justify-center gap-4 content-center items-center  drag-drop-upload-style">
        <div className='self-center '>
          <DocumentUpload />
        </div>
        <div className='self-center'>
          <p className='text-center text-lg'>Drag & Drop files or <span className="red-graph-tooltip-color cursor-pointer"
            onClick={() => { inputRef.current.click() }}>Browse</span></p>
          <p className="text-sm text-center">Supported jpeg, pdf oc doc files</p>
          <input type="file" ref={inputRef} multiple hidden
            onChange={(event: any) => { setFiles(Array.from(event.target.files)) }} />
        </div>
      </div>
      {
        files ?
          <div className='flex flex-row flex-wrap'>
            {
              files?.map((item: any, idx: any) => {
                return (
                  <SelectedUploadCard
                    key={idx}
                    filename={item.name}
                    filesize={Math.round(item.size / 1024)}
                    idx={idx}
                  />
                )
              })
            }
          </div>
          : null
      }
    </>
  )
}

export default DragAndDropUpload
