import { useRecoilState } from "recoil";
import api from "../../../../api";
import apiEndpints from "../../../../config/apiEndpoints";
import { settingPerformanceState } from "../../../../store";
import { Notifications } from "../../../../components";
import { useState } from "react";

// Chat operation and save into store
const usePerformanceCustomHook = () => {
  const { SETTING_PERFORMANCE } = apiEndpints;
  const [settingPerformancedata, setSettingPerformancedata] = useRecoilState(settingPerformanceState);
  const [loading, setLoading] = useState(false)

  // get setting locations
  const getSettingPerformance = async () => {
    setLoading(true)
    const params = { page: 1, limit: 50 }
    const { data } = await api.get(SETTING_PERFORMANCE, params);
    setSettingPerformancedata(data)
    setLoading(false)
  };

  // // post location
  const postSettingPerformance = async (values: any) => {
    setLoading(true)
    const { questionTitle, pType } = values;
    const params = {
      pType: pType,
      title: questionTitle
    }
    await api.post(SETTING_PERFORMANCE, params)
    Notifications({ title: 'Success', description: 'Performance added successfully', type: 'success' })
    getSettingPerformance()
    setLoading(false)
  }

  // // post location
  const editSettingPerformance = async (state: any, values: any) => {
    setLoading(true)
    const { questionTitle, pType } = values;
    const params = {
      pType: state?.pType,
      title: questionTitle
    }
    await api.patch(`${SETTING_PERFORMANCE}/${state?.id}`, params)
    Notifications({ title: 'Success', description: 'Performance updated successfully', type: 'success' })
    getSettingPerformance()
    setLoading(false)
  }

  // delete location
  const deleteSettingPerformance = async (id: number) => {
    setLoading(true)
    await api.delete(`${SETTING_PERFORMANCE}/${id}`);
    getSettingPerformance()
    setLoading(false)
    Notifications({ title: 'Success', description: 'Performance deleted successfully', type: 'success' })
  };

  return {
    loading,
    settingPerformancedata,
    getSettingPerformance,
    deleteSettingPerformance,
    postSettingPerformance,
    editSettingPerformance
  };
};

export default usePerformanceCustomHook;
