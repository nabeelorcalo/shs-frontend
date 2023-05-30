import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './style.scss'

const DrawSignature = (props: any) => {

  const { certificateDetails, setCertificateDetails } = props;

  const signaturePadRef = useRef<any>(null);
  
  const handleEndDrawing = () => {
    const data = signaturePadRef.current.toDataURL();
    setCertificateDetails({ ...certificateDetails, signature: data })
  };

  return (
    <div className="flex flex-col justify-end h-80 pb-5 draw-signature-style ">
      <div className="p-2 flex flex-row justify-center">
        <SignatureCanvas
          penColor='black'
          canvasProps={{
            width: 500,
            height: 200,
            className: 'sigCanvas'
          }}
          ref={signaturePadRef}
          onEnd={handleEndDrawing}
        />
        
      </div>
      <div className='flex flex-col justify-end '>
        <hr className="w-48 h-0.5 mx-auto my-1 bg-gray-100 border-0 rounded md:my-2 dark:bg-gray-700" />
        <p className="text-sm text-center text-success-placeholder-color font-medium">Draw your signature here</p>
      </div>
    </div>
  );
};

export default DrawSignature;
