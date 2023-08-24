import { useState } from "react";
import apiEndPoints from "../../config/apiEndpoints";
import api from "../../api";

// Chat operation and save into store
const useCustomHook = () => {
  const { PACTH_PERSONALIZATION } = apiEndPoints;

  const handlePatchRequest = async (payload:any) => {
    const response = await api.patch(PACTH_PERSONALIZATION, payload, {headers: {'Content-Type': 'multipart/form-data'}})
    return response;
  }

  return {
    handlePatchRequest,
  };
};

export default useCustomHook;