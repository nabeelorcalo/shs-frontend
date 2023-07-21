import { useState } from "react";
import { Input, Select } from "antd";
import { useRecoilState } from "recoil";
import { certificateDetailsState } from "../../store";
import "./style.scss";

const TypeSignature = () => {
  const [fontFamily, setFontFamily] = useState("roboto");
  const [certificateDetails, setCertificateDetails] = useRecoilState(certificateDetailsState);

  const handleChange = (value: any) => {
    setFontFamily(value);
  };

  return (
    <div className="flex flex-col justify-between h-80 pb-5 type-signature-wrapper">
      <Select
        defaultValue="Select Typeface"
        className="min-w-fit w-1/4 border-b-4 border-indigo-500"
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
          bordered={false}
          value={certificateDetails?.txtSignature}
          onChange={(e: any) => {
            setCertificateDetails((prevState) => ({
              ...prevState,
              imgSignature: '',
              txtSignature: e.currentTarget.value,
            }));
          }}
          className={`text-center text-size-lg text-${fontFamily} input-no-border`}
        />
        <hr className="w-96 h-0.5 mx-auto my-2 bg-signature-border border-rounded md:my-2" />
        <p className="text-sm text-center">Type your signature here</p>
      </div>
    </div>
  );
};

export default TypeSignature;
