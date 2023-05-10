import React from "react";
import { DigiVaultState } from "../../store";
import api from "../../api";
import { useRecoilState } from "recoil";
import endpoints from "../../config/apiEndpoints";

// Chat operation and save into store
const useCustomHook = () => {
  const { STUDENT_DIGIVAULT } = endpoints;
  const [studentVault, setStudentVault] = useRecoilState(DigiVaultState);

  const getDigiVaultDashboard = async () => {
    const { data } = await api.get(STUDENT_DIGIVAULT);
    setStudentVault(data?.response)
  };


  return {
    getDigiVaultDashboard, studentVault
  };
};

export default useCustomHook;