import { EyeFilled } from '@ant-design/icons';
import { Divider, Typography } from 'antd';
import React from 'react'
import { documentArr } from '../../../../profile/students/tabs/documents/DocumentMock';
import download from "../../../../../assets/images/download-icon.png";

const DocumentDetails = () => {
  return (
    <div>   {documentArr.map((item, index) => {
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
                    <div
                      style={{
                        background: "#FFFFFF",
                        borderRadius: "8px",
                        height: "48px",
                        width: "48px",
                      }}
                    >
                      <EyeFilled
                        style={{ fontSize: "22px", color: "#A0A3BD" }}
                        className="flex justify-center mt-4"
                      />
                    </div>
                    <div
                      style={{
                        background: "#FFFFFF",
                        borderRadius: "8px",
                        height: "48px",
                        width: "48px",
                      }}
                    >
                      <img
                        src={download}
                        alt=""
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: "auto",
                          paddingTop: "15px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Divider />
          </>
        );
      })}</div>
  )
}

export default DocumentDetails