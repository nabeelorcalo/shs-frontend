import React from 'react'
import { DocumentUpload } from '../../assets/images'


export const DragAndDropUpload = () => {

  const handleDragOver = (event:any) => {
    event.preventDefault()
    console.log("Dragging over")
  }
  const handleDragged = (event:any) => {
    event.preventDefault()
    console.log("Dragged")
  }


  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDragged}
      className="flex justify-between items-center px-4 py-4 rounded border-dashed border-2 border-[#dfe7f1] bg-[#E6F4F9] hover:border-[#d8e0eb]">
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
