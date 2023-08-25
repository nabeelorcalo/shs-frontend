import { useState } from "react";
import apiEndPoints from "../../config/apiEndpoints";
import api from "../../api";


// Chat operation and save into store
const useCustomHook = () => {
  const { PACTH_PERSONALIZATION, DELETE_ATTACHMENT } = apiEndPoints;

  const handlePatchRequest = async (payload:any) => {
    const response = await api.patch(PACTH_PERSONALIZATION, payload, {headers: {'Content-Type': 'multipart/form-data'}})
    return response;
  }

  // Delete Attachment
  const deleteAttachment = async (id:any) => {
    const response = await api.delete(`${DELETE_ATTACHMENT}/${id}`)
    return response
  }

  return {
    handlePatchRequest,
    deleteAttachment
  };
};

export default useCustomHook;