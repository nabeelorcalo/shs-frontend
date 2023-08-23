import React, { useState } from "react";
import { Upload } from "antd";
import "./LogoUploader.scss";
import { OrgUpload, CompanyLogoEdit, CompanyLogoDelete, EditPlaceholder } from "../../../../../assets/images";
import { ButtonThemePrimary, ButtonThemeSecondary, PopUpModal } from "../../../../../components";
import { PreviewLogoState, OrgLogoState, dataLogoState } from '../../../../../store'
import { useRecoilState, useSetRecoilState } from 'recoil';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });


function LogoUploader() {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const { Dragger } = Upload;
  const [modalUploadLogoOpen, setModalUploadLogoOpen] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewLogo, setPreviewLogo] = useRecoilState(PreviewLogoState);
  // const [orgLogo, setOrgLogo] = useRecoilState<any>(OrgLogoState);
  const setDataLogo = useSetRecoilState<any>(dataLogoState);
  

  
  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const openModalUploadLogo = () => {
    setModalUploadLogoOpen(true);
  };

  const closeModalUploadLogo = () => {
    setModalUploadLogoOpen(false)
  };

  const handleUpload = async () => {
    const previewFileUrl =  await getBase64(fileList[0] as RcFile);
    // const formData = new FormData();
    // fileList.forEach(file => {
    //   formData.append('files[]', file as RcFile);
    // });
    setPreviewLogo(previewFileUrl);
    setDataLogo(fileList[0])
  };

  const draggerProps: UploadProps = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: file => {
      setFileList([file]);

      return false;
    },
    fileList,
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
      {previewLogo !== "" &&
        <div className="logo-preview">
          <img src={previewLogo} />
          <div className="org-logo-actions">
            <div className="org-logo-action-items">
              <div className="action-edit">
                <CompanyLogoEdit />
              </div>
              <div className="divider"></div>
              <div className="action-delete">
                <CompanyLogoDelete />
              </div>
            </div>
          </div>
          <div className="edit-placeholder">
            <EditPlaceholder />
          </div>
          
        </div>
      }
      
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
            disabled={fileList.length === 0}
            onClick={handleUpload}
          >
            Upload
          </ButtonThemePrimary>
        ]}
      >
        <div className="logo-upload-drager">
          <Dragger {...draggerProps} maxCount={fileList.length < 1 ? 1 : 0}>
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
