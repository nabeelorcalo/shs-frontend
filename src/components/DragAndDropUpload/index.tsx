import React, { useState, useRef, useEffect } from 'react'
import { DocumentUpload } from '../../assets/images'
import SelectedUploadCard from '../SelectedUploadCard'

const DragAndDropUpload = () => {
    const [files, setFiles] = useState([])
    const inputRef = useRef();
    const handleDragOver = (event: any) => {
        event.preventDefault()
        console.log("drag over")
    }
    const handleDropped = (event: any) => {
        event.preventDefault()
        setFiles(Array.from(event.dataTransfer.files))
        console.log("Dropped")
    }
    const handleDelete = (idx: any) => {
        console.log(idx + " Deleted")
        files.splice(idx, 1)
        setFiles(files)
        console.log(files)
    }
    return (
        <>
            <div onDragOver={handleDragOver} onDrop={handleDropped} className="flex flex-col gap-4 content-center items-center p-16 rounded border-dashed border-2 border-[#D9DBE9] bg-[#E6F4F9] hover:border-[#DDE2E5]">
                <DocumentUpload width="96px" />
                <div>
                    <p>Drag & Drop files or <span className="text-[red]" onClick={() => { inputRef.current.click() }}>Browse</span></p>
                    <p className="text-sm">Supported jpeg, pdf oc doc files</p>
                    <input type="file" ref={inputRef} multiple hidden onChange={(event) => { setFiles([...event.target.files]) }} />
                </div>
            </div>
            {
                files ?
                    <div className='flex flex-row flex-wrap'>
                        {
                            files?.map((item, idx) => {
                                return (
                                    <SelectedUploadCard
                                        key={idx}
                                        filename={item.name}
                                        filesize={Math.round(item.size / 1024)}
                                        idx={idx}
                                        handleDelete={handleDelete} />
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
