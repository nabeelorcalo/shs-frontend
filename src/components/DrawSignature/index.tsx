import { useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import customHook from "../../pages/caseStudies/actionHandler";
import "./style.scss";
interface Props {
  certificateDetails?: any;
  setCertificateDetails?: () => void;
}

const DrawSignature = (props?: any) => {
  const { certificateDetails, getSignPadValue = (param: any) => {}, setCertificateDetails = () => {} } = props;
  let signPad: any = null;

  useEffect(() => {
    getSignPadValue && getSignPadValue(signPad);
    signPad && signPad?.clear(); // clears the pad
  }, []);

  const onDragEnd = () => {
    setCertificateDetails((prevState: any) => ({
      ...prevState,
      signatureType: 'DRAW',
      imgSignature: signPad.getTrimmedCanvas()?.toDataURL('image/png'),
    }));
  };

  return (
    <div className="flex flex-col justify-end h-80 pb-5 draw-signature-style ">
      <div className="p-2 flex flex-row justify-center">
        <SignatureCanvas
          ref={(ref) => {
            // certificateDetails && (certificateDetails.signature = ref);
            signPad = ref;
            getSignPadValue(ref);
            // props?.setCertificateDetails &&
            // props?.setCertificateDetails({ ...props.certificateDetails, imgSignature: ref });
          }}
          penColor="black"
          canvasProps={{
            width: 500,
            height: 200,
            className: "sigCanvas",
          }}
          onEnd={onDragEnd}
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
