import React, { useState } from "react";
import { Upload } from "antd";
import "./LogoUploader.scss";
import { OrgUpload } from "../../../../../assets/images";
import { ButtonThemePrimary, ButtonThemeSecondary, PopUpModal } from "../../../../../components";
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';


function LogoUploader() {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const { Dragger } = Upload;
  const [modalUploadLogoOpen, setModalUploadLogoOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  
  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const openModalUploadLogo = () => {
    setModalUploadLogoOpen(true);
  };

  const closeModalUploadLogo = () => {
    setModalUploadLogoOpen(false)
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      setUploading(true);
      // You can use any AJAX library you like
      fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
        method: 'POST',
        body: formData,
      })
      .then(res => res.json())
      .then(() => {
        setFile(null);
        // message.success('Upload successful.');
      })
      .catch(() => {
        // message.error('Upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
    }

  };

  const props: UploadProps = {
    // onRemove: file => {
    //   const index = fileList.indexOf(file);
    //   const newFileList = fileList.slice();
    //   newFileList.splice(index, 1);
    //   setFileList(newFileList);
    // },
    beforeUpload: (uploadedFile: File) => {
      setFile(uploadedFile);

      return false;
    },
  };


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
    <div className='company-logo-holder'>
      <div className="upload-modal-button" onClick={openModalUploadLogo}>
        <div className="upload-modal-button-icon">
          <OrgUpload />
        </div>
        <div className="upload-modal-button-text">Drag & drop files or <span>Browse</span></div>
        <div className="upload-modal-button-help">Support jpeg,svg and png files</div>
      </div>
    </div>

    {/* STARTS: MODAL UPLOAD LOGO 
      *************************************************************************/}
      <PopUpModal
        title="Upload File"
        open={modalUploadLogoOpen}
        close={closeModalUploadLogo}
        width={705}
        footer={[
          <ButtonThemeSecondary onClick={closeModalUploadLogo}>Cancel</ButtonThemeSecondary>,
          <ButtonThemePrimary
            disabled={!file || uploading}
            onClick={handleUpload}
            loading={uploading}
          >
            Upload
          </ButtonThemePrimary>
        ]}
      >
        <div className="logo-upload-drager">
          <Dragger {...props}>
            <div className="upload-modal-button">
              <div className="upload-modal-button-icon">
                <OrgUpload />
              </div>
              <div className="upload-modal-button-text">Drag & drop files or <span>Browse</span></div>
              <div className="upload-modal-button-help">Support jpeg,svg and png files</div>
            </div>
          </Dragger>
        </div>
        
      </PopUpModal>
      {/* ENDS: MODAL UPLOAD LOGO 
      *************************************************************************/}
    </>
  );
}

export default LogoUploader;
