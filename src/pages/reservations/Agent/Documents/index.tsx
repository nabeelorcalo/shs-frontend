import { Divider } from "antd";
import React from "react";
import { Documentcard, DocumentUpload } from "../../../../assets/images";

const Documents = () => {
  return (
    <div>
      <div className="font-semibold text-[28px] text-[#14142A] pb-2">
        Documents
      </div>

      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="pr-2">
            <Documentcard />
          </div>
          <div>
            <p className="text-[#14142A] text-base font-medium">DBS</p>
            <p className="text-[#4E4B66] text-base font-normal">mydbs.pdf</p>
          </div>
        </div>

        <div className="flex items-center">
          <div>
            <p>01/07/2022</p>
            <p>2.3 MB</p>
          </div>
          <div className="pl-2">
            <DocumentUpload />
          </div>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default Documents;
