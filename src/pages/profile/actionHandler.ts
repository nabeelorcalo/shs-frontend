import React from "react";
import api from "../../api";
import constants from "../../config/constants";
import apiEndpints from "../../config/apiEndpoints";

const useCustomHook = () => {
  const { PROFILE_CHANGE_PASSWORD } = apiEndpints;
  const profilechangepassword = async (body: any): Promise<any> => {
    const { data } = await api.post(PROFILE_CHANGE_PASSWORD, body);
    return data;
  };

  const getData = async (type: string): Promise<any> => {
    const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  };
  return {
    getData,
    profilechangepassword,
  };
};

export default useCustomHook;
