import { useState } from "react";
import { Input, Select } from "antd";
import "./style.scss";

const TypeSignature = ({
  signatureText,
  setSignatureText,
  certificateDetails,
  setCertificateDetails,
  handleTextSignature,
}: any) => {
  const [fontFamily, setFontFamily] = useState("roboto");
  const handleChange = (value: any) => {
    setFontFamily(value);
  };

  return (
    <div className="flex flex-col justify-between h-80 pb-5 type-signature-wrapper">
      <Select
        defaultValue="Select Typeface"
        className="w-1/4 border-b-4 border-indigo-500"
        bordered={false}
        options={[
          { value: "roboto", label: "Roboto" },
          { value: "montserrat", label: "Montserrat" },
          { value: "ariel", label: "Ariel" },
          { value: "poppins", label: "Poppins" },
        ]}
        onChange={(value) => {
          handleChange(value);
        }}
      />

      <div className="flex flex-col justify-end signature-input">
        <Input
          onChange={(e: any) => {
            handleTextSignature(e.target.value);
            setSignatureText(e.target.value);
            setCertificateDetails({
              ...certificateDetails,
              txtSignature: e.target.vlaue,
            });
          }}
          value={signatureText ?? ""}
          bordered={false}
          className={`text-center text-size-lg text-${fontFamily} input-no-border`}
        />
        <hr className="w-96 h-0.5 mx-auto my-2 bg-signature-border border-rounded md:my-2" />
        <p className="text-sm text-center">Type your signature here</p>
      </div>
    </div>
  );
};

export default TypeSignature;
