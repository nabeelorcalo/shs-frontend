import { EyeFilled } from "@ant-design/icons";
import { Divider, Typography } from "antd";
import React from "react";
import { documentArr } from "../../../../profile/students/tabs/documents/DocumentMock";
import download from "../../../../../assets/images/download-icon.png";

const DocumentDetails = () => {
  return (
    <div>
    
      {documentArr.map((item, index) => {
        return (
          <>
            <div className="animate">
              <div className="flex justify-between">
                <div className="flex justify-start">
                  <img src={item.img} alt="" />
                  <div>
                    <Typography>{item.name}</Typography>
                    <Typography>{item.subName}</Typography>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="grid justify-end">
                    <Typography>{item.date}</Typography>
                    <Typography>{item.fileSize}</Typography>
                  </div>

                  <div className="button-ts">
                    <div className="bg-[#FFFFFF] rounded-lg h-12 w-12">
                      <EyeFilled className="flex justify-center mt-4 text-[22px] text-[#A0A3BD]" />
                    </div>
                    <div className="bg-[#FFFFFF] rounded-lg h-12 w-12">
                      <img
                        src={download}
                        alt=""
                        className="flex justify-center items-center m-auto pt-4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Divider />
          </>
        );
      })}
    </div>
  );
};

export default DocumentDetails;
