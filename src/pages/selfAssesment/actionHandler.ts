import React from "react";
import api from "../../api";
import constants from "../../config/constants";

const useCustomHook = () => {

  const getData = async (type: string): Promise<any> => {
    const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  };
  
  return {
    getData,
  };
};

export default useCustomHook;