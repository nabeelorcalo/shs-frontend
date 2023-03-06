import React from 'react'
import { DocumentUpload } from '../../assets/images'
const DragAndDropUpload = () => {
  return (
    <div className="flex justify-between items-center px-4 rounded border-dashed border-0.5 border-[#D9DBE9] bg-[#E6F4F9] hover:border-[#DDE2E5]">
      <div>
        <p>Drag & Drop files or <span className="text-[red]">Browse</span></p>
        <p className="text-sm">Supported jpeg, pdf oc doc files</p>
      </div>
      <div>
        <DocumentUpload />
      </div>
    </div>
  )
}

export default DragAndDropUpload
