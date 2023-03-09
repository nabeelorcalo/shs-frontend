import React from 'react'
import { DocumentUpload } from '../../assets/images'
const AssesmentDragAndDrop = () => {
    return (
        <div className="flex flex-col content-center items-center p-16 rounded border-dashed border-0.5 border-[#D9DBE9] bg-[#E6F4F9] hover:border-[#DDE2E5]">
            <DocumentUpload width="96px" />
            <p>Drag & Drop files or <span className="text-[red]">Browse</span></p>
            <p className="text-sm">Supported jpeg, pdf oc doc files</p>
        </div>
    )
}

export default AssesmentDragAndDrop
