import React from 'react'
import SignatureCanvas from 'react-signature-canvas'

const DrawSignature = () => {
    return (
        <div className="flex flex-col content-end items-center p-12 rounded border-dashed border-0.5 border-[#D9DBE9] bg-[#E6F4F9] hover:border-[#DDE2E5]">
            <SignatureCanvas penColor='green'
                canvasProps={{ width: 500, height: 250, className: 'sigCanvas' }} />
            <hr className="w-64 h-1 mx-auto my-1 bg-gray-100 border-0 rounded md:my-1 dark:bg-gray-700" />
            <p className="text-sm">Draw your signature here</p>
        </div>
    )
}

export default DrawSignature
