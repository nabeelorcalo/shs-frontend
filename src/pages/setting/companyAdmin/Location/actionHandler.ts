import React from "react";
import { useRecoilState } from "recoil";
import api from "../../../../api";
import apiEndpints from "../../../../config/apiEndpoints";
import { settingLocationState } from "../../../../store";

// Chat operation and save into store
const useCustomHook = () => {
  const { LOCATION } = apiEndpints;
  const [settingLocationdata, setSettingLocationdata] = useRecoilState(settingLocationState);
  const limit = 10

  const getSettingLocation = async (page: any, q:any): Promise<any> => {
    const param = { page: page, limit: limit , q: q }
    const { data } = await api.get(LOCATION, param);
    setSettingLocationdata(data)
  };

  const deleteSettingLocation = async (id: number): Promise<any> => {
    const { data } = await api.delete(`${LOCATION}/${id}`);
  };

  return {
    getSettingLocation,
    deleteSettingLocation
  };
};

export default useCustomHook;
