import React, { useEffect } from "react";
import api from "../../api";
import constants, { ROUTES_CONSTANTS } from "../../config/constants";
import apiEndPoints from "../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import {
  addManagerDetail,
  getManagerDetail,
} from "../../store/managerCompanyAdmin";
import { useNavigate } from "react-router-dom";
import { Notifications } from "../../components";

const useCustomHook = () => {
  const navigate = useNavigate();
  // change name of state remeber
  const [currentManager, setCurrentManager] = useRecoilState(addManagerDetail);
  const [getCurentManager, setGetManager] = useRecoilState(getManagerDetail);

  const { MANAGER_COMPANY_ADMIN, GET_MANAGER_COMPANY_ADMIN } = apiEndPoints;
  const addManagerCompany = async (body: any): Promise<any> => {
    const { data } = await api.post(MANAGER_COMPANY_ADMIN, body);
    if (!data.error) {
      Notifications({
        title: "Success",
        description: "Data Is Submit",
        type: "success",
      });
      navigate(`/${ROUTES_CONSTANTS.MANAGERS}`);
    } else {
      Notifications({
        title: "Error",
        description: "Data Is not Submit",
        type: "error",
      });
    }
    setCurrentManager(data.user);
    return data;
  };

  const getManagerCompanyAdmin = async () => {
    const { data } = await api.get(GET_MANAGER_COMPANY_ADMIN);
    setGetManager(data);
  };
  useEffect(() => {
    getManagerCompanyAdmin();
  }, []);

  return {
    addManagerCompany,
    getCurentManager,
  };
};

export default useCustomHook;
