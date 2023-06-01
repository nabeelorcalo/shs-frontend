import SignatureCanvas from "react-signature-canvas";
import "./style.scss";
import customHook from "../../pages/caseStudies/actionHandler";
import { useEffect } from "react";
const DrawSignature = () => {
  const { getSignPadValue } = customHook();
  let signPad: any = {};
  useEffect(() => {
    getSignPadValue(signPad);
  }, [signPad]);

  return (
    <div className="flex flex-col justify-end h-80 pb-5 draw-signature-style ">
      <div className="p-2 flex flex-row justify-center">
        <SignatureCanvas
          ref={(ref) => {
            signPad = ref;
          }}
          penColor="black"
          canvasProps={{
            width: 500,
            height: 200,
            className: "sigCanvas",
          }}
        />
      </div>
      <div className="flex flex-col justify-end ">
        <hr className="w-48 h-0.5 mx-auto my-1 bg-gray-100 border-0 rounded md:my-2 dark:bg-gray-700" />
        <p className="text-sm text-center text-success-placeholder-color font-medium">Draw your signature here</p>
      </div>
    </div>
  );
};

export default DrawSignature;
