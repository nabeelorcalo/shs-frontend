import React, { useEffect } from "react";
import api from "../../api";
import constants from "../../config/constants";
import apiEndPoints from "../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import { addManagerDetail, getManagerDetail } from "../../store/managerCompanyAdmin";

// Chat operation and save into store
const useCustomHook = () => {
  const [currentManager, setCurrentManager] = useRecoilState(addManagerDetail);
  const [getCuurentManager, setGetManager] = useRecoilState(getManagerDetail);

  const { MANAGER_COMPANY_ADMIN } = apiEndPoints;
  const addManagerCompany = async (body: any): Promise<any> => {
    const { data } = await api.post(MANAGER_COMPANY_ADMIN, body);
    setCurrentManager(data.user);
    return data;
  };

  const { GET_MANAGER_COMPANY_ADMIN } = apiEndPoints;
  const getManagerCompanyAdmin = async () => {
    const { data } = await api.get(GET_MANAGER_COMPANY_ADMIN );
    setGetManager(data);
  }
    useEffect(() => {
      getManagerCompanyAdmin();
    }, [])

  return {
    addManagerCompany,
    getCuurentManager,
  };
};

export default useCustomHook;
