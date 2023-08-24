import React, { useState } from "react";
import { Upload } from "antd";
import "./LogoUploader.scss";
import {
  OrgUpload,
  CompanyLogoEdit,
  CompanyLogoDelete,
  EditPlaceholder,
  IconRemoveAttachment,
  UploadedImageIcon
} from "../../../../../assets/images";
import {
  Alert,
  ButtonThemePrimary,
  ButtonThemeSecondary,
  Notifications,
  PopUpModal
} from "../../../../../components";
import { PreviewLogoState, dataLogoState, currentUserState } from '../../../../../store'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import constants from "../../../../../config/constants";
import useCustomHook from '../../../actionHandler';
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
  const currentUser = useRecoilValue(currentUserState);
  const { Dragger } = Upload;
  const [modalUploadLogoOpen, setModalUploadLogoOpen] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewLogo, setPreviewLogo] = useRecoilState(PreviewLogoState);
  const setDataLogo = useSetRecoilState<any>(dataLogoState);
  const [alertDelete , setAlertDelete] = useState(false);
  const {deleteAttachment} = useCustomHook();
  const [loadingDelete, setLoadingDelete] = useState(false);
  

  
  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const openModalUploadLogo = () => {
    if(currentUser?.company?.logo) {
      setFileList([{
        uid: currentUser?.company?.logo?.id,
        name: currentUser?.company?.logo?.filename,
        url: `${constants.MEDIA_URL}/${currentUser?.company?.logo?.mediaId}.${currentUser?.company?.logo?.metaData.extension}`,
      }])
    }
    setModalUploadLogoOpen(true);
  };

  const closeModalUploadLogo = () => {
    setModalUploadLogoOpen(false)
  };

  const openAlertDelete = () => {
    setAlertDelete(true);
  };

  const closeAlertDelete = () => {
    setAlertDelete(false)
  };

  const handleUpload = async () => {
    const previewFileUrl =  await getBase64(fileList[0] as RcFile);
    setPreviewLogo(previewFileUrl);
    setDataLogo(fileList[0]);
    closeModalUploadLogo();
  };

  const draggerProps: UploadProps = {
    iconRender: () => {
      return <UploadedImageIcon />;
    },
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

  const handleDeleteLogo = async () => {
    setLoadingDelete(true)
    const response = await deleteAttachment(currentUser?.company?.logo?.id)
    if(!response.error) {
      setLoadingDelete(false)
    } else {
      setLoadingDelete(false)
      Notifications({title: "Error", description: response.message, type: 'error'});
    }
  }

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
      {previewLogo &&
        <div className="logo-preview">
          <img src={previewLogo} />
          <div className="org-logo-actions">
            <div className="org-logo-action-items">
              <div className="action-edit" onClick={openModalUploadLogo}>
                <CompanyLogoEdit />
              </div>
              <div className="divider"></div>
              <div className="action-delete" onClick={openAlertDelete}>
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
          <Dragger
            {...draggerProps}
            maxCount={fileList.length < 1 ? 1 : 0}
            showUploadList={{
              showPreviewIcon: false,
              removeIcon: <IconRemoveAttachment />,
            }}
          >
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
      
      <Alert
        state={alertDelete}
        setState={setAlertDelete}
        cancelBtntxt={"Cancel"}
        okBtnFunc={() => handleDeleteLogo()}
        okBtntxt={"Delete"}
        children={"Are you sure you want to delete this document."}
        type={"error"}
      />

    </>
  );
}

export default LogoUploader;
