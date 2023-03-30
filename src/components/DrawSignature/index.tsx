import React from "react";
import SignatureCanvas from 'react-signature-canvas';

const DrawSignature = () => {
  return (
    <div className="flex flex-col justify-end h-80 pb-5 rounded border-dashed border-2 border-[#D9DBE9] bg-[#E6F4F9] hover:border-[#DDE2E5]">
      <div className="p-2 flex flex-row justify-center">
      <SignatureCanvas
        penColor='black'
        canvasProps={{
          width: 500,
          height: 200,
          className: 'sigCanvas'
        }}
      />
      </div>
      <div className='flex flex-col justify-end '>
        <hr className="w-48 h-0.5 mx-auto my-1 bg-gray-100 border-0 rounded md:my-2 dark:bg-gray-700" />
        <p className="text-sm text-center">Draw your signature here</p>
      </div>
    </div>
  );
};

export default DrawSignature;
